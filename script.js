const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


//pulling images from the different html image tags to be drawn into canvas
const paddleOne = document.getElementById('paddleOneSource')
const paddleTwo = document.getElementById('paddleTwoSource')
const ball = document.getElementById('ball')


//game objects
const playerOne = {
    x: 5,
    y: 250,
    w: 30,
    h: 300,
    speed: 8,
    dy: 0
}

const playerTwo = {
  x: 865,
  y: 250,
  w: 30,
  h:300,
  speed: 8,
  dy: 0
}

const theBall = {
  x: 415,
  y: 400,
  w: 35,
  h: 35,
  speed: 20,
  dy: 0,
  dx: 0
}

//functions to draw the paddles and ball and clear the canvas.

function drawPlayerOne () {
    ctx.drawImage(paddleOne, playerOne.x, playerOne.y, playerOne.w, playerOne.h);
}

function drawPlayerTwo () {
  ctx.drawImage(paddleTwo, playerTwo.x, playerTwo.y, playerTwo.w, playerTwo.h);
}

function drawBall () {
  ctx.drawImage(ball, theBall.x, theBall.y, theBall.w, theBall.h);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

// change of position functions

  function newPos() {
    playerOne.y += playerOne.dy;
  
    detectWalls();
  }

  function newPosPlayer2() {
    playerTwo.y += playerTwo.dy;

    detectWallsPlayerTwo();
  }

  function newBallPos() {
    theBall.y += theBall.dy
  }

//collision dection for paddles and ball  
  function detectWalls() {
    // Top wall
    if (playerOne.y < 0) {
      playerOne.y = 0;
    }
  
    // Bottom Wall
    if (playerOne.y + playerOne.h > canvas.height) {
      playerOne.y = canvas.height - playerOne.h;
    }
  }

  function detectWallsPlayerTwo() {
    // Top wall
    if (playerTwo.y < 0) {
      playerTwo.y = 0;
    }
  
    // Bottom Wall
    if (playerTwo.y + playerTwo.h > canvas.height) {
      playerTwo.y = canvas.height - playerTwo.h;
    }
  }

  //updates the drawn images upon the canvas and initializes and renders //them

  function update() {
  clear();
  drawPlayerOne();
  drawPlayerTwo();
  drawBall();
  newPos();
  newPosPlayer2();
  newBallPos();

  requestAnimationFrame(update);
}

// controlling movement functions

function moveUp() {
    playerOne.dy = -playerOne.speed;
  }
  
  function moveDown() {
    playerOne.dy = playerOne.speed;
  }

  function moveUpPlayer2() {
    playerTwo.dy = -playerTwo.speed;
  }
  
  function moveDownPlayer2() {
    playerTwo.dy = playerTwo.speed;
    console.log(moveUpPlayer2);
  }

  function ballMoveUp() {
    theBall.dy = theBall.speed;
  }


  //game start function will start initial ball movement.
  function gameStart(e) {
    if (e.key === ' ' || e.key === 'Space') {
      ballMoveUp();
    }
  }

function keyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();
    }
}

function keyUp(e) {
    if (
      e.key == 'Up' ||
      e.key == 'ArrowUp' ||
      e.key == 'Down' ||
      e.key == 'ArrowDown'
    ) {
      playerOne.dy = 0;
    }
  }

  function keyDownPlayer2(e) {
    if (e.key === 'w') {
        moveUpPlayer2();
    } else if (e.key === 's') {
        moveDownPlayer2();
    }
}

function keyUpPlayer2(e) {
    if (
      e.key == 'KeyW' ||
      e.key == 'w' ||
      e.key == 'KeyS' ||
      e.key == 's'
    ) {
      playerTwo.dy = 0;
    }
  }

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDownPlayer2);
document.addEventListener('keyup', keyUpPlayer2);
document.addEventListener('keydown', gameStart);