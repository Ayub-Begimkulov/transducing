import { ArrayCombiner } from "types";

export const map = <T, R>(mapper: (val: T) => R) => (
  combiner: ArrayCombiner<R>
) => (acc: R[], c: T) => {
  return combiner(acc, mapper(c));
};
