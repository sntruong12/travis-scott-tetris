/*----- constants -----*/ 

// define how many rows and columns the gameboard contains - 200 cells total.
const ROW = 20;
const COL = 10;

// SQ is for square which will represent the size of our individual cells on the board. 30x30 px cell
const SQ = 30;

// define an empty sqare in the board
const EMPTY = '#FFFFFF';

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
    // x and y is for the start position of the piece aka the top of the board in the center
    this.x = 3;
    this.y = 0;
  }
// in tetrominoes.js we visualize the tetris pieces as an array of an array. 1 indicates a square and 0 indicates an empty square. 1 and 0 have boolean values for true and false respectively so we can draw squares based checking the value of each element of every array. every piece has 4 different versions based on rotation. This draw method will draw the piece.
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
    this.clearPiece();
    this.y++;
    this.drawPiece();
  }
  moveRight() {
    this.clearPiece();
    this.x++;
    this.drawPiece();
  }
  moveLeft() {
    this.clearPiece();
    this.x--;
    this.drawPiece();
  }
}

// let son = new Tetromino(PIECES[0][0], PIECES[0][1]);


// - The tetromino will drop one row every 1 second.
/*----- app's state (variables) -----*/ 

let board, currentPiece;

/*----- cached element references -----*/ 
const canvas = document.querySelector('canvas');
// this is a method on the canvas obj that allows us to draw on the canvas
const context = canvas.getContext('2d');

/*----- event listeners -----*/ 

// - Each piece can move left, right, or down on the board.

// - Each piece can rotate between its four versions.

/*----- functions -----*/

// start button will initialize the game.
// - Fade in audio of instrumental Travis Scott music.
init();

function init() {
  board = [];
  createBoard();
  drawBoard();
  // get currentPiece randomly
}

//  create the game board
function createBoard() {
// create 20 rows on the board
  for(let r = 0; r < ROW; r++) {
    // set to empty array because it will contain a column value as well.
    board[r] = [ ];
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
      drawSq(cIdx, rIdx, board[rIdx][cIdx]);
    })
  });
}

// - The game board will contain random opaque background images of Travis Scott.

//  Draw a tetromino that will descend from the top row down to the bottom of the game board. 
function drawSq(x, y, color) {
  // define the color of the drawing
  context.fillStyle = color;
  // define the location (x, y) and the size of the drawing
  // multiple by SQ because that's the size of one cell so we want to make sure 1 unit for x or y will increment/decrement based on our SQ unit.
  context.fillRect(x*SQ, y*SQ, SQ, SQ);
  // define the color of the outline
  context.strokeStyle = 'black';
  context.strokeRect(x*SQ, y*SQ, SQ, SQ);
}







// - Each piece cannot move beyond the left and right wall of the game board.
// - We need to lock the pieces in place once they reach the bottom of the board or touch the top of anoother piece. 
// - Once the game piece is locked, that should update the gameboard and spawn a new random tetromino at the top. 


// 3. When all ten cells in a single row or mulitple rows is occupied, update the gameboard to clear those rows that are filled.
// - If there are cells occupied on any rows above a cleared row, those rows should shift down and fill in the cleared rows.
// - If a row is cleared, add a sound bite of Travis Scott's adlibs will play once.
// - When you clear a row or multiple rows the score will be updated based on the following table.