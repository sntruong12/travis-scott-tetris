/*----------------------------------------*/ 
/*----- constants -----*/ 
/*----------------------------------------*/ 

// define how many rows and columns the gameboard contains - 200 cells total.
const ROW = 20;
const COL = 10;

// SQ is for square which will represent the size of our individual cells on the board. 30x30 px cell
const SQ = 30;

// define an empty sqare in the board
const EMPTY = 'white';

// collection of pieces with assigned colors. used in render function to generate the next piece.
const PIECES = [
  [I, '#163174'],
  [J, '#C69761'],
  [L, '#FEEC09'],
  [O, '#8061AC'],
  [S, '#CF8131'],
  [T, '#401A08'],
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
  // moving the pieces will require 3 things, clear the previous piece,increment the y value to move it down one cell, then draw the piece.
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
  // lock piece into the board
  lockPiece() {
    for(let r = 0; r < this.activePiece.length; r++) {
      for(let c = 0; c < this.activePiece[r].length; c++) {
        //skip over the the empty values of the activePiece.
        if(this.activePiece[r][c] == false) {
          continue;
        }
        //game over check
        if(this.y + r < 0) {
          // use gameOver var to cut the animation frame
          gameOver = true;
          console.log('game over');
          break;
        }
          // assigns the piece color to the board so that it differs from holding the EMPTY value.
        board[this.y + r][this.x + c] = this.color;
      }
        
    }
  }  
}

/*----------------------------------------*/ 
/*----- app's state (variables) -----*/ 
/*----------------------------------------*/ 

let board, currentPiece, startTime, gameOver;

/*----- cached element references -----*/ 
const canvas = document.querySelector('canvas');
// this is a method on the canvas obj that allows us to draw on the canvas
const context = canvas.getContext('2d');

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
  createBoard();
  drawBoard();
  render();
}

//  create the game board
function createBoard() {
// create 20 rows on the board
  for(let r = 0; r < ROW; r++) {
    // set to empty array because it will contain a column value as well.
    board[r] = [];
    // create 10 columns on the board
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
      drawSq(cIdx, rIdx, EMPTY);
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
  context.strokeStyle = 'black';
  context.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

function render() {
  randomPiece();
  currentPiece.drawPiece();
  //drop the piece down everyone one second
  timedDrop();
  
}

// create new random piece
function randomPiece() {
  let random = Math.floor(Math.random() * PIECES.length);
  currentPiece = new Tetromino(PIECES[random][0], PIECES[random][1]);
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




// 3. When all ten cells in a single row or mulitple rows is occupied, update the gameboard to clear those rows that are filled.
// - If there are cells occupied on any rows above a cleared row, those rows should shift down and fill in the cleared rows.
// - If a row is cleared, add a sound bite of Travis Scott's adlibs will play once.
// - When you clear a row or multiple rows the score will be updated based on the following table.