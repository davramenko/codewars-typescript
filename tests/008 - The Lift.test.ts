/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { theLift } from '../008 - The Lift';
import { expect } from 'chai';

describe("The Lift", function() {

  it("up", function() {
    var queues = [
      [],      // G
      [],      // 1
      [5,5,5], // 2
      [],      // 3
      [],      // 4
      [],      // 5
      [],      // 6
    ];
    var result = theLift(queues,5);
    expect(result).to.have.members([0,2,5,0]);
  });

  it("down", function() {
    var queues = [
      [],    // G
      [],    // 1
      [1,1], // 2
      [],    // 3
      [],    // 4
      [],    // 5
      [],    // 6
    ];
    var result = theLift(queues,5);
    expect(result).to.have.members([0,2,1,0]);
  });


    it("up and up", function() {
    var queues = [
      [],  // G
      [3], // 1
      [4], // 2
      [],  // 3
      [5], // 4
      [],  // 5
      [],  // 6
    ];
    var result = theLift(queues,5);
    expect(result).to.have.members([0,1,2,3,4,5,0]);
  });

 it("down and down", function() {
    var queues = [
      [],  // G
      [0], // 1
      [],  // 2
      [],  // 3
      [2], // 4
      [3], // 5
      [],  // 6
    ];
    var result = theLift(queues,5);
    expect(result).to.have.members([0,5,4,3,2,1,0]);
  });

  it('up and down', function() {
    const queues = [
      [ 3 ], // G
      [ 2 ], // 1
      [ 0 ], // 2
      [ 2 ], // 3
      [],    // 4
      [],    // 5
      [ 5 ], // 6
    ];
    const result = theLift(queues,5);
    expect(result).to.have.members([ 0, 1, 2, 3, 6, 5, 3, 2, 0 ]);
  });

  it('yo-yo', function() {
    const queues = [
      [],             // G
      [],             // 1
      [ 4, 4, 4, 4 ], // 2
      [],             // 3
      [ 2, 2, 2, 2 ], // 4
      [],             // 5
      [],             // 6
    ];
    const result = theLift(queues,2);
    expect(result).to.have.members([ 0, 2, 4, 2, 4, 2, 0 ]);
  });

  it('enter on ground floor', function() {
    const queues = [
      [ 1, 2, 3, 4 ], // G
      [],             // 1
      [],             // 2
      [],             // 3
      [],             // 4
      [],             // 5
      [],             // 6
    ];
    const result = theLift(queues,5);
    expect(result).to.have.members([ 0, 1, 2, 3, 4, 0 ]);
  });

  it('lift full (up)', function() {
    const queues = [
      [ 3, 3, 3, 3, 3, 3 ], // G
      [],                   // 1
      [],                   // 2
      [],                   // 3
      [],                   // 4
      [],                   // 5
      [],                   // 6
    ];
    const result = theLift(queues,5);
    expect(result).to.have.members([ 0, 3, 0, 3, 0 ]);
  });

  it('lift full (down)', function() {
    const queues = [
      [],              // G
      [],              // 1
      [],              // 2
      [                // 3
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1
      ],
      [],              // 4
      [],              // 5
      [],              // 6
    ];
    const result = theLift(queues,5);
    expect(result).to.have.members([0, 3, 1, 3, 1, 3, 1, 0]);
  });

  it('lift full (up and down)', function() {
    const queues = [
      [ 3, 3, 3, 3, 3, 3 ], // G
      [],                   // 1
      [],                   // 2
      [],                   // 3
      [],                   // 4
      [ 4, 4, 4, 4, 4, 4 ], // 5
      [],                   // 6
    ];
    const result = theLift(queues,5);
    expect(result).to.have.members([ 0, 3, 5, 4, 0, 3, 5, 4, 0 ]);
  });

  it('tricky queues', function() {
    const queues = [
      [],                   // G
      [ 0, 0, 0, 6 ],       // 1
      [],                   // 2
      [],                   // 3
      [],                   // 4
      [ 6, 6, 0, 0, 0, 6 ], // 5
      [],                   // 6
    ];
    const result = theLift(queues,5);
    expect(result).to.have.members([ 0, 1, 5, 6, 5, 1, 0, 1, 0 ]);
  });

  it ('highlander', function() {
    const queues = [
      [],          // G
      [ 2 ],       // 1
      [ 3, 3, 3 ], // 2
      [ 1 ],       // 3
      [],          // 4
      [],          // 5
      [],          // 6
    ];
    const result = theLift(queues,1);
    expect(result).to.have.members([ 0, 1, 2, 3, 1, 2, 3, 2, 3, 0 ]);
  });
});
