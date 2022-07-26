/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { expect } from "chai";
import { calculateCombinations } from "../009 - Screen Locking Patterns";

// TODO: Replace examples and use TDD development by writing your own tests

describe("Screen Locking Patterns", function() {
  it("test", function() {
    expect(calculateCombinations('A', 10)).to.equal(0);
    expect(calculateCombinations('A', 0)).to.equal(0);
    expect(calculateCombinations('E', 14)).to.equal(0);
    expect(calculateCombinations('B', 1)).to.equal(1);
    expect(calculateCombinations('C', 2)).to.equal(5);
    expect(calculateCombinations('E', 2)).to.equal(8);
    expect(calculateCombinations('E', 4)).to.equal(256);
  });
});