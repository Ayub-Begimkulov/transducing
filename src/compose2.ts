import { AnyFunction } from "./types";

type Id = <T>() => T;

type Compose<
  Fns extends AnyFunction[],
  Result extends AnyFunction[] = [],
  PrevFn extends AnyFunction = AnyFunction
> = Fns extends []
  ? Fns
  : Fns["length"] extends Result["length"]
  ? Result
  : Result extends []
  ? Compose<Fns, [Fns[0]], Fns[0]>
  : Compose<
      Fns,
      [
        ...Result,
        (arg: ReturnType<PrevFn>) => ReturnType<Fns[Result["length"]]>
      ],
      Fns[Result["length"]]
    >;

declare function compose(): Id;
declare function compose<Fn extends AnyFunction>(fn: Fn): Fn;
declare function compose<
  FirstFn extends AnyFunction,
  LastFn extends AnyFunction,
  Fns extends AnyFunction[]
>(
  ...funcs: Compose<[FirstFn, ...Fns, LastFn]>
): (...args: Parameters<FirstFn>) => ReturnType<LastFn>;
