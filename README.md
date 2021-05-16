# Transducing

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/Ayub-Begimkulov/transducing/Test/master?label=CI&logo=github&style=flat-square)](https://github.com/Ayub-Begimkulov/ts-get-set/actions/workflows/main.yml)
[![Codecov branch](https://img.shields.io/codecov/c/github/Ayub-Begimkulov/transducing/master?style=flat-square)](https://app.codecov.io/gh/Ayub-Begimkulov/transducing)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/transducing?style=flat-square)](https://bundlephobia.com/result?p=transducing@0.2.1)
[![npm](https://img.shields.io/npm/v/transducing?style=flat-square)](https://www.npmjs.com/package/transducing)
[![GitHub](https://img.shields.io/github/license/Ayub-Begimkulov/transducing?style=flat-square)](https://github.com/Ayub-Begimkulov/transducing/blob/master/LICENSE)

Simple helper to optimize iterations over array.

## Features

- Optimized iterations over large arrays
- Full TypeScript support
- Small bundle size
- Simple API that doesn't require any deep understanding of the functional programming

## Installation

```shell
# npm
npm i transducing

# yarn
yarn add transducing
```

## Usage

```ts
import { transduce, map, flatMap, filter } from "transducing";

const arr = [1, 2, 3, "asdf"];

const isString = val => typeof val === "string";

// this code will make 3 iterations over array
const newArray = arr
  .filter(isString)
  .map(v => [v])
  .flatMap(v => v);

// but this code will iterate over array only one time
const newArray = transduce(
  arr,
  filter(isString),
  map(v => [v]),
  flatMap(v => v)
);
```

## API

### `transduce`

Applies provided operations to array.

Example:

```ts
transduce(
  someArray,
  map(v => v + 1),
  filter(v => v > 5),
  take(10)
);
```

### `map`

Creates a high order map reducer that could be passed to `transduce`:

```ts
const mapper1 = map((x: number) => x + 5);
const mapper2 = map((x: number) => [x]);

transduce([1, 2, 3], mapper1, mapper2); // [[6], [7], [8]]
```

### `filter`

Creates a high order filter reducer that could be passed to `transduce`:

```ts
const predicate1 = filter((x: number) => x > 5);
const predicate2 = filter((x: number) => x < 15);

transduce([1, 6, 8, 16], predicate1, predicate2); // [6, 8]
```

### `flatMap`

Creates a high order flatMap reducer that could be passed to `transduce`:

```ts
const mapper1 = map(x => [x]);
const mapper2 = flatMap((x: number[]) => x);

transduce([1, 2, 3], mapper1, mapper2); // [1, 2, 3]
```

## `take`

Create a take reducer that will stop iterating after array reached a length of `n`:

```ts
const mapper = map(x => x + 1);

transduce([1, 2, 3], mapper1, take(2)); // [2, 3]
```

## `takeUntil`

Create a take reducer that will stop iterating after passed `predicate` returns `true`:

```ts
const mapper = map(x => x + 1);
const isString = v => typeof v === "string";

transduce([1, 2, 3, "asdf", 6], takeUntil(isString), mapper); // [2, 3, 4]
```

## `takeWhile`

Create a take reducer that will take elements while passed `predicate` succeeds:

```ts
const mapper = map(x => x + 1);
const isNumber = v => typeof v === "number";

transduce([1, 2, 3, "asdf", 6], takeWhile(isNumber), mapper); // [2, 3, 4]
```

## How does this work?

It uses transducing under the hood. It creates single composed transformer from the passed operations and applies this transformer to each item in array.

If you are interested in this topic, there is a [good article](https://www.digitalocean.com/community/tutorials/javascript-functional-programming-explained-fusion-transduction)
that explains it really well.

## License

[MIT](./LICENSE)
