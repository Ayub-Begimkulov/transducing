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

const flatMapReducer = mapper => combiner => (acc, c) => {
  const value = mapper(c);
  if (isArray(value)) {
    value.forEach(v => combiner(acc, v));
  } else {
    combiner(acc, c);
  }
  return acc;
};

const mapReducer = mapper => combiner => (acc, c) => {
  return combiner(acc, mapper(c));
};

const filterReducer = predicate => combiner => (acc, c) => {
  return predicate(c) ? combiner(acc, c) : acc;
};

function compose(...args) {
  switch (args.length) {
    case 0:
      return;
    case 1:
      return args[0];
    default:
      return args.reduce(composeReducer);
  }
}

function composeReducer(a, b) {
  return function () {
    return a.call(this, b.apply(this, arguments));
  };
}

function pushCombiner(a, b) {
  a.push(b);
  return a;
}

function flatPushCombiner(a, b) {
  if (isArray(b)) {
    a.push(...b);
  } else {
    a.push(b);
  }
  return a;
}

function addCombiner(a, b) {
  a.add(b);
  return a;
}

function isArray(val) {
  return Array.isArray(val);
}

function id(v) {
  return v;
}
