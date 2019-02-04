/*----- constants -----*/ 

// define how many rows and columns the gameboard contains - 200 cells total.
const ROW = 20;
const COL = 10;

//SQ is for square which will represent our individual cells on the board.
const SQ = 30;

// define an empty sqare in the board
const VACANT = '#FFFFFF';

/*----- app's state (variables) -----*/ 

let board;

/*----- cached element references -----*/ 
const canvas = document.querySelector('canvas');
// this is a method on the canvas obj that allows us to draw on the canvas
const context = canvas.getContext('2d');

/*----- event listeners -----*/ 

/*----- functions -----*/

// 1. The start button will initialize the game.
// - Fade in audio of instrumental Travis Scott music.
init();

function init() {
  board = [];
  createBoard();
}

// 2. Create the game board
function createBoard () {
//creates 20 rows on the board
  for(let r = 0; r < ROW; r++) {
    // set to empty array because it will contain a column value as well.
    board[r] = [ ];
    //creates 10 columns on the board
    for(let c = 0; c < COL; c++) {
      //set it to vacant to let us know the cell is vacant.
      board[r][c] = VACANT;
    }
  }
}

// - The game board will contain random opaque background images of Travis Scott.

//  Draw a tetromino that will descend from the top row down to the bottom of the game board. 


// - We need to design all 7 tetromino pieces.
// - The tetromino will drop one row every 1 second.
// - Each piece can move left, right, or down on the board.
// - Each piece cannot move beyond the left and right wall of the game board.
// - We need to lock the pieces in place once they reach the bottom of the board or touch the top of anoother piece. 
// - Once the game piece is locked, that should update the gameboard and spawn a new random tetromino at the top. 


// 3. When all ten cells in a single row or mulitple rows is occupied, update the gameboard to clear those rows that are filled.
// - If there are cells occupied on any rows above a cleared row, those rows should shift down and fill in the cleared rows.
// - If a row is cleared, add a sound bite of Travis Scott's adlibs will play once.
// - When you clear a row or multiple rows the score will be updated based on the following table.