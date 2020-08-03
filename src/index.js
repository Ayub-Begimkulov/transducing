import compose from "./compose";
import { pushCombiner, flatPushCombiner, addCombiner } from "./combiners";
import { isArray, id } from "./utils";

export function chain(arr) {
  return new Chain(arr);
}

class Chain {
  constructor(arr) {
    this.arr = arr;
    this.transducer = id;
  }

  map(fn) {
    const { transducer } = this;
    const currentTransducer = mapReducer(fn);
    this.transducer = compose(transducer, currentTransducer);
    return this;
  }

  filter(fn) {
    const { transducer } = this;
    const currentTransducer = filterReducer(fn);
    this.transducer = compose(transducer, currentTransducer);
    return this;
  }

  flatMap(fn) {
    const { transducer } = this;
    const currentTransducer = flatMapReducer(fn);
    this.transducer = compose(transducer, currentTransducer);
    return this;
  }

  toFlatArray() {
    const { arr, transducer } = this;
    return transduce(arr, transducer, flatPushCombiner, []);
  }

  toArray() {
    const { arr, transducer } = this;
    return transduce(arr, transducer, pushCombiner, []);
  }

  toSet() {
    const { arr, transducer } = this;
    return transduce(arr, transducer, addCombiner, new Set());
  }
}

function transduce(arr, transducer, combiner, to) {
  return arr.reduce(transducer(combiner), to);
}

const mapReducer = mapper => combiner => (acc, c) => {
  return combiner(acc, mapper(c));
};

const flatMapReducer = mapper => combiner => (acc, c) => {
  const value = mapper(c);
  if (isArray(value)) {
    value.forEach(v => combiner(acc, v));
  } else {
    combiner(acc, value);
  }
  return acc;
};

const filterReducer = predicate => combiner => (acc, c) => {
  return predicate(c) ? combiner(acc, c) : acc;
};
