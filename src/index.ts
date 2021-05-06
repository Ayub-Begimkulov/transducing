import { compose } from "./compose";

function pushCombiner<T>(a: T[], b: T) {
  a.push(b);
  return a;
}

const toArray = <T>(val: T | ReadonlyArray<T>) =>
  Array.isArray(val) ? val : [val];

type ArrayCombiner<T> = (acc: T[], c: T) => T[];
type ArrayReducer<T, R> = (acc: R[], c: T) => R[];
type Transducer<T, R> = (combiner: ArrayCombiner<R>) => ArrayReducer<T, R>;

const map = <T, R>(mapper: (val: T) => R) => (combiner: ArrayCombiner<R>) => (
  acc: R[],
  c: T
) => {
  return combiner(acc, mapper(c));
};

const flatMap = <T, R>(mapper: (val: T) => R | ReadonlyArray<R>) => (
  combiner: ArrayCombiner<R>
) => (acc: R[], c: T) => {
  const mappedValue = toArray(mapper(c));
  return mappedValue.reduce((acc, v) => combiner(acc, v), acc);
};

function filter<T, R extends T>(
  predicate: (val: T) => val is R
): Transducer<T, R>;
function filter<T, R extends T>(
  predicate: (val: T) => boolean
): Transducer<T, R>;
function filter<T, R extends T>(predicate: (val: T) => boolean) {
  return (combiner: ArrayCombiner<R>) => (acc: R[], c: T) => {
    return predicate(c) ? combiner(acc, c as R) : acc;
  };
}

function transduce<A, R>(arr: A[], transducer: Transducer<A, R>): R[];
function transduce<A, B, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, R>
): R[];
function transduce<A, B, C, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, C>,
  transducer3: Transducer<C, R>
): R[];
function transduce<A, B, C, D, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, C>,
  transducer3: Transducer<C, D>,
  transducer4: Transducer<D, R>
): R[];
function transduce<A, B, C, D, E, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, C>,
  transducer3: Transducer<C, D>,
  transducer4: Transducer<D, E>,
  transducer5: Transducer<E, R>
): R[];
function transduce(arr: any[], ...transducers: Transducer<any, any>[]) {
  const reducer = compose<any>(...transducers)(pushCombiner);
  return arr.reduce(reducer, [] as any[]);
}

export { transduce, map, filter, flatMap };
