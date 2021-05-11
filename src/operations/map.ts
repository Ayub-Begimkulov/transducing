import { ArrayCombiner } from "../types";

export const map =
  <T, R>(mapper: (val: T) => R) =>
  (combiner: ArrayCombiner<R>) =>
  (acc: R[], c: T, exit: () => void) => {
    return combiner(acc, mapper(c), exit);
  };
