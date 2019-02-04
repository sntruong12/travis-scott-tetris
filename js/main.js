/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

/*----- cached element references -----*/ 


/*----- event listeners -----*/ 

/*----- functions -----*/

// 1. The start button will initialize the game.
// - Fade in audio of instrumental Travis Scott music.
// 2. On the 10 cells wide by 20 cells high game board, one tetromino will descend from the top row down to the bottom of the game board.
// - The game board will contain random opaque background images of Travis Scott.
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