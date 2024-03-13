import string
from dataclasses import dataclass
from typing import Literal


@dataclass
class MessageModel:
    role: Literal["system", "user", "assistant"]
    content: string
