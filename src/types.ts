export interface AnyFunction {
  (...args: any[]): any;
}

export type ArrayCombiner<T> = ArrayReducer<T, T>;
export type ArrayReducer<T, R> = (acc: R[], c: T, exit: () => void) => R[];
export type Transducer<T, R> = (
  combiner: ArrayCombiner<R>
) => ArrayReducer<T, R>;

export type TypePredicate<T, R extends T> = (val: T) => val is R;
export type Predicate<T> = (val: T) => boolean;

export type NoInfer<T> = [T][T extends any ? 0 : never];
