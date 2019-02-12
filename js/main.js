/*----------------------------------------*/ 
/*----- constants -----*/ 
/*----------------------------------------*/ 
// object containg path and text for each adlib
const ADLIBS = {
  path: [
    'audio/fun.wav',
    'audio/its-lit.wav',
    'audio/la-flame.wav',
    'audio/nah-straight-up.wav',
    'audio/no-eng.wav',
    'audio/oh-no-no.wav',
    'audio/omg.wav',
    'audio/rrr.wav',
    'audio/rrr2.wav',
    'audio/s-up.wav',
    'audio/s-up2.wav',
    'audio/s-up3.wav',
    'audio/woo.wav',
    'audio/ya-ya.wav',
    'audio/one-more-time.wav'
  ],
  text: [
    'this is fun!',
    'it\'s lit!',
    'la flame!',
    'naaahhh! straight up!',
    'don\'t know no english!',
    'oh no no!',
    'omg!',
    'rrrrrrrrrrrrrrrr!',
    'rrrrrrrrrrrrrrrr!',
    'straight up!',
    'straight up!',
    'straight up!',
    'woooooooooooo!',
    'ya! ya!',
    'one mo time!',
  ],
};

// define how many rows and columns the gameboard contains - 200 cells total.
const ROW = 20;
const COL = 10;

// SQ is for square which will represent the size of our individual cells on the board. 30x30 px cell
const SQ = 30;

// define an empty sqare in the board
const EMPTY = 'black';

// collection of pieces with assigned colors. used in render function to generate the next piece.
const PIECES = [
  [I, '#3AABF1'],
  [J, '#03FC0C'],
  [L, '#FEEC09'],
  [O, '#FF01FF'],
  [S, '#CF8131'],
  [T, '#6A54B4'],
  [Z, '#C21F19']
];

// class for tetromino pieces.
class Tetromino {
  constructor(piece, color) {
    this.piece = piece;
    this.color = color;

    // pieceNum is used to reference the tetrominoes starting position.
    this.pieceNum = 0;
    this.activePiece = this.piece[this.pieceNum];
    // x and y is for the current position of the piece. These values are updated when moving down,left, or right. Adding 1 to X translates to 30px to the right.
    this.x = 3;
    this.y = 0;
  }
  // in tetrominoes.js, we visualize the tetris pieces as an array of arrays. 1 indicates one square that makes up the piece and 0 indicates an empty square. 1 and 0 have boolean values for true and false respectively so we can draw squares based checking the boolean value of each element of every array. every piece has different versions based on rotation. This draw method will draw the piece based on the activePiece property.
  drawPiece() {
    this.activePiece.forEach((row, rIdx) => {
      row.forEach((col, cIdx) => {
        if(this.activePiece[rIdx][cIdx]) {
          drawSq(this.x + cIdx, this.y + rIdx, this.color);
        }
      })
    })
  }
  clearPiece() {
    this.activePiece.forEach((row, rIdx) => {
      row.forEach((col, cIdx) => {
        if(this.activePiece[rIdx][cIdx]) {
          drawSq(this.x + cIdx, this.y + rIdx, EMPTY);
        }
      })
    })
  }
  // moving the pieces will require 3 things, clear the previous piece,increment the y value to move it down one cell, then draw the piece. Before we can do move the piece, the method isColliding is called to check if the next move is value or occupied by existing pieces.
  moveDown() {
    if(this.isColliding(0, 1, this.activePiece) === false) {
      this.clearPiece();
      this.y++;
      this.drawPiece();
    } else {
      this.lockPiece();
      render();
    }
  }
  moveRight() {
    if (this.isColliding(1, 0, this.activePiece) === false) {
      this.clearPiece();
      this.x++;
      this.drawPiece();
    }
  }
  moveLeft() {
    if (this.isColliding(-1, 0, this.activePiece) === false) {
      this.clearPiece();
      this.x--;
      this.drawPiece();
    }
  }
  // each piece can has four versions, in order to cycle between all of them we can add 1 to the current value of pieceNum and use the modulus operator to get the next number. Once pieceNum is at value 3, adding 1 to it will cycle us back to the 0.
  rotatePiece() {
    this.clearPiece();
    this.pieceNum = (this.pieceNum + 1) % this.piece.length;
    this.activePiece = this.piece[this.pieceNum];
    this.drawPiece();
  }
  // each piece cannot move beyond the left, right, and bottom wall of the game board.
  // check to see if current X + the column + 1 > COL.
  // anything greater than COL (10) is outside of the right wall of the canvas.
  // check to see if current X + the column - 1 > 0.
  // anything less than 0 is outside the left wall of the canvas.
  // check to see if current X + the column + 1 > ROW.
  // anything greater than 20 is outside the bottom part of the canvas.
  isColliding(x, y, activePc) {
    let nextX, nextY;
    for(let r = 0; r < activePc.length; r++) {
      for(let c = 0; c < activePc[r].length; c++) {
        // this skips over all the empty values of the activePiece.
        if(activePc[r][c] == false) {
          continue;
        }
        // get the value for the next X or Y value
        nextX = this.x + c + x;
        nextY = this.y + r + y;
        // check to see if nextX or nextY is outside of the board
        if(nextX >= COL || nextX < 0 || nextY >= ROW) {
          console.log('bumping into a wall');
          return true;
        }
        // checks for locked piece on board. If the board has a cell that is empty then return true so the piece can continue to move left right or down.
        if(board[nextY][nextX] !== EMPTY) {
          console.log('colliding into a locked piece')
          return true
        }
      }
    }
    return false;
  }
  // method for updating board with locked pieces and for clearing full rows. Contains two for loops running when method is called.
  // this method also updates the score and triggers the audio to play.
  lockPiece() {
    // assign colors to board which will lock the piece in place.
    for(let r = 0; r < this.activePiece.length; r++) {
      for(let c = 0; c < this.activePiece[r].length; c++) {
        //skip over the the empty values of the activePiece.
        if(this.activePiece[r][c] == false) {
          continue;
        }
        //game over check
        if(this.y + r < 0) {
          // use gameOver var to cut the animation frame in timedDrop
          gameOver = true;
          console.log('game over');
          break;
        }
          // assigns the piece color to the board so that it differs from holding the EMPTY value.
        board[this.y + r][this.x + c] = this.color;
      }
        
    }

    // check and clear full rows
    for(let r = 0; r < ROW; r++) {
      let isRowFull = true;
      for(let c = 0; c < COL; c++) {
        // will update isRowFull to false if any square in the row contains the EMPTY value which will prevent the following if statement from running.
        isRowFull = isRowFull && board[r][c] !== EMPTY;
      }
      // run this code if the row is full
      if(isRowFull) {
        // moves the rows down to one
        for(let y = r; y > 1; y--) {
          for (let c = 0; c < COL; c++) {
            board[y][c] = board[y-1][c];
            console.log('moving all the rows down')
          }
        }
        
        // assign the top row to be blank when a row/rows are cleared
        for(let c = 0; c < COL; c ++) {
          board[0][c] = EMPTY;
          console.log('top row of board is cleared');
        }

        // increase score
        score += 100;
        console.log('score was increased');

        // play currentAdlibAudio
        currentAdlibAudio.play();

        // display currentAdlibText
        displayThoughtsEl.innerHTML = `<p>${currentAdLibText}</p>`;

      }
    }

    // update board
    drawBoard();
    // update score span with score
    scoreEl.innerHTML = `${score}`;
  }  
}

