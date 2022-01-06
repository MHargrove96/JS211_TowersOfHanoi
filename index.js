let stone = null
let counter = 0
let youWin = null 

const selectRow = (row) => {
  const currentRow = document.getElementById(row.id)
  console.log(row.id)

  if(currentRow.lastElementChild && !stone){
    return pickUpStone(currentRow)
  } 
  if(!currentRow.lastElementChild && !stone){
    console.log('Pick A Stone')
  }
  if(!currentRow.lastElementChild && stone){
    return dropStone(currentRow)
  }
  if(currentRow.lastElementChild.getAttribute('id') > stone.getAttribute('id')){
    return dropStone(currentRow)
  }
}

const pickUpStone = (rowID) => {
  stone = rowID.lastElementChild
  rowID.removeChild(rowID.lastElementChild)
  counter++ 
  console.log(" counter ", counter)
}

const dropStone = (rowID) => {
  rowID.appendChild(stone)
  console.log('dropped count', counter)
  if(counter > 14){
    checkForWin()
  }
  stone = null
}

const checkForWin = () => {
  if(document.getElementById("top-row").childElementCount == 4){
    youWin = document.getElementById("msgBox").innerHTML = 'You Win'
    console.log('You Win')
    return youWin 
  }
}