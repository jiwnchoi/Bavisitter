from vega_datasets import data

from bavisitter.Bavisitter import Bavisitter


def test_isinstance():
  df = data.movies()
  assert Bavisitter(df) is not None
