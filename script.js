//player pices
const playerX = 'X';
const playerO = 'O';
//winning combination
const winningCombo =[
    //rows
    {combo:[0,1,2], strikeClass: "strike-row-1"},
    {combo:[3,4,5], strikeClass: "strike-row-2"},
    {combo:[6,7,8], strikeClass: "strike-row-3"},
    //columns
    {combo:[0,3,6], strikeClass: "strike-column-1"},
    {combo:[1,4,7], strikeClass: "strike-column-2"},
    {combo:[2,5,8], strikeClass: "strike-column-3"},

    //diagonals
    {combo:[0,4,8], strikeClass: "strike-diagonal-1"},
    {combo:[2,4,6], strikeClass: "strike-diagonal-2"},

];

// record the positions taken by each player
// the variables have to be global !
let player = [-100,-101,-102,-103,-104,-105,-106,-107,-108];

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.container');
const win=document.querySelector('#winner');
const winningMessage = document.querySelector('#winning-message');
const restartButton = document.querySelector('#restart');
const playerStatus = document.querySelector("#player");
const roundText = document.querySelector('#round');
const leadPlayerText = document.querySelector('#lead-player');

let playerO_turn = false;
let clickCounter = 0;
let winner = false;
let gameOver = false;
let round = 0;
let winnerX =0;
let winnerO =0;

const strike = document.querySelector('.strike');
const gameOverSound = new Audio("audio/game-over.wav")
const clickSound = new Audio("audio/click.wav");
const winnerSound = new Audio("audio/winner.wav")


// function to check if it's the end of the game
const gameEnd = function(){
    if(clickCounter === 9 || winner === true){
        gameOver = true;
        round += 1;
        roundText.innerHTML = `Round: ${round}`;
        setInterval(restartGame,1500)
    }
}

// function to check who is the lead
const leadPlayer = function() {
    if(winnerX !== winnerO){
        if(winnerX > winnerO){
            // leadPlayerText.style.opacity ="1";
            leadPlayerText.innerText = `${playerX} is taking the lead`;
        }else{
            // leadPlayerText.style.opacity ="1";
            leadPlayerText.innerText = `${playerO} is taking the lead`;
        }
    }
}

// function to restart the game
const restartGame = function(){
    Array.from(cells).forEach(item => item.dataset.taken = "false");
    Array.from(cells).forEach(item => item.innerText = "");
    strike.className = "strike";
    playerO_turn = false;
    playerStatus.innerText = "Current Player is X";
    winningMessage.style.opacity = "0";
    player = [-100,-101,-102,-103,-104,-105,-106,-107,-108];
    clickCounter = 0;
    gameOver = false;
    winner=false;
    // leadPlayerText.style.opacity ='0';
    round =0;

}

// parent function to check the winner
const checkForWinner = function(){
    for(let eachCombo of winningCombo){
        let [a,b,c] = eachCombo.combo;
        let strikethrough = eachCombo.strikeClass;
        let spot1 = player[a];
        let spot2 = player[b];
        let spot3 = player[c];

        if (spot1 && (spot1 === spot2 && spot1 === spot3)){
            if (spot1 === 1){
                winningMessage.innerText = "Player X Wins!";
                winningMessage.style.opacity = "1";
                winner = true;
                winnerSound.loop = false;
                strike.classList.add(strikethrough);
                winnerX += 1;
                winnerSound.play();
            }else{
                winningMessage.innerText = "Player O Wins!";
                winningMessage.style.opacity = "1";
                strike.classList.add(strikethrough);
                console.log("Player O wins!")
                winner = true;
                winnerO += 1;
                winnerSound.play();
            }
        } else{
            if (clickCounter === 9 && !!winner){
                playerStatus.innerText = "Game Over!"
                winningMessage.innerText = "A Draw";
                winningMessage.style.opacity = "1";

                gameOverSound.play()
            }
        }
    }
}



// function to display the next player
const hoverText = function(){
    // remove all hover text
    cells.forEach((element) => {
        element.classList.remove("x-hover");
        element.classList.remove("o-hover");
    })

    const hoverClass = `${playerO_turn? "o-hover" : "x-hover"}`;
    cells.forEach((element) => {
        if(element.innerText ===""){
            element.classList.add(hoverClass);
        }
    })


}


// function used for the main event listener
function main(event){
    const clickedCell = event.target;
    // check if the cell is clicked
    if (clickedCell.dataset.taken !== "false"){
        return;
    }

    if (!playerO_turn) {
        clickedCell.innerText = playerX;
        clickedCell.dataset.taken = "true";
        clickCounter += 1;
        playerO_turn = true;
        let clickedCellValue = parseInt(clickedCell.dataset.cell);
        player[clickedCellValue] = 1;
        // currentPlayer(playerO_turn)

        if (clickCounter >=3){
            checkForWinner()
        };
    } else {
        clickedCell.innerText = playerO;
        clickedCell.dataset.taken = "true";
        clickCounter += 1;
        playerO_turn = false;
        let clickedCellValue = parseInt(clickedCell.dataset.cell);
        player[clickedCellValue] = 2;
        // currentPlayer(playerO_turn)

        if (clickCounter >=3){
            checkForWinner()
        };
    }

    clickSound.play();
    gameEnd();

}


// event listeners
board.addEventListener("mouseover", hoverText)
board.addEventListener("click",main)
restartButton.addEventListener("click",restartGame)