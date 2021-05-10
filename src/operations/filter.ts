import { ArrayCombiner, Predicate, Transducer, TypePredicate } from "../types";

export function filter<T, R extends T>(
  predicate: TypePredicate<T, R>
): Transducer<T, R>;
export function filter<T>(predicate: Predicate<T>): Transducer<T, T>;
export function filter<T>(predicate: Predicate<T>) {
  return (combiner: ArrayCombiner<T>) => (acc: T[], c: T) => {
    return predicate(c) ? combiner(acc, c) : acc;
  };
}
