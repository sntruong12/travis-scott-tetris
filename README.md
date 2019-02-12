# Travis Scott Tetris

![travis scott tetris](https://i.imgur.com/jHW371e.png "An image of the tetris game")

**_IT'S LIT!_** 

We all know the famous game of tetris. I present to you Tetris that is Travis Scott theme. Tetris is a simple game where you are given pieces made up of 4 square blocks in various forms, also known as the *tetromino*. These pieces fall from the top of the board and slowly go down the game board. The objective is use this pieces to fill up the one or more rows. When you fill up a row, it will clear that row out which will increase your score. The only way to lose is if you stack your pieces beyond the the last row in the game board. The higher your score the faster the pieces fall. There a small details in this project pay homage to La Flame's art.

## User Stories
**_LA FLAME!_** 

## Wireframe

**_OMG!_**

Here is a [link](https://wireframe.cc/1BtFCc) to the wireframe.

## Technology Stack

**_YEAH!_**

HTML Canvas, JavaScript.

## Pseudocode

**_GIVE ME THE LOOT!_**

1. The start button will initialize the game.
- Fade in audio of instrumental Travis Scott music.

2. Create the game board
- The game board will contain random opaque background images of Travis Scott.

3. Draw a tetromino that will descend from the top row down to the bottom of the game board. 

- We need to design all 7 tetromino pieces.
- 
- The tetromino will drop one row every 1 second.
- Each piece can move left, right, or down on the board.
- Each piece cannot move beyond the left and right wall of the game board.
- We need to lock the pieces in place once they reach the bottom of the board or touch the top of anoother piece. 
- Once the game piece is locked, that should update the gameboard and spawn a new random tetromino at the top. 
4. When all ten cells in a single row or mulitple rows is occupied, update the gameboard to clear those rows that are filled.
- If there are cells occupied on any rows above a cleared row, those rows should shift down and fill in the cleared rows.
- If a row is cleared, add a sound bite of Travis Scott's adlibs will play once.
- When you clear a row or multiple rows the score will be updated based on the following table.

Rows cleared | Points awarded
--- | ---
1 | 100
2 | 300
3 | 600
4 | 800

5. End the game when any tetromino piece is placed outside the top row of the game board.
- Display some image and highlight the score.
- Also display a reply button that will reinitialize the game for them.

## Goals

**_STRAIGHT UP! STRAIGHT UP!_**

1. Create a working tetris game.

## Stretch Goals

**_OH NO!_**

1. Implement levels to make the tetromino pieces descend faster when the score reaches number, all in one game session.

2. Implement a way to change the background of the game board as the player reaches a higher levels.

3. Implement an image of Travis Scott that will randomly show a thought bubble displaying a random famous adlib when the player clears 4 rows with one tetomino.

## Challenges

**_POP IT! POP IT!_**

1. The first challenge I faced for this was to figure out what tools are out there that can help create the game. I researched a few tutorials and found out about the HMTL canvas tag. This can be used to create a board and all of our tetrominoes.

2. Another challenge I faced was how to map the board. After looking through a handful of tutorials, I decided to make the board an array of 20 arrays which was for each row for the board. Each row contained 10 elements which represented the columns.

3. Another challenge is how to prevent the pieces from going beyond the left and right walls in addition to the bottom row. Based on the grid that we have set up, anything beyond the left wall would have an X value of less than 0. Anything beyond the right wall would have an X value equal to or greater than 30 SQ units (300px). We are able to combine the value of the X/Y value plus the current tetromino piece's array value X/Y value plus 1 unit in the direction the piece is moving. We compare the sum above to 0 for the left wall, to 10 for the right wall, and to 20 for the bottom wall.

4. Another challenge that I faced was how to lock pieces in once they touch the bottom of the board or touches the top of another locked piece. 

