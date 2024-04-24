export async function not(func: Function) {
  return async (...args: any[]) => !(await func(...args));
}

export async function and(...funcs: Function[]) {
  return async (...args: any[]) => {
    for (const func of funcs) {
      if (!(await func(...args))) {
        return false;
      }
    }
    return true;
  };
}

export async function or(...funcs: Function[]) {
  return async (...args: any[]) => {
    for (const func of funcs) {
      if (await func(...args)) {
        return true;
      }
    }
    return false;
  };
}
