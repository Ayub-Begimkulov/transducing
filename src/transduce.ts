import { compose } from "./compose";
import { Transducer } from "./types";
import { pushCombiner } from "./utils";

export function transduce<A, R>(arr: A[], transducer: Transducer<A, R>): R[];
export function transduce<A, B, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, R>
): R[];
export function transduce<A, B, C, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, C>,
  transducer3: Transducer<C, R>
): R[];
export function transduce<A, B, C, D, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, C>,
  transducer3: Transducer<C, D>,
  transducer4: Transducer<D, R>
): R[];
export function transduce<A, B, C, D, E, R>(
  arr: A[],
  transducer1: Transducer<A, B>,
  transducer2: Transducer<B, C>,
  transducer3: Transducer<C, D>,
  transducer4: Transducer<D, E>,
  transducer5: Transducer<E, R>
): R[];
export function transduce(arr: any[], ...transducers: Transducer<any, any>[]) {
  const reducer = compose<any>(...transducers)(pushCombiner);
  return arr.reduce(reducer, [] as any[]);
}
