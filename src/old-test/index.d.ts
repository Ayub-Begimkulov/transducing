export function chain<T>(arr: T[]): Chain<T>;

declare class Chain<T> {
  constructor(arr: T[]);

  map<U>(cb: (value: T) => U): Chain<U>;

  filter<S extends T>(cb: (value: T) => value is S): Chain<S>;
  filter(cb: (value: T) => unknown): Chain<T>;

  flatMap<U>(cb: (value: T) => U | U[]): Chain<U>;

  toArray(): T[];

  toFlatArray(): FlatArray<T[], 1>[];

  toSet(): Set<T>;
}
