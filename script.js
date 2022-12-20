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

// record the positions taken by each player
// the variables have to be global !
let player = [-100,-101,-102,-103,-104,-105,-106,-107,-108];


const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.container');
const win=document.querySelector('#winner');
const winText = document.querySelector('#winning-message');
const restartButton = document.querySelector('#restart');
let playerO_turn = false;


// function to check the winning
//player is a global variable!

const winningRule = function(a,b,c,player){
    let spot1 = player[a];
    let spot2 = player[b];
    let spot3 = player[c];
    if (spot1 === spot2 && spot1 === spot3 && spot2 == spot3){
        if (spot1 === 1){
            console.log("Player X wins!")
        }else{
            console.log("Player O wins!")
        }
    }
}
const checkForWinner = function(){
    for(let i in winningCombo){
        let [a,b,c] = winningCombo[i]
        winningRule(a,b,c,player);
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
            let clickedCellValue = parseInt(clickedCell.dataset.cell);
            player[clickedCellValue] = 1;

            checkForWinner();
        } else {
            clickedCell.innerText = 'O';
            clickedCell.dataset.taken = "true";
            playerO_turn = false;
            let clickedCellValue = parseInt(clickedCell.dataset.cell);
            player[clickedCellValue] = 2;

            checkForWinner();
        }
    }
})

restartButton.addEventListener("click",restartGame)