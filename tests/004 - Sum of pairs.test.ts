/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { assert } from "chai";
import { sumPairs } from "../004 - Sum of pairs";

const l1: number[] = [1, 4, 8, 7, 3, 15],
l2: number[] = [1, -2, 3, 0, -6, 1],
l3: number[] = [20, -13, 40],
l4: number[] = [1, 2, 3, 4, 1, 0],
l5: number[] = [10, 5, 2, 3, 7, 5],
l6: number[] = [4, -2, 3, 3, 4],
l7: number[] = [0, 2, 0],
l8: number[] = [5, 9, 13, -3];

describe("Sum of pairs", function() {
  it("Basic", () => {
    assert.deepEqual(sumPairs(l1, 8), [1, 7], "["+l1+"] should return [1, 7] for sum = 8");
  });
  it("Negatives", () => {
    assert.deepEqual(sumPairs(l2, -6), [0, -6], "["+l2+"] should return [0, -6] for sum = -6");
  });
  it("No Match", () => {
    assert.deepEqual(sumPairs(l3, -7), undefined, "["+l3+"] should return undefined for sum = -7");
  });
  it("First Match From Left", () => {
    assert.deepEqual(sumPairs(l4, 2), [1, 1], "["+l4+"] should return [1, 1] for sum = 2 ");
  });
  it("First Match From Left REDUX!", () => {
    assert.deepEqual(sumPairs(l5, 10), [3, 7], "["+l5+"] should return [3, 7] for sum = 10 ");
  });
  it("Duplicates", () => {
    assert.deepEqual(sumPairs(l6, 8), [4, 4], "["+l6+"] should return [4, 4] for sum = 8");
  });
  it("Zeroes", () => {
    assert.deepEqual(sumPairs(l7, 0), [0, 0], "["+l7+"] should return [0, 0] for sum = 0");
  });
  it("Subtraction", () => {
    assert.deepEqual(sumPairs(l8, 10), [13, -3], "["+l8+"] should return [13, -3] for sum = 10");
  });
});
