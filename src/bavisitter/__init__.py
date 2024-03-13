import importlib.metadata
import pathlib

import anywidget
import pandas as pd
import traitlets

try:
    __version__ = importlib.metadata.version("bavisitter")

except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class Bavisitter(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "main.js"
    value = traitlets.Int(0).tag(sync=True)
    api_key: str
    df: pd.DataFrame

    def __init__(
        self, df: pd.DataFrame, model: str = "gpt-3.5-turbo-16k-1106", **kwargs
    ):
        super().__init__(**kwargs)
        self.df = df
        self.model = model
        self.on_msg(self._handle_msg)
