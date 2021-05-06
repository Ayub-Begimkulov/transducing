import { AnyFunction } from "./types";

export function compose<F extends AnyFunction>(f: F): F;
export function compose<R>(...funcs: AnyFunction[]): (...args: any[]) => R;
export function compose(...funcs: AnyFunction[]) {
  switch (funcs.length) {
    case 1:
      return funcs[0];
    default:
      return funcs.reduce(composeReducer);
  }
}

function composeReducer(a: Function, b: Function) {
  return function () {
    return a.call(null, b.apply(null, arguments));
  };
}
