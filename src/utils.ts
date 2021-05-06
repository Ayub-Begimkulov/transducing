export const pushCombiner = <T>(a: T[], b: T) => {
  a.push(b);
  return a;
};

export const toArray = <T>(val: T | ReadonlyArray<T>) =>
  Array.isArray(val) ? val : [val];
