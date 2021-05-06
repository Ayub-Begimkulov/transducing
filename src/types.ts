export interface AnyFunction {
  (...args: any[]): any;
}

export type ArrayCombiner<T> = (acc: T[], c: T) => T[];
export type ArrayReducer<T, R> = (acc: R[], c: T) => R[];
export type Transducer<T, R> = (
  combiner: ArrayCombiner<R>
) => ArrayReducer<T, R>;
