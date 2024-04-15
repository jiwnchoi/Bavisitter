export function not(func: Function) {
  return (...args: any[]) => !func(...args);
}

export function and(...funcs: Function[]) {
  return (...args: any[]) => funcs.every((func) => func(...args));
}

export function or(...funcs: Function[]) {
  return (...args: any[]) => funcs.some((func) => func(...args));
}
