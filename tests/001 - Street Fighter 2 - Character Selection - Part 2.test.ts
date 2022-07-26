/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import { superStreetFighterSelection } from '../001 - Street Fighter 2 - Character Selection - Part 2';
import { assert } from 'chai';

// DO NOT CHANGE THIS!
let fighters = [
	[       "",    "Ryu",  "E.Honda",  "Blanka",   "Guile", ""       ],
	[ "Balrog",    "Ken",  "Chun Li", "Zangief", "Dhalsim", "Sagat"  ],
	[   "Vega", "T.Hawk", "Fei Long",  "Deejay",   "Cammy", "M.Bison"]
];

describe("Street Fighter 2 - Character Selection - Part 2", function(){

it("should work with no selection cursor moves", function(){
  let moves =  [];
  let position = [0,0];
  let solution = [];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should stop on empty spaces vertically", function(){
  let moves =  ["up"];
  let position = [1,0];
  let solution = ['Balrog'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should stop on empty spaces vertically", function(){
  let moves =  ["up","up","up","up"];
  let position = [1,0];
  let solution = ['Balrog','Balrog','Balrog','Balrog'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should stop vertically", function(){
  let moves =  ["down","down","down","down"];
  let position = [1,0];
  let solution = ['Vega','Vega','Vega','Vega'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should stop on empty spaces vertically", function(){
  let moves =  ["up","up","up","up"];
  let position = [1,5];
  let solution = ['Sagat','Sagat','Sagat','Sagat'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should stop vertically", function(){
  let moves =  ["down","down","down","down"];
  let position = [1,5];
  let solution = ['M.Bison','M.Bison','M.Bison','M.Bison'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should rotate horizontally", function(){
  let moves =  ["left","left","left","left","left","left","left","left"];
  let position = [0,2];
  let solution = ['Ryu', 'Guile', 'Blanka', 'E.Honda', 'Ryu', 'Guile', 'Blanka', 'E.Honda'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should rotate horizontally", function(){
  let moves =  ["left","left","left","left","left","left","left","left"];
  let position = [1,3];
  let solution = ['Chun Li', 'Ken', 'Balrog', 'Sagat', 'Dhalsim', 'Zangief', 'Chun Li', 'Ken'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should rotate horizontally with empty spaces", function(){
  let moves =  ["right","right","right","right","right","right","right","right"];
  let position = [0,2];
  let solution = ['Blanka', 'Guile', 'Ryu', 'E.Honda', 'Blanka', 'Guile', 'Ryu', 'E.Honda'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

it("should rotate on all rows", function(){
  let moves =  ["right","right","right","right","right","right","down","left","left","left","left","left","left","left","left","left","left","left","left","down","right","right","right","right","right","right","right","right","right","right","right","right"];
  let position = [0,2];
  let solution = ['Blanka', 'Guile', 'Ryu', 'E.Honda', 'Blanka', 'Guile', 'Dhalsim', 'Zangief', 'Chun Li', 'Ken', 'Balrog', 'Sagat', 'Dhalsim', 'Zangief', 'Chun Li', 'Ken', 'Balrog', 'Sagat', 'Dhalsim', 'Cammy', 'M.Bison', 'Vega', 'T.Hawk', 'Fei Long', 'Deejay', 'Cammy', 'M.Bison', 'Vega', 'T.Hawk', 'Fei Long', 'Deejay', 'Cammy'];
  assert.deepEqual(superStreetFighterSelection(fighters, position, moves),solution);
});

// DO NOT CHANGE THIS VARIABLE!
// LIST WITH HOLES AND DUPLICATES
let fighters3 = [
	[       "",    "Ryu",  "E.Honda",  "Cammy",  "Blanka",   "Guile",        "", "Chun Li" ],
	[ "Balrog",    "Ken",  "Chun Li",       "", "M.Bison", "Zangief", "Dhalsim", "Sagat"  ],
	[   "Vega",       "", "Fei Long", "Balrog",  "Deejay",   "Cammy",        "", "T.Hawk"]
];

it("should rotate on all rows", function(){
  let moves =  ["right","right","right","right","right","right","down","left","left","left","left","left","left","left","left","left","left","left","left","down","right","right","right","right","right","right","right","right","right","right","right","right"];
  let position = [0,2];
  let solution = ['Cammy', 'Blanka', 'Guile', 'Chun Li', 'Ryu', 'E.Honda', 'Chun Li', 'Ken', 'Balrog', 'Sagat', 'Dhalsim', 'Zangief', 'M.Bison', 'Chun Li', 'Ken', 'Balrog', 'Sagat', 'Dhalsim', 'Zangief', 'Cammy', 'T.Hawk', 'Vega', 'Fei Long', 'Balrog', 'Deejay', 'Cammy', 'T.Hawk', 'Vega', 'Fei Long', 'Balrog', 'Deejay', 'Cammy'];
  assert.deepEqual(superStreetFighterSelection(fighters3, position, moves),solution);
});

it("should work", function(){
  let moves =  ["down","right","right","right","down","left","left","down","right","right","right","up"];
  let position = [0,3];
  let solution = ['Cammy', 'Blanka', 'Guile', 'Chun Li', 'Sagat', 'Dhalsim', 'Zangief', 'Cammy', 'T.Hawk', 'Vega', 'Fei Long', 'Chun Li'];
  assert.deepEqual(superStreetFighterSelection(fighters3, position, moves),solution);
});

// DO NOT CHANGE THIS VARIABLE!
let fighters4 = [
	[        "",     "Ryu",  "E.Honda",  "Cammy" ],
	[  "Balrog",     "Ken",  "Chun Li",       "" ],
	[    "Vega",        "", "Fei Long", "Balrog",],
    [  "Blanka",   "Guile",         "", "Chun Li"],
    [ "M.Bison", "Zangief",  "Dhalsim", "Sagat"  ],
    [  "Deejay",   "Cammy",         "", "T.Hawk" ]
]

it("should work with longer grid", function(){
  let moves =  ["left","left","down","right","right","right","right","down","left","left","left","left","down","right","right", "down","right","right","right","down","left","left","left","down","left","left","left"];
  let position = [0,3];
  let solution = ['E.Honda', 'Ryu', 'Ken', 'Chun Li', 'Balrog', 'Ken', 'Chun Li', 'Fei Long', 'Vega', 'Balrog', 'Fei Long', 'Vega', 'Blanka', 'Guile', 'Chun Li', 'Sagat', 'M.Bison', 'Zangief', 'Dhalsim', 'Dhalsim', 'Zangief', 'M.Bison', 'Sagat', 'T.Hawk', 'Cammy', 'Deejay', 'T.Hawk'];
  assert.deepEqual(superStreetFighterSelection(fighters4, position, moves),solution);
});

it("should work with odd initial position", function(){
  let moves =  ["left","left","down","right","right","right","right","down","left","left","left","left","up","right","right", "up","right","right","right"];
  let position = [3,3];
  let solution = ['Guile', 'Blanka', 'M.Bison', 'Zangief', 'Dhalsim', 'Sagat', 'M.Bison', 'Deejay', 'T.Hawk', 'Cammy', 'Deejay', 'T.Hawk', 'Sagat', 'M.Bison', 'Zangief', 'Guile', 'Chun Li', 'Blanka', 'Guile'];
  assert.deepEqual(superStreetFighterSelection(fighters4, position, moves),solution);
});

});
