/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { convertFrac } from '../007 - Common Denominators';
import {assert} from "chai";

describe("Common Denominators", function() {
  it("Basic tests convertFrac", function() {
    assert.strictEqual(
      convertFrac([[1, 2], [1, 3], [1, 4]]),
      "(6,12)(4,12)(3,12)"
    );
    assert.strictEqual(
      convertFrac([[69, 130], [87, 1310], [3, 4]]),
      "(18078,34060)(2262,34060)(25545,34060)"
    );
    assert.strictEqual(
      convertFrac([[1, 2], [4, 5], [3, 4], [6, 9], [7, 10]]),
      "(30,60)(48,60)(45,60)(40,60)(42,60)"
    );
  });
});
