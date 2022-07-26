/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { dblLinear } from '../006 - Twice linear';
import { assert } from "chai";

describe("Twice linear", function() {
  it("Basic tests maxRot", function() {
    assert.strictEqual(dblLinear(10), 22);
    assert.strictEqual(dblLinear(20), 57);
    assert.strictEqual(dblLinear(30), 91);
  });
});