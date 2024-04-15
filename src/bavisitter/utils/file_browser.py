from __future__ import annotations

import pathlib

import pandas as pd


def load_artifact(path: str):
  if not pathlib.Path(path).exists():
    return None

  # check if file type is supported by pandas dataframe
  if path.endswith((".csv", ".json", ".xlsx", ".html", ".parquet", ".feather")):
    file_extension = pathlib.Path(path).suffix
    read_method = f"read_{file_extension[1:]}"
    df: pd.DataFrame = getattr(pd, read_method)(
      path,
      keep_default_na=False,
      na_values=[
        "?",
        "??",
        "N/A",
        "NA",
        "nan",
        "NaN",
        "-nan",
        "-NaN",
        "null",
        "None",
        " ",
        "",
      ],
    )
    return df.to_dict(orient="records")

  return None


def save_artifact(record: list[dict], path: str):
  df = pd.DataFrame(record)
  df.to_csv(path, index=False)


__all__ = ["load_artifact"]
