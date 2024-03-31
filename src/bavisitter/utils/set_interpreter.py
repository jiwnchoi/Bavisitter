from typing import TYPE_CHECKING, Literal

from bavisitter.utils.system_prompt import SYSTEM_PROMPT

if TYPE_CHECKING:
  from interpreter import OpenInterpreter


def set_interpreter(
  interpreter: "OpenInterpreter",
  model: str = "gpt-3.5-turbo",
  safe_mode: Literal["off", "auto"] = "auto",
  auto_run: bool = True,
  system_prompt: str = SYSTEM_PROMPT,
):
  interpreter.llm.max_tokens = 4096
  interpreter.llm.context_window = 128_000
  interpreter.system_message = system_prompt
  interpreter.llm.model = model
  interpreter.safe_mode = safe_mode
  interpreter.auto_run = auto_run
