import { transduce, filter, map, flatMap } from "..";

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
  });

  it("combination", () => {
    const original = [1, 2, 3];
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
});
