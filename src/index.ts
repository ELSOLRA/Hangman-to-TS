
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

    