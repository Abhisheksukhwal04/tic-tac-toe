const gameInfo = document.querySelector(".gameInfo");
const newGame = document.querySelector(".newGame");
const boxes = document.querySelectorAll(".box");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// this function is initialize the game 
function initialGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win")

    });

    newGame.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}
initialGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].style.pointerEvents = "none";
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //check the turn
        swapTurn();
        // if the player wins then game is over
        checkGameIsOver();
    }
}
         
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    } else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameIsOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty or exactly same in value 
        if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                
                //check if winner is X or O
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                } else {
                    answer = "O";
                }
                //when we get winner disable the pinterEvents 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                //winner gets the background color
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //when you got the winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGame.classList.add("active");
        return;
    }

    //when there is no winner means match tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    //gamegrid is full then its tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGame.classList.add("active");
        return;
    }

}

newGame.addEventListener("click", initialGame);