from __future__ import annotations

from typing import Literal, Optional, TypedDict, Union

AssistantRoleType = Literal["assistant"]
UserRoleType = Literal["user"]
SystemRoleType = Literal["computer"]
MessageType = Literal["message", "code", "console"]
ChunkType = Literal["start", "continue", "end", "code_start", "code_end"]

RoleType = Union[AssistantRoleType, UserRoleType, SystemRoleType]


class MessageModel(TypedDict):
  role: RoleType
  type: MessageType
  format: str | None
  content: str


class StreamChunkModel(MessageModel, total=False):
  start: Optional[bool]
  end: Optional[bool]
