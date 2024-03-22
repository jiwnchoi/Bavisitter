from __future__ import annotations

import importlib.metadata
import pathlib
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

from bavisitter.model.message_model import MessageModel, StreamChunkModel
from bavisitter.utils.system_prompt import SYSTEM_PROMPT

try:
  __version__ = importlib.metadata.version("bavisitter")

except importlib.metadata.PackageNotFoundError:
  __version__ = "unknown"


class Bavisitter(anywidget.AnyWidget, HasTraits):
  _esm = pathlib.Path(__file__).parent / "static" / "main.js"
  data = Unicode().tag(sync=True)
  messages = List(Dict(value_trait=Unicode(), key_trait=Unicode())).tag(
    sync=True
  )
  streaming = Bool(default_value=False).tag(sync=True)
  color_mode = Unicode(default_value="light").tag(sync=True)

  df: pd.DataFrame

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

    df.to_csv("artifacts/data.csv")
    self.data = df.to_json(orient="records")
    self.model = model
    self.on_msg(self._handle_msg)
    self.messages = []
    self.interpreter = OpenInterpreter()
    self.color_mode = color_mode
    self.set_interpreter(model, safe_model, auto_run)

  def set_interpreter(
    self,
    model: str = "gpt-3.5-turbo",
    safe_mode: Literal["off", "auto"] = "auto",
    auto_run: bool = True,
    system_prompt: str = SYSTEM_PROMPT,
  ):
    self.interpreter.llm.max_tokens = 4096
    self.interpreter.llm.context_window = 128_000
    self.interpreter.system_message = system_prompt
    self.interpreter.llm.model = model
    self.interpreter.safe_mode = safe_mode
    self.interpreter.auto_run = auto_run

  def load_messages(self, messages):
    self.messages = messages

  @default("messages")
  def _default_messages(self):
    return []

  @default("stream")
  def _default_stream(self):
    return {}

  @validate("messages")
  def _validate_messages(self, proposal):
    try:
      for message in proposal["value"]:
        MessageModel(**message)
    except Exception as e:
      raise TraitError(f"Invalid message: {e}")

    return proposal["value"]

  @observe("messages")
  def handle_user_chat(self, change):
    if len(change["new"]) == 0:
      self.interpreter.messages = []
      self.streaming = False

    if len(change["new"]) > 0:
      self.interpreter.messages = change["new"]
      if change["new"][-1]["role"] == "user":
        for chunk in self.interpreter.chat(
          change["new"][-1]["content"], display=False, stream=True
        ):
          self.append_chunk(chunk)

  def append_chunk(self, chunk: StreamChunkModel):
    if "start" in chunk and not self.streaming:
      self.streaming = True
      new_message = {
        "role": chunk["role"],
        "type": chunk["type"],
        "content": "",
      }
      if "format" in chunk:
        new_message["format"] = chunk["format"]

      self.messages = [*self.messages, new_message]
    elif (
      self.streaming
      and ("end" not in chunk)
      and ("content" in chunk)
      and isinstance(chunk["content"], str)
    ):
      new_message = self.messages[-1].copy()
      new_message["content"] += chunk["content"]
      self.messages = [*self.messages[:-1], new_message]

    elif "end" in chunk and self.streaming:
      self.streaming = False
