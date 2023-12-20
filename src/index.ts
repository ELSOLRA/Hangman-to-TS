import { HangmanGame, wordList } from "./HangmanGame.js";

const buttons = document.querySelectorAll('.keyboard__button') as NodeListOf<HTMLButtonElement>;
const restartButton = document.getElementById('restart') as HTMLButtonElement;
const greeting = document.getElementById('greeting') as HTMLElement;
const placeHolder = document.getElementById('word-placeholder') as HTMLElement;
const hangmanBox = document.querySelector('.hangman-box') as HTMLElement;

export const hangmanGame = new HangmanGame(wordList, buttons, restartButton, greeting, placeHolder, hangmanBox);


