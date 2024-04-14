from __future__ import annotations

from typing import Any, Literal, TypedDict

IPCType = Literal["reqest", "resonse"]


class IPCModel(TypedDict):
  type: IPCType
  content: Any
  endpoint: str
  uuid: str
