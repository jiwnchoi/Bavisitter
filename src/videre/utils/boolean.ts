export function not(func: Function) {
  return (...args: any[]) => {
    return !func(...args);
  };
}

export async function asyncNot(func: Function) {
  return async (...args: any[]) => {
    return !(await func(...args));
  };
}

export function and(...funcs: Function[]) {
  return (...args: any[]) => {
    for (const func of funcs) {
      if (!func(...args)) {
        return false;
      }
    }
    return true;
  };
}

export async function asyncAnd(...funcs: Function[]) {
  return async (...args: any[]) => {
    for (const func of funcs) {
      if (!(await func(...args))) {
        return false;
      }
    }
    return true;
  };
}

export function or(...funcs: Function[]) {
  return (...args: any[]) => {
    for (const func of funcs) {
      if (func(...args)) {
        return true;
      }
    }
    return false;
  };
}

export async function asyncOr(...funcs: Function[]) {
  return async (...args: any[]) => {
    for (const func of funcs) {
      if (await func(...args)) {
        return true;
      }
    }
    return false;
  };
}
