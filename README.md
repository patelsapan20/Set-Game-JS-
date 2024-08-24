# Game of Set

## Technology Used

- HTML
- CSS
- JavaScript

To Play the game, run index.html file.

## Code Overview

The Game of Set is implemented using HTML, CSS, and JavaScript. The JavaScript file (`script.js`) contains the game logic, including functions for generating the game board, dealing cards, providing hints, checking sets, and handling animations.

## JavaScript Functions Overview

### `generateRandomCard()`

- Generates a random card with attributes (color, shape, shading, number).

### `generateGameBoard()`

- Generates the game board by creating and appending card elements to the DOM.
- Sets background patterns based on card shadings.

### `dealCards()`

- Clears the game board and deals new cards by calling `generateGameBoard()`.

### `getHint()`

- Provides a hint for finding a set on the game board by iterating through all possible combinations of cards.
- Highlights cards that form a set as a hint to the player by animating them.

### `isSet(card1, card2, card3)`

- Checks if three cards form a set based on their attributes (color, shape, shading, number).

### `highlightHint(card1, card2, card3)`

- Animates and highlights cards that form a set as a hint to the player.

### `addpoints()`

- Adds 5 points to the player's score if they correctly identify a set.

### `startNewGame()`

- Resets player points and timer, then generates a new game board.

### `checkWin()`

- Checks if the player has reached 25 points needed to win the game.

### `handleCardClick(cardElement, cardIndex)`

- Handles the click event on a card, allowing the player to select cards and check for sets.

### `replaceSelectedCards(selectedCards)`

- Replaces selected cards with new ones from the deck after a set is identified.

### `startTimer()`

- Starts the timer to track the game duration.

### `stopTimer()`

- Stops the timer.

## Game Of Set

### Description:

The Game of Set is a card game that challenges players' visual perception and pattern recognition skills. Players must identify sets of three cards based on shared or distinct attributes (color, shape, shading, number) within a deck of unique cards.

### Rules:

1. **Deck**: The deck consists of 81 unique cards, each featuring variations in four different attributes.
2. **Setup**: Twelve cards are dealt face-up to form the game board.
3. **Identification of Sets**: A set consists of three cards that satisfy specific attribute conditions.
4. **Scoring**: Players earn points by correctly identifying sets.
5. **End of Game**: The game ends when no more sets can be found on the game board.

