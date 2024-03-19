from __future__ import annotations

from typing import Literal, TypedDict

AssistantRoleType = Literal["assistant"]
UserRoleType = Literal["user"]
SystemRoleType = Literal["computer"]

RoleType = AssistantRoleType | UserRoleType | SystemRoleType

MessageType = Literal["message", "code", "console"]


class MessageModel(TypedDict):
  role: RoleType
  type: MessageType
  format: str | None
  content: str


class StreamChunkModel(MessageModel):
  start: bool | None
  end: bool | None
