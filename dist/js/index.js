import { HangmanGame, wordList } from "./HangmanGame.js";
const buttons = document.querySelectorAll('.keyboard__button');
const restartButton = document.getElementById('restart');
const greeting = document.getElementById('greeting');
const placeHolder = document.getElementById('word-placeholder');
const hangmanBox = document.querySelector('.hangman-box');
export const hangmanGame = new HangmanGame(wordList, buttons, restartButton, greeting, placeHolder, hangmanBox);
