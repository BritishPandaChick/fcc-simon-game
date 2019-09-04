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
  on = false; //keeps player from pushing buttons

  if(flash == turn){
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn){
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

// Green button
one = () => {
  if(noise){
    let audio = document.getElementById("soundClip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

// Red button
two = () => {
  if(noise){
    let audio = document.getElementById("soundClip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

// Yellow button
three = () => {
  if(noise){
    let audio = document.getElementById("soundClip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

// Blue button
four = () => {
  if(noise){
    let audio = document.getElementById("soundClip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

//Clears colors
clearColor = () => {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

//flash colors
flashColor = () => {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

//addEventListeners for color buttons
topLeft.addEventListener("click", (event)  => {
  if(on){
    playerOrder.push(1);
    check();
    one();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener("click", (event)  => {
  if(on){
    playerOrder.push(2);
    check();
    two();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener("click", (event)  => {
  if(on){
    playerOrder.push(3);
    check();
    three();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener("click", (event)  => {
  if(on){
    playerOrder.push(4);
    check();
    four();
    if(!win){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

//Check function
check = () => {
  if(playerOrder[playerOrder.length-1] !== order[playerOrder.length-1])
  good = false;

  if(playerOrder.length == 20 && good){
    winGame();
  }

  if(good == false){
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if(strict){
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

  if(turn == playerOrder.length && good && !win){
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

//Win game
winGame = () => {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
