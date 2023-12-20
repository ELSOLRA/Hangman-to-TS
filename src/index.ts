import { wordList } from './wordlist'
import { HangmanGame } from './HangmanGame';
import { GameAudio, HangmanElements } from './interfaces';

const buttons = document.querySelectorAll('.keyboard__button') as NodeListOf<HTMLButtonElement>;
const restartButton = document.getElementById('restart') as HTMLButtonElement;
const greeting = document.getElementById('greeting') as HTMLElement;
const placeHolder = document.getElementById('word-placeholder') as HTMLElement;
const hangmanBox = document.querySelector('.hangman-box') as HTMLElement;
const audio: GameAudio = {
    correct: new Audio('Assets/sounds/correct3.mp3'),
    victory: new Audio('Assets/sounds/victory1.mp3'),
    gameOver: new Audio('Assets/sounds/gameover1.mp3'),
    wrongAnswer: new Audio('Assets/sounds/wronganswer7.mp3'),
};

const hangmanElements: HangmanElements = {
    ground: document.getElementById('ground') as HTMLElement,
    scaffold: document.getElementById('scaffold') as HTMLElement,
    head: document.getElementById('head') as HTMLElement,
    body: document.getElementById('body') as HTMLElement,
    arms: document.getElementById('arms') as HTMLElement,
    legs: document.getElementById('legs') as HTMLElement,
    hearts: document.getElementById('hearts') as HTMLElement,

};
// Initializing HangmanGame
const hangmanGame = new HangmanGame(
    wordList,
    buttons,
    restartButton,
    greeting,
    placeHolder,
    hangmanBox,
    audio,
    hangmanElements
);


