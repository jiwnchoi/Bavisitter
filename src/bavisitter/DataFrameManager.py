import pandas as pd


class DataFrameManager:
  df: pd.DataFrame
  df_original: pd.DataFrame
  filename: str
  data: str

  def __init__(
    self, df: pd.DataFrame, file_name: str = "artifacts/data.csv", **kwargs
  ):
    super().__init__(**kwargs)
    self.df = df
    self.df_original = df.copy()
    self.data = df.to_json(orient="records")
    self.filename = "artifacts/data.csv"
    df.to_csv(self.filename)

  def handle_df_change(self):
    new_df = pd.read_csv(self.filename)

    if not self.df.equals(new_df):
      self.df = new_df
      self.data = new_df.to_json(orient="records")

  def init_df(self):
    self.df = self.df_original
    self.data = self.df.to_json(orient="records")
    self.df.to_csv(self.filename)
