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

    def __init__(self, api_key: str, df: pd.DataFrame, **kwargs):
        super().__init__(**kwargs)
        self.api_key = api_key
        self.df = df
        self.on_msg(self._handle_msg)
