/* eslint-disable semi */
/* eslint-disable no-implied-eval */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable key-spacing */
/* eslint-disable brace-style */
// Переменная для хранения выбранного слова
var secretWord = [];
// Списки слов для каждой темы
var themes = {
  "Фрукты" : ["БАНАН", "АПЕЛЬСИН", "АНАНАС", "АРБУЗ", "ВИНОГРАД", "ГРАНАТ", "ЛИМОН", "МАНГО", "ПЕРСИК"],
  "Насекомые" : ["ПАУК", "МУХА", "КОМАР", "СТРЕКОЗА", "КУЗНЕЧИК", "КЛОП", "КОРОЕД"],
  "Животные" : ["КОШКА", "СОБАКА", "ЛЕВ", "ТИГР", "ЖИРАФ", "ОБЕЗЬЯНА", "ПОПУГАЙ"],
  "Цвета" : ["ЗЕЛЕНЫЙ", "КРАСНЫЙ", "ЧЕРНЫЙ", "КОРИЧНЕВЫЙ", "ЖЕЛТЫЙ", "ОРАНЖЕВЫЙ", "СИНИЙ", "ГОЛУБОЙ", "ФИОЛЕТОВЫЙ", "СЕРЫЙ"],
  "Страны" : ["АВСТРАЛИЯ", "АРМЕНИЯ", "БЕЛОРУССИЯ", "БРАЗИЛИЯ", "ВЕНГРИЯ", "ГВИНЕЯ", "ГРЕЦИЯ", "ДАНИЯ", "ИРАН", "КАНАДА", "КОЛУМБИЯ", "КОРЕЯ", "ЯПОНИЯ", "ВЕЛИКОБРИТАНИЯ"]
};
// Массив для отслеживания всех угаданных букв
var guessedLetters = [];
// Массив для отслеживвания не верно угаданных букв
var guessedLettersFalse = [];
// Количество попыток, оставшихся у игрока
let remainingGuesses = 10;
// Элементы страницы, с которыми будем работать
const secretWordElement = document.getElementById("secretWord");
const guessesElement = document.getElementById("guesses");
const resultElement = document.getElementById("result");
const remainingGuessesElement = document.getElementById("remainingGuesses");
const base1Element = document.getElementById("base1");
const base2Element = document.getElementById("base2");
const base3Element = document.getElementById("base3");
const base4Element = document.getElementById("base4");
const headElement = document.getElementById("head");
const bodyElement = document.getElementById("body");
const leftArmElement = document.getElementById("left-arm");
const rightArmElement = document.getElementById("right-arm");
const leftLegElement = document.getElementById("left-leg");
const rightLegElement = document.getElementById("right-leg");
// Функция, которая будет вызываться при каждой попытке угадать букву
function guessLetter (guess = document.getElementById("guess").value) {
  // Проверяем, что введена только одна буква при вводе с физической клавиатуры
  guess = guess[0].toUpperCase();
  if (guess.length !== 1) {
    alert("Пожалуйста, введите букву.");
    return;
  }
  // Проверяем, что введенный символ является буквой
  if (!guess.match(/[A-ZА-Я]/)) {
    alert("Пожалуйста, введите букву.");
    return;
  }
  // Проверяем, что буква не была угадана ранее
  if (guessedLetters.includes(guess)) {
    alert("Вы уже угадывали эту букву.");
    return;
  }
  // Функция для обновления отображения угаданных букв
  function updateGuessedLetters () {
    let displayString = "";
    for (let i = 0; i < secretWord.length; i++) {
      if (guessedLetters.includes(secretWord[i])) {
        displayString += secretWord[i] + " ";
      } else {
        displayString += "_ ";
      }
    }
    secretWordElement.innerHTML = displayString;
  }
  // Добавляем букву в список угаданных и блокируем кнопку
  guessedLetters.push(guess);
  // Проверяем, есть ли угаданная буква в загаданном слове
  if (secretWord.includes(guess)) {
    // Обновляем отображение угаданных букв
    updateGuessedLetters();
    // Блокируем использованные кнопки
    document.querySelectorAll(".key").forEach(function (button) {
      if (guessedLetters.includes(button.innerHTML)) {
        blockButtonTrue(button);
      }
    });
    // Проверяем, угадано ли все слово
    if (checkWin()) {
      openModalWin();
    }
  } else {
    guessedLettersFalse.push(guess);
    // Блокируем использованные кнопки
    document.querySelectorAll(".key").forEach(function (button) {
      if (guessedLettersFalse.includes(button.innerHTML)) {
        blockButtonFalse(button);
      }
    });
    // Уменьшаем количество попыток
    remainingGuesses--;
    // обновляем отображение оставшихся попыток
    updateRemainingGuesses();
    // Обновляем отображение виселицы
    updateHangman();
    // Проверяем, закончились ли попытки
    if (remainingGuesses === 0) {
      openModalLost();
    }
  }
  // Очищаем поле ввода
  document.getElementById("guess").value = "";
}
// Функция для проверки, угадано ли все слово
function checkWin () {
  for (let i = 0; i < secretWord.length; i++)
  { if (!guessedLetters.includes(secretWord[i]))
  {
    return false;
  }
  } return true;
}
module.exports = {
  guessLetter,
  checkWin,
  guessedLetters,
  remainingGuesses,
  secretWord
};