/*----------------------------------------*/ 
/*----- app's state (variables) -----*/ 
/*----------------------------------------*/ 

let board, currentPiece, currentAdlibAudio, currentAdLibText, startSound, startTime, gameOver, score;

/*----- cached element references -----*/ 
const canvas = document.querySelector('canvas');
// this is a method on the canvas obj that allows us to draw on the canvas
const context = canvas.getContext('2d');
const scoreEl = document.querySelector('#score-span');
const displayThoughtsEl = document.querySelector('#display-thoughts');

/*----------------------------------------*/ 
/*----- event listeners -----*/ 
/*----------------------------------------*/ 

// start button will initialize the game.
// fade in audio of instrumental Travis Scott music.
document.querySelector('.start-btn').addEventListener('click', init);
document.addEventListener('keydown', movePiece);

/*----------------------------------------*/ 
/*----- functions -----*/
/*----------------------------------------*/ 

// start the game - waiting for click
function init() {
  board = [];
  startTime = Date.now();
  gameOver = false;
  score = 0;
  startAdlib();
  createBoard();
  drawBoard();
  render();
}

function startAdlib() {
  startSound = new Audio(ADLIBS.path[1]);
  startSound.play();
}

//  create the game board
function createBoard() {
// create 20 rows on the board
  for(let r = 0; r < ROW; r++) {
    // set to empty array because it will contain a column value as well.
    board[r] = [];
    // create 10 columns on the board per row.
    for(let c = 0; c < COL; c++) {
      // set it to empty to let us know the cell is such.
      board[r][c] = EMPTY;
    }
  }
}

// draw the cells on the board
function drawBoard() {
  board.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      drawSq(cIdx, rIdx, board[rIdx][cIdx]);
    })
  });
}

// - The game board will contain random opaque background images of Travis Scott.

//  draw a tetromino that will descend from the top row down to the bottom of the game board. 
function drawSq(x, y, color) {
  // define the color of the drawing
  context.fillStyle = color;
  // define the location (x, y) and the size of the drawing
  // multiply by SQ because that's the size of one cell so we want to make sure 1 unit for x or y will increment/decrement based on our SQ unit.
  context.fillRect(x*SQ, y*SQ, SQ, SQ);
  // define the color of the outline
  context.strokeStyle = 'white';
  context.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

function render() {
  randomPiece();
  currentPiece.drawPiece();
  // generate random adlib
  randomAdlib();
  //drop the piece down everyone one second
  timedDrop();
  
}

// create new random piece
function randomPiece() {
  let random = Math.floor(Math.random() * PIECES.length);
  currentPiece = new Tetromino(PIECES[random][0], PIECES[random][1]);
}

// creates a new random audio to play when a row is cleared.
// gets the corresponding text for the adlib.
function randomAdlib() {
  let random = Math.floor(Math.random() * ADLIBS.path.length);
  currentAdlibAudio = new Audio(`${ADLIBS.path[random]}`);
  currentAdLibText = ADLIBS.text[random];
  console.log(currentAdLibText);
}

// drop the piece every second
function timedDrop() {
  let currentTime = Date.now();
  let differenceTime = currentTime - startTime;
  // console.log(differenceTime);
  if (differenceTime > 1000) {
    currentPiece.moveDown();
    startTime = Date.now();
  }
  //game runs until gameOver is true;
  if(gameOver === false) {
    requestAnimationFrame(timedDrop);
  }  
}

// user can move the currentPiece left, right, or down and also rotate the piece. Callback function to match the arrow keys and the z key to specific options.

function movePiece(event) {
  switch (event.key) {
    case 'ArrowRight':
    currentPiece.moveRight();
    break;
    case 'ArrowLeft':
    currentPiece.moveLeft();
    break;
    case 'ArrowDown':
    currentPiece.moveDown();
    break;
    case 'z':
    currentPiece.rotatePiece();
    break;
  }
}
