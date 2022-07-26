/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { assert } from "chai";

import { pigIt } from "../002 - Simple Pig Latin";

describe("Simple Pig Latin", () => {
  it("tests", () => {
    assert.strictEqual(pigIt('Pig latin is cool'),'igPay atinlay siay oolcay')
    assert.strictEqual(pigIt('This is my string'),'hisTay siay ymay tringsay')
    assert.strictEqual(pigIt('. ? EzvuQtYdNkFMsfcb upkxy'), '. ? zvuQtYdNkFMsfcbEay pkxyuay')
});
});
