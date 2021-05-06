import { ArrayCombiner, Transducer } from "types";

export function filter<T, R extends T>(
  predicate: (val: T) => val is R
): Transducer<T, R>;
export function filter<T, R extends T>(
  predicate: (val: T) => boolean
): Transducer<T, R>;
export function filter<T, R extends T>(predicate: (val: T) => boolean) {
  return (combiner: ArrayCombiner<R>) => (acc: R[], c: T) => {
    return predicate(c) ? combiner(acc, c as R) : acc;
  };
}
