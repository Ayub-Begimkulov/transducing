import { isArray } from "./utils";

export function pushCombiner(a: any[], b: any) {
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

export function addCombiner(a: Set<any>, b: any) {
  a.add(b);
  return a;
}
