from typing import TYPE_CHECKING, Literal

from bavisitter.utils.system_prompt import SYSTEM_PROMPT

if TYPE_CHECKING:
  from interpreter import OpenInterpreter

PRELOAD_SCRIPT = [
  "import pandas as pd\ndel pd.DataFrame._repr_html_",
  "df = pd.read_csv('artifacts/data.csv')",
]


def set_interpreter(
  interpreter: "OpenInterpreter",
  model: str = "gpt-4-turbo",
  safe_mode: Literal["off", "auto"] = "auto",
  auto_run: bool = True,
  system_prompt: str = SYSTEM_PROMPT,
):
  interpreter.system_message = system_prompt
  interpreter.llm.model = model
  interpreter.safe_mode = safe_mode
  interpreter.auto_run = auto_run
  interpreter.llm.max_tokens = 4096  # type: ignore
  interpreter.llm.context_window = 128_000  # type: ignore
  [
    output
    for script in PRELOAD_SCRIPT
    for output in interpreter.computer.terminal.run("python", script)
  ]
