from __future__ import annotations

from typing import Any, TypedDict

from altair import Literal

IPCType = Literal["reqest", "resonse"]


class IPCModel(TypedDict):
  type: IPCType
  content: Any
  endpoint: str
  uuid: str
