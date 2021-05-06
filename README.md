# Transducing

Simple helper to optimize iterations over array.

```ts
import { transduce, map, flatMap, filter } from "transducing";

const arr = [1, 2, 3, 4, 5];

// this code will make 3 iterations over array
const newArray = arr
  .map(x => x * x)
  .filter(x => x > 5)
  .flatMap(x => [x + 1]);

// but this code will iterate over array only one time
const isString = (val: unknown): val is string => typeof val === "string";

const newArray = transduce(
  [1, 2, 3, "asdf"],
  filter(isString),
  map(v => [v]),
  flatMap(v => v)
);
```

## How does this work?

It uses transducing under the hood. It creates single composed transformer from the passed operations and applies this transformer to each item in array.

If you are interested in this topic, there is a [good article](https://www.digitalocean.com/community/tutorials/javascript-functional-programming-explained-fusion-transduction)
that explains it really well.
