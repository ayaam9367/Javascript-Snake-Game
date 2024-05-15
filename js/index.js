console.log("working!");

//Game consts and var
let inputDir = {x : 0, y : 0};  //direction of snake
//direction is manipulated by keyboard buttons

const foodsound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 2;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y : 15}
]

food = {x : 6, y : 7 }

//game loop -> paints the screen repeatedly 
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime )/1000  < (1/speed)){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    //console.log(ctime);

}

function isCollide(sarr){
    return false;
}

//updates the snake array and food; display the snake and food
function gameEngine(){
    //updating
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y : 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x : 13, y : 15}];
        musicSound.play();
        score = 0;

    }


    //if snake eats the food, increment the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y})

        //updating food
        let a = 2;  //game is a bit lenient
        let b = 16;
        food = {x : Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }

    //moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; //destructing to create a new object so that referencing problem does not occur
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //displaying the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
  


}



//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} //start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});
