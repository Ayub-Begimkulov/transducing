import { isArray } from "./utils";

export function pushCombiner<T>(a: T[], b: T) {
  a.push(b);
  return a;
}

export function flatPushCombiner(a: any[], b: any) {
  if (isArray(b)) {
    a.push(...b);
  } else {
    a.push(b);
  }
  return a;
}

export function addCombiner<T>(a: Set<T>, b: T) {
  a.add(b);
  return a;
}
