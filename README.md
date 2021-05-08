# Transducing

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/Ayub-Begimkulov/transducing/Test/master?label=CI&logo=github&style=flat-square)](https://github.com/Ayub-Begimkulov/ts-get-set/actions/workflows/main.yml)
[![Codecov branch](https://img.shields.io/codecov/c/github/Ayub-Begimkulov/transducing/master?style=flat-square)](https://app.codecov.io/gh/Ayub-Begimkulov/transducing)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/transducing?style=flat-square)](https://bundlephobia.com/result?p=transducing@0.2.1)
[![npm](https://img.shields.io/npm/v/transducing?style=flat-square)](https://www.npmjs.com/package/transducing)
[![GitHub](https://img.shields.io/github/license/Ayub-Begimkulov/transducing?style=flat-square)](https://github.com/Ayub-Begimkulov/transducing/blob/master/LICENSE)

Simple helper to optimize iterations over array.

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

## How does this work?

It uses transducing under the hood. It creates single composed transformer from the passed operations and applies this transformer to each item in array.

If you are interested in this topic, there is a [good article](https://www.digitalocean.com/community/tutorials/javascript-functional-programming-explained-fusion-transduction)
that explains it really well.

## License

[MIT](./LICENSE)
