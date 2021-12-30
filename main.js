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

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = (startingStack, endingStack) => {
  stacks[endingStack].push(stacks[startingStack].pop())
  checkForWin()
}

const isLegal = (startingStack, endingStack) => {
  let firstPiece = stacks[startingStack].toString()
  let secondPiece = stacks[endingStack].toString()
  let lastOfStarting = firstPiece.charAt(firstPiece.length - 1)
  let lastOfEnding = secondPiece.charAt(secondPiece.length - 1)
  // this feel like the longest way possible to get the affect i was after ********** 

  if (lastOfStarting == '') {
    console.log("Invalid move")
    return false;
  } else {
    if (lastOfStarting < lastOfEnding) {
      movePiece(startingStack, endingStack);
      return true;
    } else if (lastOfEnding == '') {
      movePiece(startingStack, endingStack);
      return true; 
    } else {
      console.log('Invalid move');
      return false;
    }
  }
}


const checkForWin = () => {
  if(stacks['c'].length == 4) {
    console.log('We have got a winner!')
    return true;
  }  else {
    return false;
  }
}

const towersOfHanoi = (startStack, endStack) => {
  console.log('start', startStack)
  console.log('end', endStack)

  isLegal(startStack, endStack)
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
      stacks = { a: [], b: [], c: [4, 3, 2, 1] }; // do i need to change this to stack c or is it testing this way for a reason?
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };  // kinda the same question as above for this test. 
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
