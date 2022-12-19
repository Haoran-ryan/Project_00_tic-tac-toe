//player pices
const playerX = 'X';
const playerO = 'O';
//winning combination
const winningCombo =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.container');
const win=document.querySelector('#winner');
const winText = document.querySelector('#winning-message');
const restartButton = document.querySelector('#restart');
let playerO_turn = false;

// record the positions taken by each player
let spotsX = [];
let spotsO = [];

// function to check the winning
const checkForWinner = function(arr){
    let len = arr.length;
    if (len < 3){
        return
    }else{
        let result = JSON.stringify(arr);
        let combo = JSON.stringify(winningCombo);
        let c = combo.indexOf(result);
        console.log("result", result)
        console.log("combo", combo)
        // console.log("c", c)
        if( c!= -1){
            alert("WIN")
        }else{
            return
        }
    }

}

// event listener for the game board
board.addEventListener("click",function(event){
    const clickedCell = event.target;
    // console.log(clickedCell)
    if (!playerO_turn){
        clickedCell.innerText = 'X';
        playerO_turn = true;
        let clickedCellValue = clickedCell.dataset.cell;
        spotsX.push(parseInt(clickedCellValue));

        spotsX.sort();
        checkForWinner(spotsX);
    } else{
        clickedCell.innerText = 'O';
        playerO_turn = false;
        let clickedCellValue = clickedCell.dataset.cell;
        spotsO.push(parseInt(clickedCellValue));

        spotsO.sort();
        checkForWinner(spotsO);
    }

})

