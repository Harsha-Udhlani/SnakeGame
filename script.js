let inputdir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }

]
let food = { x: 6, y: 7 };
//Game Functions

function isCollide(snake) {
    //if bump into itself
    for (let idx = 1; idx < snakeArr.length; idx++) {
        if (snake[idx].x === snake[0].x && snake[idx].y === snake[0].y) {
            return true;
        }
    }
    // bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    //Part 1 :updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!!");
        snakeArr = [{ x: 13, y: 15 }];
        //musicSound.play();
        score = 0;
    }
    //if eaten the food increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            highScoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };


    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    //Part 2:display the snake and food
    // display the snake
    //let board = document.getElementById('board');
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

//main logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    highScoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp": {
            inputdir.x = 0;
            inputdir.y = -1
            break;
        }
        case "ArrowDown": {
            inputdir.x = 0
            inputdir.y = 1
            break;
        }
        case "ArrowLeft": {
            inputdir.x = -1
            inputdir.y = 0
            break;
        }
        case "ArrowRight": {
            inputdir.x = 1
            inputdir.y = 0
            break;
        }
        default: break;
    }

});





