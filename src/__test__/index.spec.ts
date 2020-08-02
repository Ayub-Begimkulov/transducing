import { chain } from "..";

describe("chain", () => {
  it("defined", () => {
    expect(chain).toBeDefined();
  });

  it("toArray", () => {
    const original = [1, 2, 3];
    const result = chain(original).toArray();
    expect(original).toEqual(result);
    // make sure that it's not a reference to the same array
    expect(original).not.toBe(result);
  });

  it("toSet", () => {
    const original = [1, 2, 3];
    const result = chain(original).toSet();
    const expected = new Set(original);
    expect(result).toEqual(expected);
  });

  it("toFlatArray", () => {
    const original = [1, 2, 3].map(v => [v]);
    const result = chain(original).toFlatArray();
    const expected = original.flatMap(v => v);
    expect(result).toEqual(expected);
  });

  it("map", () => {
    const original = [1, 2, 3];
    const mapper = (v: number) => v + 1;
    const result = chain(original).map(mapper).toArray();
    const expected = original.map(mapper);
    expect(result).toEqual(expected);
  });

  it("filter", () => {
    const original = [1, 2, 3];
    const predicate = (v: number) => v > 1;
    const result = chain(original).filter(predicate).toArray();
    const expected = original.filter(predicate);
    expect(result).toEqual(expected);
  });

  it("flatMap", () => {
    const original = [1, 2, 3].map(v => [v]);
    const mapper = (v: number[]) => v;
    const result = chain(original).flatMap(mapper).toArray();
    const expected = original.flatMap(mapper);
    expect(result).toEqual(expected);
  });

  it("combination", () => {
    const original = [1, 2, 3];
    const result = chain(original)
      .filter(v => v > 1)
      .map(v => [v + 1])
      .flatMap(v => v)
      .toArray();
    const expected = original
      .filter(v => v > 1)
      .map(v => [v + 1])
      .flatMap(v => v);
    expect(result).toEqual(expected);
  });
});
