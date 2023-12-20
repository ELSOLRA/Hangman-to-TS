const wordList = [
    "Apple", "Banana", "Carrot", "Dog", "Elephant", "Frog", "Guitar", "Hat", "Cream", "Jellyfish",
    "Kangaroo", "Lemon", "Monkey", "Penguin", "Queen", "Rainbow", "Sunflower", "Turtle", "Umbrella",
    "Violin", "Watermelon", "Xylophone", "Yogurt", "Zebra",
];
const buttons = document.querySelectorAll('.keyboard__button');
const restartButton = document.getElementById('restart');
const greeting = document.getElementById('greeting');
const placeHolder = document.getElementById('word-placeholder');
const hangmanBox = document.querySelector('.hangman-box');
export class HangmanGame {
    constructor(wordList, buttons, restartButton, greeting, placeHolder, hangmanBox) {
        this.wordList = wordList;
        this.buttons = buttons;
        this.restartButton = restartButton;
        this.greeting = greeting;
        this.placeHolder = placeHolder;
        this.hangmanBox = hangmanBox;
        this.randomWord = [];
        this.gameOver = false;
        this.wrongLetter = [];
        this.correctLetter = [];
        this.wrongGuessingCounter = 6;
        this.maxHeightPercentage = "30%";
        this.audio = {
            correct: new Audio("Assets/sounds/correct3.mp3"),
            victory: new Audio("Assets/sounds/victory1.mp3"),
            gameOver: new Audio("Assets/sounds/gameover1.mp3"),
            wrongAnswer: new Audio("Assets/sounds/wronganswer7.mp3"),
        };
        this.hangmanElements = {
            ground: document.getElementById('ground'),
            scaffold: document.getElementById('scaffold'),
            head: document.getElementById('head'),
            body: document.getElementById('body'),
            arms: document.getElementById('arms'),
            legs: document.getElementById('legs'),
            hearts: document.getElementById('hearts'),
        };
        this.initialize();
    }
    initialize() {
        this.setRandomWord();
        this.showGreetingArea("Welcome, guess a letter to start the game ");
        this.updatePlaceholder();
        this.addEventListeners();
    }
    resetGame() {
        window.location.reload();
    }
    setRandomWord() {
        this.randomWord = wordList[Math.floor(Math.random() * wordList.length)]
            .toUpperCase()
            .split("");
    }
    showGreetingArea(str) {
        this.greeting.style.display = "block";
        this.greeting.innerHTML = str;
    }
    updatePlaceholder() {
        this.placeHolder.innerHTML = this.randomWord
            .map((letter) => (this.correctLetter.includes(letter) ? letter : "_"))
            .join("");
    }
    addEventListeners() {
        this.restartButton.addEventListener("click", () => this.resetGame());
        this.buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (!this.gameOver) {
                    this.handleGuess(button.innerHTML.toUpperCase());
                    button.disabled = true;
                }
            });
        });
        document.addEventListener("keydown", (event) => {
            if (!this.gameOver) {
                this.handleGuess(event.key.toUpperCase());
            }
        });
    }
    playAudio(audio, delay = 0) {
        setTimeout(() => audio.play(), delay);
    }
    isWordGuessed() {
        return this.randomWord.every((letter) => this.correctLetter.includes(letter));
    }
    handleGuess(guess) {
        this.greeting.style.display = "none";
        if (this.randomWord.includes(guess) &&
            !this.correctLetter.includes(guess)) {
            this.correctLetter.push(guess);
            let clickedButton = Array.from(this.buttons).find((button) => button.innerHTML.toUpperCase() === guess);
            if (clickedButton) {
                clickedButton.classList.add("correct-letter");
                clickedButton.disabled = true;
            }
            this.playAudio(this.audio.correct);
            setTimeout(() => {
                this.updatePlaceholder();
            }, 300);
            if (this.isWordGuessed()) {
                this.showGreetingArea("You found the word!");
                this.restartButton.style.display = "block";
                this.hangmanBox.style.maxHeight = this.maxHeightPercentage;
                this.gameOver = true;
                this.disableAllButtons();
                this.playAudio(this.audio.victory, 400);
            }
        }
        else if (!this.randomWord.includes(guess) &&
            !this.wrongLetter.includes(guess)) {
            this.wrongLetter.push(guess);
            this.wrongGuessingCounter--;
            this.updateFeatures();
            this.playAudio(this.audio.wrongAnswer);
            if (this.wrongGuessingCounter === 0) {
                this.gameIsOver();
            }
        }
    }
    updateFeatures() {
        switch (this.wrongGuessingCounter) {
            case 5:
                this.hangmanElements.ground.style.display = "block";
                this.hangmanElements.hearts.innerHTML =
                    "&hearts; &hearts; &hearts; &hearts; &hearts;";
                break;
            case 4:
                this.hangmanElements.scaffold.style.display = "block";
                this.hangmanElements.hearts.innerHTML =
                    "&hearts; &hearts; &hearts; &hearts;";
                break;
            case 3:
                this.hangmanElements.head.style.display = "block";
                this.hangmanElements.hearts.innerHTML = "&hearts; &hearts; &hearts;";
                break;
            case 2:
                this.hangmanElements.body.style.display = "block";
                this.hangmanElements.hearts.innerHTML = "&hearts; &hearts;";
                break;
            case 1:
                this.hangmanElements.arms.style.display = "block";
                this.hangmanElements.hearts.innerHTML = "&hearts; &hearts;";
                break;
            case 0:
                this.hangmanElements.legs.style.display = "block";
                this.hangmanElements.hearts.innerHTML = " ";
                break;
        }
    }
    disableAllButtons() {
        this.buttons.forEach((button) => {
            button.disabled = true;
        });
    }
    gameIsOver() {
        console.log("Game over - Six wrong guesses reached.");
        this.gameOver = true;
        this.disableAllButtons();
        this.showGreetingArea(`You lost, the right word was: ${this.randomWord.join("")}`);
        this.restartButton.style.display = "block";
        this.playAudio(this.audio.gameOver, 400);
    }
}
const hangmanGame = new HangmanGame(wordList, buttons, restartButton, greeting, placeHolder, hangmanBox);
