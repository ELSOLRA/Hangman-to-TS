import { GameAudio, HangmanElements } from "./interfaces";

export class HangmanGame {
  private randomWord: string[];
  private gameOver: boolean;
  private wrongLetter: string[];
  private correctLetter: string[];
  private wrongGuessingCounter: number;
  private readonly maxHeightPercentage: string = "30%";

  constructor(
    private wordList: string[],
    private buttons: NodeListOf<HTMLButtonElement>,
    private restartButton: HTMLButtonElement,
    private greeting: HTMLElement,
    private placeHolder: HTMLElement,
    private hangmanBox: HTMLElement,
    private audio: GameAudio,
    private hangmanElements: HangmanElements
  ) {
    this.randomWord = [];
    this.gameOver = false;
    this.wrongLetter = [];
    this.correctLetter = [];
    this.wrongGuessingCounter = 0;
    this.resetGame();
    this.setRandomWord();
    this.showGreetingArea("Welcome, guess a letter to start the game ");
    this.updatePlaceholder();
    this.addEventListeners();
  }

  private resetGame() {
    // more control with reseting so then with window.location.reload()

    this.randomWord = [];
    this.gameOver = false;
    this.wrongLetter = [];
    this.correctLetter = [];
    this.wrongGuessingCounter = 6;
  }

  private setRandomWord() {
    this.randomWord = this.wordList[
      Math.floor(Math.random() * this.wordList.length)
    ]
      .toUpperCase()
      .split("");
  }

  private showGreetingArea(str: string) {
    this.greeting.style.display = "block";
    this.greeting.innerHTML = str;
  }

  private updatePlaceholder() {
    this.placeHolder.innerHTML = this.randomWord
      .map((letter) => (this.correctLetter.includes(letter) ? letter : "_"))
      .join("");
  }

  private addEventListeners() {
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

  private playAudio(audio: HTMLAudioElement, delay: number = 0) {
    setTimeout(() => audio.play(), delay);
  }

  private isWordGuessed() {
    return this.randomWord.every((letter) =>
      this.correctLetter.includes(letter)
    );
  }

  private handleGuess(guess: string) {
    this.greeting.style.display = "none";

    if (
      this.randomWord.includes(guess) &&
      !this.correctLetter.includes(guess)
    ) {
      this.correctLetter.push(guess);
      let clickedButton = Array.from(this.buttons).find(
        (button) => button.innerHTML.toUpperCase() === guess
      );
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
    } else if (
      !this.randomWord.includes(guess) &&
      !this.wrongLetter.includes(guess)
    ) {
      this.wrongLetter.push(guess);
      this.wrongGuessingCounter--;
      this.updateFeatures();
      this.playAudio(this.audio.wrongAnswer);

      if (this.wrongGuessingCounter === 0) {
        this.gameIsOver();
      }
    }
  }

  private updateFeatures() {
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

  private disableAllButtons() {
    this.buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  private gameIsOver() {
    console.log("Game over - Six wrong guesses reached.");
    this.gameOver = true;
    this.disableAllButtons();
    this.showGreetingArea(
      `You lost, the right word was: ${this.randomWord.join("")}`
    );
    this.restartButton.style.display = "block";
    this.playAudio(this.audio.gameOver, 400);
  }
}
