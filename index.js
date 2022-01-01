// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  console.log("**********", stone)
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the row's id: ", row.id)
  console.log("Here is the row's data-row: ", currentRow)

  const currentRowId = row.id
  console.log('here',currentRow)

  if(stone == null){
    console.log('there is no stone')
    pickUpStone(currentRowId)
    // even when the stone == null it does not run the pick up stone on the row that was clicked 
  }else {
    console.log('stone present')
    dropStone(currentRowId, stone)
  }
} 

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
const pickUpStone = (rowID) => {
  console.log('pickUpStone is being called', stone, rowID)
  const selectedRow = document.getElementById(rowID);
  console.log(stone, 'stone', selectedRow, 'selectedRow')
  stone = selectedRow.removeChild(selectedRow.lastElementChild);
  console.log('picked up', stone)
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID, stone) => {
  console.log('dropstone being called')
  console.log('dropped', stone)
  document.getElementById(rowID).appendChild(stone)
  console.log('stone has the value of', stone)
  stone = null
  console.log('stone has the value of', stone)
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

