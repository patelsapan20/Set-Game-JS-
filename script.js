//js script for game logic

// Define card attributes: color, shape, shading, number
const COLORS = ["red", "green", "purple"];
const SHAPES = ["diamond", "squiggle", "oval"];
const SHADINGS = ["solid", "striped", "outlined"];
const NUMBERS = [1, 2, 3];
let playerPoints = 0;
let time = 0;
let timerInterval;
const pointsDisplay = document.getElementById("points");
const timerDisplay = document.getElementById("time");
let gameBoard = [];

// Function to start the timer
function startTimer() {
    timerInterval = setTimeout(function updateTime() {
        time++;
        timerDisplay.textContent = time;
        timerInterval = setTimeout(updateTime, 1000); // Call updateTime again after 1 second
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Function to add 5 points if player gets a set
function addpoints() {
    playerPoints += 5;
    pointsDisplay.textContent = playerPoints;
    checkWin(playerPoints);
}

// Funtion to start new game
function startNewGame() {
    playerPoints = 0;
    time = 0;
    timerDisplay.textContent = time;
    pointsDisplay.textContent = playerPoints;
    generateGameBoard();
}

// Function to check if player has reached 25 points needed to win
function checkWin() {
    if (playerPoints == 25) {
        alert("You Win!");
        startNewGame();
    }
}

// Function to generate a random card
function generateRandomCard() {
    return {
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        shading: SHADINGS[Math.floor(Math.random() * SHADINGS.length)],
        number: NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
    };
}

// Function to generate the game board
function generateGameBoard() {
    startTimer();
    const gameBoardElement = document.getElementById("game-board");
    gameBoardElement.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        const card = generateRandomCard();
        gameBoard.push(card);
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        // Set background pattern based on shading
        let backgroundPattern = "";
        switch (card.shading) {
            case "solid":
                backgroundPattern = "none";
                break;
            case "striped":
                backgroundPattern =
                    "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5) 10px, transparent 10px, transparent 20px)";
                break;
            case "outlined":
                cardElement.style.border = "7px inset white";
                break;
            default:
                backgroundPattern = "none";
        }

        cardElement.style.backgroundColor = card.color;
        cardElement.style.backgroundImage = backgroundPattern;

        cardElement.textContent = `${card.number} ${card.shading} ${card.color} ${card.shape}`;
        gameBoardElement.appendChild(cardElement);

        // Add event listener to each card
        cardElement.addEventListener("click", function () {
            handleCardClick(cardElement, i);
        });
    }
}

let selectedCards = []; // Array to store selected cards

// Function to handle card click
function handleCardClick(cardElement, cardIndex) {
    if (cardElement.classList.contains("selected")) {
        cardElement.classList.remove("selected");
        // Remove card from selectedCards array
        selectedCards.splice(selectedCards.indexOf(cardIndex), 1);
    } else {
        if (selectedCards.length < 3) {
            cardElement.classList.add("selected");
            // Add card to selectedCards array
            selectedCards.push(cardIndex);
        } else {
            alert("You can only select up to 3 cards.");
        }
    }

    // If 3 cards are selected, check if they form a set
    if (selectedCards.length === 3) {
        const card1 = gameBoard[selectedCards[0]];
        const card2 = gameBoard[selectedCards[1]];
        const card3 = gameBoard[selectedCards[2]];

        if (isSet(card1, card2, card3)) {
            alert("Congratulations! It's a Set!");
            addpoints();
            checkWin();
            replaceSelectedCards(selectedCards);
        } else {
            alert("Sorry, it's not a Set.");
            // Automatically deselect cards if they do not form a set
            selectedCards.forEach((index) => {
                const selectedCardElement = document.querySelector(
                    `.card:nth-child(${index + 1})`
                );
                selectedCardElement.classList.remove("selected");
            });
            selectedCards = []; // Reset selectedCards array
        }
    }
}

// Function to replace selected cards with new ones from the deck
function replaceSelectedCards(selectedCards) {
    selectedCards.forEach((index) => {
        // Remove the selected card from the game board
        gameBoard.splice(index, 1);

        // Generate a new random card from the deck
        const newCard = generateRandomCard();

        // Insert the new card into the game board at the same index
        gameBoard.splice(index, 0, newCard);

        // Update the UI to reflect the new card
        const cardElement = document.querySelector(
            `.card:nth-child(${index + 1})`
        );
        cardElement.style.backgroundColor = newCard.color;
        // Update other card attributes as needed (shape, shading, number)
        cardElement.textContent = `${newCard.number} ${newCard.shading} ${newCard.color} ${newCard.shape}`;

        cardElement.classList.remove("selected");
    });
    selectedCards = [];
}

// Function to deal new cards
function dealCards() {
    gameBoard = [];
    generateGameBoard();
}

// Function to check if three cards form a set
function isSet(card1, card2, card3) {
    const attributes = ["color", "shape", "shading", "number"];
    for (let attribute of attributes) {
        const values = [card1[attribute], card2[attribute], card3[attribute]];
        // Check if all values are the same or all different
        if (
            !(values[0] === values[1] && values[1] === values[2]) &&
            !(
                values[0] !== values[1] &&
                values[1] !== values[2] &&
                values[0] !== values[2]
            )
        ) {
            return false;
        }
    }

    return true; // If condition met for all attributes, it's a set
}

// Function to provide a hint for a set on the game board
function getHint() {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = i + 1; j < gameBoard.length; j++) {
            for (let k = j + 1; k < gameBoard.length; k++) {
                const card1 = gameBoard[i];
                const card2 = gameBoard[j];
                const card3 = gameBoard[k];
                if (isSet(card1, card2, card3)) {
                    highlightHint(card1, card2, card3);
                    return;
                }
            }
        }
    }
    alert("No set found on the board.");
}

// Function to highlight cards that form a hint
function highlightHint(card1, card2, card3) {
    const gameBoardElement = document.getElementById("game-board");
    const cards = gameBoardElement.getElementsByClassName("card");
    for (let card of cards) {
        const cardColor = card.style.backgroundColor;
        const cardText = card.textContent.trim();
        if (
            (cardColor === card1.color ||
                cardColor === card2.color ||
                cardColor === card3.color) &&
            (cardText.includes(card1.shape) ||
                cardText.includes(card2.shape) ||
                cardText.includes(card3.shape)) &&
            (cardText.includes(card1.shading) ||
                cardText.includes(card2.shading) ||
                cardText.includes(card3.shading)) &&
            (cardText.includes(card1.number) ||
                cardText.includes(card2.number) ||
                cardText.includes(card3.number))
        ) {
            card.style.animation = "bounce 0.5s 3, highlight 0.5s 3";
            // Remove animation after it's done
            setTimeout(() => {
                card.style.animation = "";
            }, 1500); // 1500ms = 0.5s (animation duration) * 3 (number of bounces)
        }
    }
}

//initialize game and button events
generateGameBoard();
document.getElementById("deal-button").addEventListener("click", dealCards);
document.getElementById("hint-button").addEventListener("click", getHint);
