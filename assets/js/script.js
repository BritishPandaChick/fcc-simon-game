//https://www.youtube.com/watch?v=n_ec3eowFLQ
//Stop at 34:57

//Global variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn-window");
const topLeft = document.querySelector("#topLeftCircle");
const topRight = document.querySelector("#topRightCircle");
const bottomLeft = document.querySelector("#bottomLeftCircle");
const bottomRight = document.querySelector("#bottomRightCircle");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//Strict button
strictButton.addEventListener("change", (event) => {
  if(strictButton.checked === true){
    strict = true;
  } else {
    strict = false;
  }
});

//On button
onButton.addEventListener("click", (event) => {
  if(onButton.checked === true){
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

//Start button
startButton.addEventListener("click", (event) => {
  if(on || win){ //can also use on === true || win === true
    play();
  }
});

//Play Game
play = () => {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  //fill up the order array
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  //start first turn
  intervalId = setInterval(gameTurn, 800);
}

//Sets game turn
gameTurn = () => {
  on = false;
}
