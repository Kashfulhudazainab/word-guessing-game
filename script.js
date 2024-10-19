


let total = 0;
let correct = 0;
let falses = 0;

const inputs = document.querySelector(".inputs");
const resetBtns = document.querySelectorAll(".reset-btn");
const newgame = document.querySelectorAll(".rest-btn");
const hint = document.querySelector(".hint span");
const wrongletter = document.querySelector(".wrong-letters span");
const typingInput = document.querySelector(".typing-input");
const guess = document.querySelector(".guess-left span");

// Elements for score display
const totalGamesDisplay = document.getElementById('totalGames');
const correctAnswersDisplay = document.getElementById('correctAnswers');
const incorrectAnswersDisplay = document.getElementById('incorrectAnswers');

let word, incorrects = [], corrects = [], maxguesses;

function randomWord() {
    let ranObj = wordlist[Math.floor(Math.random() * wordlist.length)];
    word = ranObj.word.toUpperCase();
    maxguesses = 8;
    corrects = [];
    incorrects = [];
    
    wrongletter.innerText = "";
    hint.innerText = ranObj.hint;
    guess.innerText = maxguesses;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled />`;
    }
    inputs.innerHTML = html;
}

function updateScores() {
    totalGamesDisplay.innerText = total;
    correctAnswersDisplay.innerText = correct;
    incorrectAnswersDisplay.innerText = falses;
}

function endGame(result) {
    const resultBox = document.getElementById('resultBox');
    const resultMessage = document.getElementById('resultMessage');
    
    resultMessage.textContent = result; // Set the result message
    resultBox.classList.remove('hidden'); // Show the result box

    // Update total games played
    total++;
    if (result.includes("Congratulations")) {
        correct++;
    } else {
        falses++;
    }

    // Update scores display
    updateScores();
}

function restartGame() {
    const resultBox = document.getElementById('resultBox');
    resultBox.classList.add('hidden'); // Hide the result box
    randomWord(); // Start a new game
}

randomWord();

function initgame(e) {
    let key = e.target.value.toUpperCase();
    if (key.match(/^[A-Za-z]$/) && !incorrects.includes(key) && !corrects.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxguesses--;
            incorrects.push(key);
        }
        guess.innerText = maxguesses;
        wrongletter.innerText = incorrects.join(", ");
    }
    typingInput.value = "";

    setTimeout(() => {
        if (corrects.length === word.length) {
            endGame(`CONGRATULATIONS! You found the word ${word}`);
        } else if (maxguesses < 1) {
            endGame(`Game over! The correct word is ${word}`);
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

// Handle keyboard button clicks
const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener("click", () => {
        const letter = key.textContent;
        typingInput.value = letter;
        initgame({ target: typingInput });
    });
});

function resetScores() {
    total = 0;
    correct = 0;
    incorrect = 0;
    updateScoreDisplay(); // Update display if needed
}

// Function to update score display (optional)
function updateScoreDisplay() {
    const scoreDisplay = document.querySelector('.score-section'); // Adjust this selector based on your HTML
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `
            <p>Total Games: <span>${total}</span></p>
            <p>Correct Guesses: <span>${correct}</span></p>
            <p>Incorrect Guesses: <span>${incorrect}</span></p>
        `;
    }
}

// Call resetScores when a new game is started
newgame.forEach(button => {
    button.addEventListener("click", () => {
        resetScores();
        randomWord();
        // endGame(""); // Optionally clear any previous end game message
    });
});


document.querySelector('.typing-input').style.display = 'none';

// Reset button functionality
resetBtns.forEach(button => {
    button.addEventListener("click", randomWord);
});

newgame.forEach(button => {
    button.addEventListener("click", randomWord);
});

document.addEventListener("keydown", () => typingInput.focus());
typingInput.addEventListener("input", initgame);
inputs.addEventListener("click", () => typingInput.focus());
