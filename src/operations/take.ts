import {
  ArrayCombiner,
  NoInfer,
  Predicate,
  Transducer,
  TypePredicate,
} from "../types";

export function takeUntil<T, R extends T>(
  predicate: TypePredicate<NoInfer<T>, R>
): Transducer<T, Exclude<T, R>>;
export function takeUntil<T>(predicate: Predicate<T>): Transducer<T, T>;
export function takeUntil<T, R extends T>(
  predicate: Predicate<T> | TypePredicate<T, R>
): Transducer<T, T> | Transducer<T, Exclude<T, R>> {
  return (combiner: ArrayCombiner<T>) => (acc: T[], c: T, exit: () => void) => {
    if (predicate(c)) {
      exit();
      return acc;
    }
    return combiner(acc, c, exit);
  };
}

export function takeWhile<T, R extends T>(
  predicate: TypePredicate<T, R>
): Transducer<T, R>;
export function takeWhile<T>(predicate: Predicate<T>): Transducer<T, T>;
export function takeWhile<T, R extends T>(
  predicate: Predicate<T> | TypePredicate<T, R>
) {
  return (combiner: ArrayCombiner<T>) => (acc: T[], c: T, exit: () => void) => {
    if (predicate(c)) {
      return combiner(acc, c, exit);
    }
    exit();
    return acc;
  };
}

export const take =
  <T>(n: number) =>
  (combiner: ArrayCombiner<T>) =>
  (acc: T[], c: T, exit: () => void) => {
    if (acc.length < n) return combiner(acc, c, exit);
    exit();
    return acc;
  };
