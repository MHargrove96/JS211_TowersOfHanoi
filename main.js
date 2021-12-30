'use strict';

const assert = require('assert');
const readline = require('readline');
const standalone = require('stylelint/lib/standalone');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
// * each key is an array of Numbers: 
// * A is the far-left, 
// * B is the middle, 
// * C is the far-right stack
// * Each number represents the largest to smallest tokens: 
// * 4 is the largest, 
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = (startingStack, endingStack) => {
  stacks[endingStack].push(stacks[startingStack].pop())
  console.log('movePiece() being called')
  // because isLegal() is never returning either of my first if statment move peice is not being called, but does work standalone ********** 
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startingStack, endingStack) => {
  let firstPiece = stacks[startingStack].toString()
  let secondPiece = stacks[endingStack].toString()
  let lastOfStarting = firstPiece.charAt(firstPiece.length - 1)
  let lastOfEnding = secondPiece.charAt(secondPiece.length - 1)
  // this feel like the longest way possible to get the affect i was after ********** 

  console.log(lastOfStarting, 'lastOfStarting')
  console.log(lastOfEnding, 'lastOfEnding')
  // i do not know what lastOfEnding is before the first number is in that column null or undefined ********** 
  console.log('isLegal() is being called')

  if (lastOfStarting < lastOfEnding) {
    movePiece(startingStack, endingStack);
    console.log('first if')
  } else if (lastOfStarting == 1 && lastOfEnding == null) {
    console.log('second if')
    movePiece(startingStack, endingStack);
  } else {
    console.log('invalid move')
  }
  // something is wrong with my first to if statments cause they are never being called ********** 
}


// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // if the stacks look like this 
  // a: [],
  // b: [],
  // c: [4, 3, 2, 1]
  if (stacks.a == [] && stacks.b == [] && stacks.c == [4, 3, 2, 1]) {
    return true
  } else {
    return false
  }
  // is there a better way to do this? / not even sure this works cant test **********
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  console.log('start', startStack)
  console.log('end', endStack)
  // movePiece(startStack, endStack)
  // movePiece() works on it own the problem is still isLegal() **********
  isLegal(startStack, endStack)
  // trying to pass through isLegal() first ********** 
}
// ---------------------------------- test --------------------------------- test --------------------------- test -----------------------------------------------------------------
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] }; // do i need to change this to stack c or is it testing this way for a reason?
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };  // kinda the same question as above for this test. 
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
