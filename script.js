// wordle.js
const targetWord = "COOCHIE";
const maxGuesses = 6;
let currentGuess = "";
let attempts = 0;

document.addEventListener("DOMContentLoaded", () => {
    const wordleContainer = document.getElementById("wordle");
    const submitButton = document.getElementById("submit");
    const kissButton = document.getElementById("kiss");
    const hugButton = document.getElementById("hug");
    const animationContainer = document.getElementById("animation-container");
    
    for (let i = 0; i < maxGuesses; i++) {
        const row = document.createElement("div");
        row.classList.add("word-row");
        
        for (let j = 0; j < targetWord.length; j++) {
            const letterBox = document.createElement("input");
            letterBox.classList.add("letter-box");
            letterBox.setAttribute("maxlength", "1");
            letterBox.dataset.row = i;
            letterBox.dataset.col = j;
            row.appendChild(letterBox);
        }
        wordleContainer.appendChild(row);
    }
    
    document.querySelectorAll(".letter-box").forEach((box, index, boxes) => {
        box.addEventListener("input", (event) => {
            if (event.target.value.length === 1) {
                const nextBox = boxes[index + 1];
                if (nextBox) nextBox.focus();
            }
        });
        
        box.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !box.value) {
                const prevBox = boxes[index - 1];
                if (prevBox) {
                    prevBox.focus();
                    prevBox.value = "";
                }
            }
        });
    });
    
    submitButton.addEventListener("click", () => {
        if (attempts >= maxGuesses) return;
        
        const rowInputs = document.querySelectorAll(`.word-row:nth-child(${attempts + 1}) .letter-box`);
        let guess = "";
        
        rowInputs.forEach(input => guess += input.value.toUpperCase());
        if (guess.length !== targetWord.length) return;
        
        rowInputs.forEach((input, index) => {
            if (guess[index] === targetWord[index]) {
                input.classList.add("correct");
            } else if (targetWord.includes(guess[index])) {
                input.classList.add("present");
            } else {
                input.classList.add("absent");
            }
        });
        
        if (guess === targetWord) {
            alert("Congratulations! You guessed the word.");
            return;
        }
        
        attempts++;
    });
    
    kissButton.addEventListener("click", () => {
        const kiss = document.createElement("div");
        kiss.classList.add("kiss-animation");
        kiss.innerText = "😘";
        animationContainer.appendChild(kiss);
        setTimeout(() => kiss.remove(), 2000);
    });
    
    hugButton.addEventListener("click", () => {
        const hug = document.createElement("div");
        hug.classList.add("hug-animation");
        hug.innerText = "🤗";
        animationContainer.appendChild(hug);
        setTimeout(() => hug.remove(), 2000);
    });
});
