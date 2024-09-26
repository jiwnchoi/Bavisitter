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
  return (...args: any[]) => args.every((arg) => funcs.every((func) => func(arg)));
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
  return (...args: any[]) => args.some((arg) => funcs.some((func) => func(arg)));
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
