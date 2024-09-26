from __future__ import annotations

from bavisitter.model.message_model import ChunkType


def get_chunk_type(chunk, previous_message=None) -> ChunkType | None:
  if "start" in chunk and chunk["start"]:
    return "start"
  if "end" in chunk and chunk["end"]:
    return "end"
  if "content" in chunk and isinstance(chunk["content"], str):
    if (
      previous_message
      and chunk["role"] == "assistant"
      and "```" in (previous_message["content"] + chunk["content"])
    ):
      if previous_message["type"] == "message":
        return "code_start"
      elif (
        previous_message["type"] == "code"
        and "```" in previous_message["content"]
      ):
        return "continue"
      else:
        return "code_end"

    return "continue"
  return None
