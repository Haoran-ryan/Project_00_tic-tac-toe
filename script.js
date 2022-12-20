//player pices
const playerX = 'X';
const playerO = 'O';
//winning combination
// const winningCombo =[
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6],
// ];

[1,4,5,7]

const winningCombo =[
    "012","345","678",
    "036","147","258",
    "048","246"
]

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.container');
const win=document.querySelector('#winner');
const winText = document.querySelector('#winning-message');
const restartButton = document.querySelector('#restart');
let playerO_turn = false;

// record the positions taken by each player
// the variables have to be global !
let spotsX = [];
let spotsO = [];

// function to process the 'indices' of the clicked cells
const sorting = function(arr){
    let result = arr.sort();
    return result.join("");
}

// function to check the winning
const checkForWinner = function(arr){
    let len = arr.length;
    if (len < 3){
        return
    }else{
        let stringToCompare = sorting(arr);
        // console.log("string to compare: "+stringToCompare);
        winningCombo.forEach(element => {stringToCompare.includes(element)? console.log("You Win"): false})
        }
}

// function to restart the game
const restartGame = function(){
    Array.from(cells).forEach(item => item.dataset.cell = "0");
    playerO_turn = false;
    spotsX = [];
    spotsO = [];
}


// event listener for the game board
board.addEventListener("click",function(event){
    const clickedCell = event.target;
    // check if the cell is clicked
    if (clickedCell.dataset.taken !== "false"){
        console.log("it has been taken!")
    }else {
        if (!playerO_turn) {
            clickedCell.innerText = 'X';
            clickedCell.dataset.taken = "true";
            playerO_turn = true;
            let clickedCellValue = clickedCell.dataset.cell;
            spotsX.push(clickedCellValue);

            checkForWinner(spotsX);
        } else {
            clickedCell.innerText = 'O';
            clickedCell.dataset.taken = "true";
            playerO_turn = false;
            let clickedCellValue = clickedCell.dataset.cell;
            spotsO.push(clickedCellValue);

            checkForWinner(spotsO);
        }
    }
})

restartButton.addEventListener("click",restartGame)