from __future__ import annotations

import importlib.metadata
import pathlib
import re
from copy import copy
from typing import Literal

import anywidget
import pandas as pd
from interpreter import OpenInterpreter
from traitlets import (
  Bool,
  Dict,
  HasTraits,
  List,
  TraitError,
  Unicode,
  default,
  observe,
  validate,
)

from bavisitter.model import (
  IPCModel,
  MessageModel,
  MessageType,
  RoleType,
  StreamChunkModel,
)
from bavisitter.utils import (
  deep_equal,
  get_chunk_type,
  load_artifact,
  set_interpreter,
)

try:
  __version__ = importlib.metadata.version("bavisitter")

except importlib.metadata.PackageNotFoundError:
  __version__ = "unknown"

match = re.compile(r"```(\w+)\n")


class Bavisitter(anywidget.AnyWidget, HasTraits):
  _esm = pathlib.Path(__file__).parent / "static" / "main.js"
  messages = List(Dict(value_trait=Unicode(), key_trait=Unicode())).tag(
    sync=True
  )
  streaming = Bool(default_value=False).tag(sync=True)
  color_mode = Unicode(default_value="light").tag(sync=True)
  ipc_queue = List(Dict()).tag(sync=True)

  def __init__(
    self,
    df: pd.DataFrame,
    model: str = "gpt-3.5-turbo",
    safe_model: Literal["auto", "off"] = "auto",
    auto_run: bool = True,
    color_mode: Literal["light", "dark"] = "light",
    **kwargs,
  ):
    super().__init__(**kwargs)

    if not pathlib.Path("artifacts").exists():
      pathlib.Path("artifacts").mkdir()

    df.to_csv("artifacts/data.csv", index=False)

    # set widget properties
    self.model = model
    self.chunks = []
    self.color_mode = color_mode

    # initialize the open interpreter
    self.interpreter = OpenInterpreter()
    set_interpreter(self.interpreter, model, safe_model, auto_run)

  @default("messages")
  def _default_messages(self):
    return []

  @default("streaming")
  def _default_stream(self):
    return False

  @default("color_mode")
  def _default_color_mode(self):
    return "light"

  @default("ipc_queue")
  def _default_ipc_queue(self):
    return []

  @validate("color_mode")
  def _validate_color_mode(self, proposal):
    if proposal["value"] not in ["light", "dark"]:
      raise TraitError("Invalid color mode. Must be 'light' or 'dark'")

    return proposal["value"]

  @validate("ipc_queue")
  def _validate_ipc_queue(self, proposal):
    for message in proposal["value"]:
      if "type" not in message:
        raise TraitError("Invalid message: 'type' key is missing")

    return proposal["value"]

  @validate("messages")
  def _validate_messages(self, proposal):
    try:
      for message in proposal["value"]:
        MessageModel(**message)
    except Exception as e:
      raise TraitError(f"Invalid message: {e}")

    return proposal["value"]

  @observe("ipc_queue")
  def handle_ipc_queue(self, change: list[IPCModel]):
    if len(change["new"]) and change["new"][-1]["type"] == "request":
      if change["new"][-1]["endpoint"] == "load_artifact":
        try:
          data = load_artifact(change["new"][-1]["content"])
          self.ipc_queue = [
            *self.ipc_queue,
            {
              "type": "response",
              "content": data,
              "endpoint": change["new"][-1]["endpoint"],
              "uuid": change["new"][-1]["uuid"],
            },
          ]
        except Exception as e:
          self.ipc_queue = [
            *self.ipc_queue,
            {
              "type": "response",
              "content": None,
              "endpoint": change["new"][-1]["endpoint"],
              "uuid": change["new"][-1]["uuid"],
            },
          ]
      else:
        self.ipc_queue = [
          *self.ipc_queue,
          {
            "type": "response",
            "content": None,
            "endpoint": change["new"][-1]["endpoint"],
            "uuid": change["new"][-1]["uuid"],
          },
        ]

  @observe("messages")
  def handle_user_chat(self, change):
    if deep_equal(change["new"], change["old"]):
      return

    if len(change["new"]) > 0 and change["new"][-1]["role"] == "user":
      for chunk in self.interpreter.chat(
        change["new"][-1]["content"], display=False, stream=True
      ):
        self.handle_chunk(chunk)

    if len(change["new"]) == 0 or (
      len(change["new"]) > 0 and change["new"][-1]["role"] == "assistant"
    ):
      self.load_messages(change["new"])

  def handle_chunk(self, chunk: StreamChunkModel):
    chunk_type = get_chunk_type(
      chunk, self.messages[-1] if len(self.messages) else None
    )
    self.chunks.append({**chunk, "chunk_type": chunk_type})

    if chunk_type == "start":
      self.streaming = True
      format = chunk["format"] if "format" in chunk else None
      self.append_message(
        role=chunk["role"], type=chunk["type"], content="", format=format
      )

    elif chunk_type == "code_start":
      self.append_message(
        role=chunk["role"], type="code", content=chunk["content"]
      )

    elif chunk_type == "continue":
      if (
        self.messages[-1]["type"] == "code"
        and "```" in self.messages[-1]["content"]
        and match.match(self.messages[-1]["content"])
      ):
        format = match.match(self.messages[-1]["content"]).group(1)
        code = re.sub(r"```(\w+)\n", "", self.messages[-1]["content"])
        self.messages = [
          *self.messages[:-1],
          {
            "role": "assistant",
            "type": "code",
            "content": code + chunk["content"],
            "format": format,
          },
        ]
      else:
        self.append_content(chunk["content"])

    elif chunk_type == "end":
      self.streaming = False
      if self.messages[-1]["content"] == "":
        self.messages = [*self.messages[:-1]]

    elif chunk_type == "code_end":
      content: str = self.messages[-1]["content"] + chunk["content"]
      code = content.split("```")[0]
      self.messages = [
        *self.messages[:-1],
        {
          "role": "assistant",
          "type": "code",
          "content": code,
          "format": self.messages[-1]["format"],
        },
        {
          "role": "assistant",
          "type": "message",
          "content": "",
        },
      ]

  def append_content(self, content: str):
    new_message = copy(self.messages[-1])
    new_message["content"] += content
    self.messages = [*self.messages[:-1], new_message]

  def append_message(
    self,
    role: RoleType = "assistant",
    content: str = "",
    format: str | None = None,
    type: MessageType = "message",
  ):
    new_message = {
      "role": role,
      "type": type,
      "content": content,
    }

    if format:
      new_message["format"] = format

    self.messages = [
      *self.messages,
      new_message,
    ]

  def load_messages(self, messages):
    self.messages = messages
    self.interpreter.messages = messages
    self.streaming = False
