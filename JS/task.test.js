/* eslint-disable no-undef */
// Импортируем функции для тестирования

// Мокаем метод getElementById
document.getElementById = jest.fn().mockReturnValue({
  value: 'text'
})
global.alert = jest.fn()
const {
  guessLetter,
  checkWin,
  guessedLetters,
  remainingGuesses,
  secretWord
} = require('./game.js')

// Тест для функции guessLetter
test('guessLetter угадывает правильную букву', () => {
  // Задаем начальные значения
  secretWord.push('A', 'P', 'P', 'E', 'L')
  guessedLetters.length = 0

  // Вызываем функцию guessLetter с правильно угаданной буквой 'P'
  guessLetter('P')

  // Проверяем, что буква 'P' добавлена в список угаданных букв
  expect(guessedLetters).toContain('P')

  // Проверяем, что количество оставшихся попыток не изменилось
  expect(remainingGuesses).toBe(10)
})

// Тест для функции checkWin
test('checkWin возвращает true при полном угадывании слова', () => {
  // Устанавливаем начальное значение массива guessedLetters
  guessedLetters.length = 0

  // Устанавливаем значения массива secretWord
  secretWord.length = 0
  secretWord.push('A', 'B', 'C')

  // Добавляем все буквы secretWord в массив guessedLetters
  secretWord.forEach((letter) => {
    guessedLetters.push(letter)
  })

  // Проверяем, что checkWin возвращает true
  expect(checkWin()).toBe(true)
})

test('checkWin возвращает false при неполном угадывании слова', () => {
  // Устанавливаем начальное значение массива guessedLetters
  guessedLetters.length = 0

  // Устанавливаем значения массива secretWord
  secretWord.length = 0
  secretWord.push('A', 'B', 'C')

  // Добавляем только одну букву secretWord в массив guessedLetters
  guessedLetters.push('A')

  // Проверяем, что checkWin возвращает false
  expect(checkWin()).toBe(false)
})
