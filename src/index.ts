
interface GameAudio {
    correct: HTMLAudioElement;
    victory: HTMLAudioElement;
    gameOver: HTMLAudioElement;
    wrongAnswer: HTMLAudioElement;
};

interface HangmanElements {
    ground: HTMLElement;
    scaffold: HTMLElement;
    head: HTMLElement;
    body: HTMLElement;
    arms: HTMLElement;
    legs: HTMLElement;
    hearts: HTMLElement;
};

class HangmanGame {
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
        this.resetGame();
        this.setRandomWord();
        this.showGreetingArea("Welcome, guess a letter to start the game ");
        this.updatePlaceholder();
        this.addEventListeners();
      }

      private resetGame() {     // more control with reseting so then with window.location.reload()

        this.randomWord = [];
        this.gameOver = false;
        this.wrongLetter = [];
        this.correctLetter = [];
        this.wrongGuessingCounter = 6;
      }

      private setRandomWord() {
        this.randomWord = this.wordList[
          Math.floor(Math.random() * this.wordList.length)
        ].toUpperCase().split("");
      }

      private showGreetingArea (str: string) {
        this.greeting.style.display = "block";
        this.greeting.innerHTML = str;
      }

      private updatePlaceholder() {
        this.placeHolder.innerHTML = this.randomWord.map(letter => this.correctLetter.includes(letter) ? letter : "_").join("");
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
    
    

