/*----------------------------------------*/ 
/*----- constants -----*/ 
/*----------------------------------------*/ 


// define how many rows and columns the gameboard contains - 200 cells total.
const ROW = 20;
const COL = 10;

// SQ is for square which will represent the size of our individual cells on the board. 30x30 px cell
const SQ = 30;

// define an empty sqare in the board
const EMPTY = 'rgba(255, 255, 255, .25)';

// collection of pieces with assigned colors. used in render function to generate the next piece.
const PIECES = [
  [I, '#D1B37E'],
  [J, '#E83627'],
  [L, '#86A4BF'],
  [O, '#3D88A7'],
  [S, '#CF8131'],
  [T, '#401A08'],
  [Z, '#2B5B9E']
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
    if(this.isCollidingBottom(this.activePiece) === false) {
      this.clearPiece();
      this.y++;
      this.drawPiece();
    }
  }
  moveRight() {
    if (this.isCollidingRight(this.activePiece) === false) {
      this.clearPiece();
      this.x++;
      this.drawPiece();
    }
  }
  moveLeft() {
    if (this.isCollidingLeft(this.activePiece) === false) {
      this.clearPiece();
      this.x--;
      this.drawPiece();
    }
  }
  // Each piece can has four versions, in order to cycle between all of them we can add 1 to the current value of pieceNum and use the modulus operator to get the next number. Once pieceNum is at value 3, adding 1 to it will cycle us back to the 0.
  rotatePiece() {
    this.clearPiece();
    this.pieceNum = (this.pieceNum + 1) % this.piece.length;
    this.activePiece = this.piece[this.pieceNum];
    this.drawPiece();
  }
  // Each piece cannot move beyond the left, right, and bottom wall of the game board.
  // Check to see if current X + the column + 1 > COL.
  // Anything greater than COL (10) is outside of the right wall of the canvas.
  isCollidingRight(activePc) {
    let nextX;
    for(let r = 0; r < activePc.length; r++) {
      for(let c = 0; c < activePc[r].length; c++) {
        if(activePc[r][c]) {
          nextX = this.x + c + 1;
          if (nextX >= COL) {
            console.log('there\'s the right wall');
            return true;
          }
        }
      }
    }
    return false;
  }
  // Check to see if current X + the column - 1 > 0.
  // Anything less than 0 is outside the left wall of the canvas.
  isCollidingLeft(activePc) {
    let nextX;
    for(let r = 0; r < activePc.length; r++) {
      for(let c = 0; c < activePc[r].length; c++) {
        if(activePc[r][c]) {
          nextX = this.x + c - 1;
          if (nextX < 0) {
            console.log('bumping the left wall');
            return true;
          }
        }
      }
    }
    return false;
  }
  // Check to see if current X + the column + 1 > ROW.
  // Anything greater than 20 is outside the bottom part of the canvas.
  isCollidingBottom(activePc) {
    let nextY;
    for(let r = 0; r < activePc.length; r++) {
      for(let c = 0; c < activePc[r].length; c++) {
        if(activePc[r][c]) {
          nextY = this.y + r + 1;
          if(nextY >= ROW) {
            console.log('bottom of the board');
            return true;
          }
        }
      }
    }
    return false;
  }
  
}

/*----------------------------------------*/ 
/*----- app's state (variables) -----*/ 
/*----------------------------------------*/ 

let board, currentPiece, startTime;

/*----- cached element references -----*/ 
const canvas = document.querySelector('canvas');
// this is a method on the canvas obj that allows us to draw on the canvas
const context = canvas.getContext('2d');

/*----------------------------------------*/ 
/*----- event listeners -----*/ 
/*----------------------------------------*/ 

document.addEventListener('keydown', movePiece);

/*----------------------------------------*/ 
/*----- functions -----*/
/*----------------------------------------*/ 


// start button will initialize the game.
// - Fade in audio of instrumental Travis Scott music.
init();

function init() {
  board = [];
  createBoard();
  drawBoard();
  render();
  // startTime = Date.now();
  // timer();
  
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

//  Draw a tetromino that will descend from the top row down to the bottom of the game board. 
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
  let randomPiece = Math.floor(Math.random() * PIECES.length);
  console.log(randomPiece);
  currentPiece = new Tetromino(PIECES[randomPiece][0], PIECES[randomPiece][1]);

  currentPiece.drawPiece();
  //drop the piece down everyone one second
  setInterval(timedDrop, 1000);
  
}

// - The tetromino will drop one row every 1 second.
// function timer() {
//   let now = Date.now();
//   let difference = now - startTime;
//   console.log(difference);
//   if(difference > 1000) {
//     currentPiece.moveDown();
//     startTime = Date.now();
//   }
//   requestAnimationFrame(timer);
// }

function timedDrop() {
  currentPiece.moveDown();
}

// User can move the currentPiece left, right, or down and also rotate the piece. Callback function to match the arrow keys and the z key to specific options.

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

// - We need to lock the pieces in place once they reach the bottom of the board or touch the top of anoother piece. 
// - Once the game piece is locked, that should update the gameboard and spawn a new random tetromino at the top. 


// 3. When all ten cells in a single row or mulitple rows is occupied, update the gameboard to clear those rows that are filled.
// - If there are cells occupied on any rows above a cleared row, those rows should shift down and fill in the cleared rows.
// - If a row is cleared, add a sound bite of Travis Scott's adlibs will play once.
// - When you clear a row or multiple rows the score will be updated based on the following table.