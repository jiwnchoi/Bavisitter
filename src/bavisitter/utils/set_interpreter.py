from typing import TYPE_CHECKING, Literal

from bavisitter.utils.system_prompt import SYSTEM_PROMPT

if TYPE_CHECKING:
  from interpreter import OpenInterpreter


def set_interpreter(
  interpreter: "OpenInterpreter",
  model: str = "gpt-4-turbo-preview",
  safe_mode: Literal["off", "auto"] = "auto",
  auto_run: bool = True,
  system_prompt: str = SYSTEM_PROMPT,
):
  interpreter.system_message = system_prompt
  interpreter.llm.model = model
  interpreter.safe_mode = safe_mode
  interpreter.auto_run = auto_run
