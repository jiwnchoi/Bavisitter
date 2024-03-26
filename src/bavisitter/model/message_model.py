from __future__ import annotations

from typing import Literal, NotRequired, TypedDict

AssistantRoleType = Literal["assistant"]
UserRoleType = Literal["user"]
SystemRoleType = Literal["computer"]
MessageType = Literal["message", "code", "console"]
ChunkType = Literal["start", "continue", "end", "code_start", "code_end"]

RoleType = AssistantRoleType | UserRoleType | SystemRoleType


class MessageModel(TypedDict):
  role: RoleType
  type: MessageType
  format: str | None
  content: str


class StreamChunkModel(MessageModel):
  start: NotRequired[bool]
  end: NotRequired[bool]
