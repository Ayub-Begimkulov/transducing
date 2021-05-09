import Benchmark = require("benchmark");
import { transduce, filter, map } from "../src";

interface ITestCase {
  name: string;
  run: () => void;
}

function runBench(...cases: ITestCase[]) {
  const suite = new Benchmark.Suite();
  cases.forEach(({ name, run }) => {
    suite.add(name, run);
  });
  suite
    .on("cycle", (event: any) => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      console.log("Fastest is " + suite.filter("fastest").map("name"));
    })
    .run({ async: true });
}

function createArray(length: number) {
  const arr = Array(length);
  for (let i = 0; i < length; i++) {
    arr.push(Math.random());
  }
  return arr;
}

const size = process.env["ARR_SIZE"]
  ? parseInt(process.env["ARR_SIZE"])
  : 1_000_000;

const vanillaArr = createArray(size);
const transducingArr = createArray(size);

const mapper = (v: number) => v + 1;
const predicate = (v: number) => v > 500;

runBench(
  {
    name: "vanilla",
    run() {
      vanillaArr.map(mapper).filter(predicate);
    },
  },
  {
    name: "with transducing",
    run() {
      transduce(transducingArr, map(mapper), filter(predicate));
    },
  }
);
