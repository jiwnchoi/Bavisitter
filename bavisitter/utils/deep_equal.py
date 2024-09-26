def deep_equal(a, b):
  if a == b:
    return True
  if type(a) is not type(b):
    return False
  if isinstance(a, dict):
    if len(a) != len(b):
      return False
    for key in a:
      if key not in b:
        return False
      if not deep_equal(a[key], b[key]):
        return False
    return True
  if isinstance(a, list):
    if len(a) != len(b):
      return False
    for i in range(len(a)):
      if not deep_equal(a[i], b[i]):
        return False
    return True
  return False


__all__ = [
  "deep_equal",
]
