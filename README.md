# Transducing

Simple helper to optimize iterations over array.

```js
import { chain } from 'transducing';

const arr = [1, 2, 3, 4, 5];

// this code will make 3 iterations over array
const newArray = arr
  .map(x => x * x)
  .filter(x => x > 5)
  .flatMap(x => [x + 1]);

// but this code will iterate over array only one time
const newArray = chain(arr)
  .map(x => x * x)
  .filter(x => x > 5)
  .flatMap(x => [x + 1])
  .toArray();

```

## How does this work?

It uses transducing under the hood. When you pass a function to one of the iteration methods (map, filter, flatMap), 
it creates new composed transformer, and when you call `toArray`, it will apply this transformer to each item in array. 

If you are interested in this topic, there is a [good article](https://www.digitalocean.com/community/tutorials/javascript-functional-programming-explained-fusion-transduction) 
that explains it really well. 
