let inputDir={x:0, y:0};
const foodAudio=new Audio("music/food.mp3");
const gameover=new Audio("music/gameover.mp3");
const move=new Audio("music/move.mp3");
const music=new Audio("music/music.mp3");
let snakeArr = [{ x: 13, y: 15 }];
let food={x:10,y:10}
const board=document.querySelector(".board")
let speed=3;
let lastPaintTime=0;
let score=0;
let start=false;
let foodCounter=0;

// Game Funtions

// FPS Defined
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    if(start){

    gameEngine();
    }
}

// Collision detector
function isColide(snakeArr) {
    if (snakeArr[0].x == 0 || snakeArr[0].x == 21 || snakeArr[0].y == 0 || snakeArr[0].y == 21){
        return true;
    }
    for (let index = 1; index < snakeArr.length; index++) {
        if (snakeArr[0].x == snakeArr[index].x && snakeArr[0].y == snakeArr[index].y) {
            return true;
        }
    }
    return false;
}

// game emngine
function gameEngine(){

    board.innerHTML = "";

    
    if(isColide(snakeArr)){
        gameover.play();
        gameEnd();
    }

    // SpeedUp on the basis of food counter
    if(foodCounter==5){
        speed+=1.5;
        foodCounter=0;
    }

    // if you have eaten the food
    if(snakeArr[0].x==food.x&&snakeArr[0].y==food.y){
        score++;
        document.querySelector("#scorebox").innerText="Score: "+score;
        foodCounter++;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y})
        a=1;
        b=20;
        foodAudio.play();
        food = { x: Math.floor(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random())}

    }

    //Moving the snake
    
    for(i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputDir.x
    snakeArr[0].y+=inputDir.y

   // Adding the snake to board
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("tail");
        }
        board.appendChild(snakeElement);

    })

    // Food Display
    foodElement = document.createElement("div");
    foodElement.classList.add("food");
    board.appendChild(foodElement);
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;



}

// Game End Funtion
function gameEnd(){
    gameoverEle = document.createElement("div");
    gameoverEle.setAttribute("id","gameOver");
    document.querySelector(".container").appendChild(gameoverEle);
    gameoverEle.innerHTML="<h1>Game Over</h1><h3>Score:"+score+"<button onclick='restart()'>Play Again</button>";
    
    // Reinitializing everything
    snakeArr = [{ x: 13, y: 15 }];
    food = { x: 10, y: 10 };
    inputDir = { x: 0, y: 0 };
    score = 0;
    document.querySelector("#scorebox").innerText = "Score: " + score;
    foodCounter++;
    foodCounter = 0;
    speed = 2;
    music.pause();
    start=false;
}

// Restart fauntion
function restart() {
    var div = document.getElementById('gameOver');
    if (div) {
        div.parentNode.removeChild(div);
        start=true;
    }
    
}

// Pause funtion
function pause() {
    gamepauseEle = document.createElement("div");
    gamepauseEle.setAttribute("id", "gamepause");
    document.querySelector(".container").appendChild(gamepauseEle);
    gamepauseEle.innerHTML = "<h1>Game Has Been Paused</h1>"+"<button onclick='resume()'>Resume</button>";
    start=false
}

// resume funtion
function resume() {
        var div = document.getElementById('gamepause');
        if (div) {
            div.parentNode.removeChild(div);
            start = true;
        }
}

// start funtion
function startgame() {
    var div = document.getElementById('startbox');
        div.remove();
        start = true;
    
}

// Main logic
window.requestAnimationFrame(main)
document.addEventListener("keydown", function (event) {
    var key = event.key;
    console.log(key);
    //inputDir = { x: 0, y: 1 };
    music.play();
    move.play();


    switch (key) {
        case 'w':
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            document.querySelector(".head").style.transform = "rotate(90deg)";
            break;
        case 's':
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'a':
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'd':
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case 'p':
            pause();
            break;

        default:
            break;
    }
}
)