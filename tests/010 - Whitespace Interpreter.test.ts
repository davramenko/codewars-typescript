/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { whitespace } from '../010 - Whitespace Interpreter';
import { assert } from "chai";

describe("Whitespace Interpreter", function(){
  it("Testing push, output of numbers 0 through 3", function(){
    var output1 = "   \t\n\t\n \t\n\n\n";
    var output2 = "   \t \n\t\n \t\n\n\n";
    var output3 = "   \t\t\n\t\n \t\n\n\n";
    var output0 = "    \n\t\n \t\n\n\n";

    assert.equal(whitespace(output1), "1");
    assert.equal(whitespace(output2), "2");
    assert.equal(whitespace(output3), "3");
    assert.equal(whitespace(output0), "0");
  });

  it("Testing ouput of numbers -1 through -3", function(){
    var outputNegative1 = "  \t\t\n\t\n \t\n\n\n";
    var outputNegative2 = "  \t\t \n\t\n \t\n\n\n";
    var outputNegative3 = "  \t\t\t\n\t\n \t\n\n\n";

    assert.equal(whitespace(outputNegative1), "-1");
    assert.equal(whitespace(outputNegative2), "-2");
    assert.equal(whitespace(outputNegative3), "-3");
  });

  it("Testing simple flow control edge case - Expecting exception for unclean termination", function () {
    assert.throws(function () {
      whitespace("");
    });
  });

  it("Testing output of letters A through C", function () {
    var outputA = "   \t     \t\n\t\n  \n\n\n";
    var outputB = "   \t    \t \n\t\n  \n\n\n";
    var outputC = "   \t    \t\t\n\t\n  \n\n\n";

    assert.equal(whitespace(outputA), "A");
    assert.equal(whitespace(outputB), "B");
    assert.equal(whitespace(outputC), "C");
  });

  it("Testing output of letters A through C with comments", function () {
    var outputA = "blahhhh   \targgggghhh     \t\n\t\n  \n\n\n";
    var outputB = " I heart \t  cats  \t \n\t\n  \n\n\n";
    var outputC = "   \t  welcome  \t\t\n\t\n to the\nnew\nworld\n";

    assert.equal(whitespace(outputA), "A");
    assert.equal(whitespace(outputB), "B");
    assert.equal(whitespace(outputC), "C");
  });

  it("Testing stack functionality", function () {
    var pushTwice = "   \t\t\n   \t\t\n\t\n \t\t\n \t\n\n\n";
    var duplicate = "   \t\t\n \n \t\n \t\t\n \t\n\n\n";
    var duplicateN1 = "   \t\n   \t \n   \t\t\n \t  \t \n\t\n \t\n\n\n";
    var duplicateN2 = "   \t\n   \t \n   \t\t\n \t  \t\n\t\n \t\n\n\n";
    var duplicateN3 = "   \t\n   \t \n   \t\t\n \t   \n\t\n \t\n\n\n";
    var swap = "   \t\t\n   \t \n \n\t\t\n \t\t\n \t\n\n\n";
    var discard = "   \t\t\n   \t \n \n\t \n\n\t\n \t\n\n\n";
    var slide = "   \t\t\n   \t \n   \t\n   \t  \n   \t\t \n   \t \t\n   \t\t\t\n \n\t \t\n \t\t\n\t\n \t\t\n \t\t\n \t\t\n \t\n\n\n";

    assert.equal(whitespace(pushTwice), "33");
    assert.equal(whitespace(duplicate), "33");
    assert.equal(whitespace(duplicateN1), "1");
    assert.equal(whitespace(duplicateN2), "2");
    assert.equal(whitespace(duplicateN3), "3");
    assert.equal(whitespace(swap), "32");
    assert.equal(whitespace(discard), "2");
    assert.equal(whitespace(slide), "5123");
  });
});
