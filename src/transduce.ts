import { compose } from "./compose";
import { NoInfer, Transducer } from "./types";
import { pushCombiner } from "./utils";

// added NoInfer so that next operation
// doesn't change generic type of the previous one
export function transduce<A, R>(
  arr: A[],
  transducer: Transducer<NoInfer<A>, R>
): R[];
export function transduce<A, B, R>(
  arr: A[],
  transducer1: Transducer<NoInfer<A>, B>,
  transducer2: Transducer<NoInfer<B>, R>
): R[];
export function transduce<A, B, C, R>(
  arr: A[],
  transducer1: Transducer<NoInfer<A>, B>,
  transducer2: Transducer<NoInfer<B>, C>,
  transducer3: Transducer<NoInfer<C>, R>
): R[];
export function transduce<A, B, C, D, R>(
  arr: A[],
  transducer1: Transducer<NoInfer<A>, B>,
  transducer2: Transducer<NoInfer<B>, C>,
  transducer3: Transducer<NoInfer<C>, D>,
  transducer4: Transducer<NoInfer<D>, R>
): R[];
export function transduce<A, B, C, D, E, R>(
  arr: A[],
  transducer1: Transducer<NoInfer<A>, B>,
  transducer2: Transducer<NoInfer<B>, C>,
  transducer3: Transducer<NoInfer<C>, D>,
  transducer4: Transducer<NoInfer<D>, E>,
  transducer5: Transducer<NoInfer<E>, R>
): R[];
export function transduce<A, B, C, D, E, F, R>(
  arr: A[],
  transducer1: Transducer<NoInfer<A>, B>,
  transducer2: Transducer<NoInfer<B>, C>,
  transducer3: Transducer<NoInfer<C>, D>,
  transducer4: Transducer<NoInfer<D>, E>,
  transducer5: Transducer<NoInfer<E>, F>,
  transducer6: Transducer<NoInfer<F>, R>
): R[];
export function transduce<A, B, C, D, E, F, G, R>(
  arr: A[],
  transducer1: Transducer<NoInfer<A>, B>,
  transducer2: Transducer<NoInfer<B>, C>,
  transducer3: Transducer<NoInfer<C>, D>,
  transducer4: Transducer<NoInfer<D>, E>,
  transducer5: Transducer<NoInfer<E>, F>,
  transducer6: Transducer<NoInfer<F>, G>,
  transducer7: Transducer<NoInfer<G>, R>
): R[];
export function transduce(arr: any[], ...transducers: Transducer<any, any>[]) {
  const reducer = compose.apply<null, any[], any>(
    null,
    transducers
  )(pushCombiner);
  const result: unknown[] = [];
  let exited = false;
  const exit = () => (exited = true);
  for (let i = 0, l = arr.length; i < l; i++) {
    if (exited) break;
    reducer(result, arr[i], exit);
  }
  return result;
}
