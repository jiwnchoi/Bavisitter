from bavisitter.model.message_model import ChunkType


def get_chunk_type(chunk, previous_message=None) -> ChunkType:
  if "start" in chunk:
    return "start"
  if "end" in chunk:
    return "end"
  if "content" in chunk and isinstance(chunk["content"], str):
    if (
      previous_message
      and chunk["role"] == "assistant"
      and chunk["content"] == "```"
    ):
      if previous_message["type"] == "code":
        return "code_end"
      else:
        return "code_start"
    return "continue"
  return None
