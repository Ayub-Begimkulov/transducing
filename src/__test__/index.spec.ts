import {
  transduce,
  filter,
  map,
  flatMap,
  take,
  takeUntil,
  takeWhile,
} from "..";

describe("transduce", () => {
  it("map", () => {
    const original = [1, 2, 3];
    const mapper = (v: number) => v + 1;
    const result = transduce(original, map(mapper));
    const expected = original.map(mapper);
    expect(result).toEqual(expected);
  });

  it("filter", () => {
    const original = [1, 2, 3];
    const predicate = (v: number) => v > 1;
    const result = transduce(original, filter(predicate));
    const expected = original.filter(predicate);
    expect(result).toEqual(expected);
  });

  it("flatMap", () => {
    const original = [1, 2, 3];
    const nested = original.map(v => [v]);
    const mapper = <T>(v: T) => v;
    // with nested arrays
    let result = transduce(nested, flatMap(mapper));
    let expected = nested.flatMap(mapper);
    expect(result).toEqual(expected);
    // with flat arrays
    result = transduce(original, flatMap(mapper));
    expected = original.flatMap(mapper);
    expect(result).toEqual(expected);
  });

  it("take", () => {
    const original = [1, 2, 3, 4, 5];
    const result = transduce(original, take(3));
    expect(result).toEqual([1, 2, 3]);
  });

  it("takeUntil", () => {
    const original = [1, 2, 3, "adf", 5];

    // with flat arrays
    const result = transduce(
      original,
      takeUntil(v => typeof v === "string")
    );
    expect(result).toEqual([1, 2, 3]);
  });

  it("takeWhile", () => {
    const original = [1, 2, 3, "adf", 5];

    // with flat arrays
    const result = transduce(
      original,
      takeWhile(v => typeof v === "number")
    );
    expect(result).toEqual([1, 2, 3]);
  });

  it("combination", () => {
    const original = [1, 2, 3, 5, 6, 7];
    const result = transduce(
      original,
      filter(v => v > 1),
      map(v => [v + 1]),
      flatMap(v => v)
    );
    const expected = original
      .filter(v => v > 1)
      .map(v => [v + 1])
      .flatMap(v => v);
    expect(result).toEqual(expected);
  });

  it.todo("correctly passes additional arguments into combiner");
});
