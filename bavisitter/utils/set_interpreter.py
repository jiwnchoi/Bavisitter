from typing import TYPE_CHECKING, Literal

from bavisitter.utils.system_prompt import get_system_prompt

if TYPE_CHECKING:
  from interpreter import OpenInterpreter


def set_interpreter(
  interpreter: "OpenInterpreter",
  model: str = "gpt-4-turbo",
  safe_mode: Literal["off", "auto"] = "auto",
  auto_run: bool = True,
  artifact_path: str = "artifacts",
):
  PRELOAD_SCRIPT = [
    "import pandas as pd\ndel pd.DataFrame._repr_html_",
    "df = pd.read_csv('artifact_path/data.csv')".replace(
      "artifact_path", artifact_path
    ),
  ]
  interpreter.system_message = get_system_prompt(artifact_path)
  interpreter.llm.model = model
  interpreter.safe_mode = safe_mode
  interpreter.auto_run = auto_run
  interpreter.llm.max_tokens = 4096  # type: ignore
  interpreter.llm.context_window = 128_000  # type: ignore
  for script in PRELOAD_SCRIPT:
    list(interpreter.computer.terminal.run("python", script))  # type: ignore
