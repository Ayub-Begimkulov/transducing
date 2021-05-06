type Func<T extends any[], R> = (...a: T) => R;

export function compose(): <R>(a: R) => R;

export function compose<F extends Function>(f: F): F;

/* two functions */
export function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>;

/* three functions */
export function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>;

/* four functions */
export function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>;

/* rest */
export function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export function compose(...funcs: Function[]) {
  switch (funcs.length) {
    case 0:
      return <T>(arg: T) => arg;
    case 1:
      return funcs[0];
    default:
      return funcs.reduce(composeReducer);
  }
}

function composeReducer(a: Function, b: Function) {
  return function (this: unknown) {
    return a.call(this, b.apply(this, arguments));
  };
}
