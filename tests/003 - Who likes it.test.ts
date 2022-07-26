/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { assert } from "chai";
import { likes } from "../003 - Who likes it";

describe('Who likes it', function() {
  it('should return correct text', function() {
    assert.equal(likes([]), 'no one likes this');
    assert.equal(likes(['Peter']), 'Peter likes this');
    assert.equal(likes(['Jacob', 'Alex']), 'Jacob and Alex like this');
    assert.equal(likes(['Max', 'John', 'Mark']), 'Max, John and Mark like this');
    assert.equal(likes(['Alex', 'Jacob', 'Mark', 'Max']), 'Alex, Jacob and 2 others like this');
  });
});
