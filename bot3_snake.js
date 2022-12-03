
//board
var blockSize = 25;
var rows = 24;
var cols = 25;
var board;
var context;

//snake head
var snakeX = blockSize * 12;
var snakeY = blockSize * 12;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//position of food
var foodX;
var foodY;

var gameOver = false;

let time = 0;
let score = 0;


window.onload = () => {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //for drawing on the board

    placeFood();

    
    // update();
    setInterval(update, 120); //120 milliseconds
 }

 function update() {
    if (gameOver) {
        return;
    }

    console.log('snakeX: ' + snakeX);
    console.log('foodX: ' + foodX);
    //if snake is to the left of food, move to the right
    if (snakeX < foodX) {
        velocityX = 1;
        velocityY = 0;
    }
    // if snake is to the right of food, move to the left
    if (snakeX > foodX) {
        velocityX = -1;
        velocityY = 0;
    }
    // if snake is above food, move down
    if (snakeY < foodY) {
        velocityX = 0;
        velocityY = 1;
    }
    // if snake is below food, move up
    if (snakeY > foodY) {
        velocityX = 0;
        velocityY = -1;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="purple";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="pink";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize - 1 || snakeY < 0 || snakeY > rows*blockSize - 1) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

    if (snakeX == foodX && snakeY == foodY) {
        score += 1;
        console.log(`Score: ` + `${score}`);
        document.getElementById("score").innerHTML = `Score: ` + `${score}`;
    } else {
        document.getElementById("score").innerHTML = `Score: ` + `${score}`;
    }
 }


 
function changeDirection(e) {   //key event
    if (e.code == "ArrowUp" && velocityY != 1) {  // on Y axis
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) { // on Y axis
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) { // on X axis
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) { // on X axis
        velocityX = 1;
        velocityY = 0;
    }
}


 function placeFood() {
    //0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
 }
