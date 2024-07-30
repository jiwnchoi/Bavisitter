from __future__ import annotations

import pathlib

import pandas as pd


def load_artifact(path: str):
  if not pathlib.Path(path).exists():
    raise FileNotFoundError(f"File not found: {path}")

  # check if file type is supported by pandas dataframe
  if path.endswith((".csv", ".json", ".xlsx", ".html", ".parquet", ".feather")):
    file_extension = pathlib.Path(path).suffix
    read_method = f"read_{file_extension[1:]}"
    df: pd.DataFrame = getattr(pd, read_method)(path)
    df = df.where(pd.notnull(df), None)
    return df.to_json(orient="records")

  raise ValueError(f"File type not supported: {path}")


def save_artifact(record: list[dict], path: str):
  df = pd.DataFrame(record)
  df.to_csv(path, index=False)


__all__ = ["load_artifact"]
