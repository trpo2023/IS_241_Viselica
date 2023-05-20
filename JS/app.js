setTimeout("document.getElementById('StartWindow').style.display='block'");
// Получаем ссылки на все кнопки
const buttons = document.querySelectorAll('button');
// Добавляем обработчик событий на каждую кнопку
buttons.forEach((button) => {
    button.addEventListener("click", () => {
    });
});
function addLetter(letter) {
// Получаем поле ввода и записываем в него новую букву
var inputField = document.getElementById("guess");
inputField.value = letter;
}
// Переменная для хранения названия темы
var selectedTheme = '';
// Функция выбора случайного слова из списка
function startGame(theme) {
    var words = themes[theme];
    selectedTheme = theme;
    secretWord = words[Math.floor(Math.random() * words.length)];
    closeStartWindow();
    showSelectedTheme();
    updateGuessedLetters();
}
// Функция для вывода названия выбранной темы
function showSelectedTheme(){
    const themeContainer = document.getElementById('themeContainer');
    themeContainer.textContent = 'Тема: ' + selectedTheme;
}
// Функция для скрытия модального окна выбра тем
function closeStartWindow(){
    StartWindow.style.display="none";
}
// Массив для отслеживания всех угаданных букв
var guessedLetters = [];
// Массив для отслеживвания не верно угаданных букв
var guessedLettersFalse = [];
// Функция для блокировки кнопки при верно угаданной буквы
function blockButtonTrue(button) {
    button.classList.add("usedTrue");
    button.disabled = true;
}
// Функция дял блокировки кнопки при не верно угаданной буквы
function blockButtonFalse(button) {
    button.classList.add("usedFalse");
    button.disabled = true;
}
// Получаем ссылку на модальное проигрыша окно
var modalLoser = document.getElementById("myModalLost");
var span = document.getElementsByClassName("close")[0];
// Получаем ссылку на модальное выигрыша окно
var modalWiner = document.getElementById("myModalWin");
var span = document.getElementsByClassName("close")[0];
// Функция для открытия модального окна проигрыша
function openModalLost() {
    var modalText = document.getElementById("modalText");
    modalText.innerHTML = secretWord;
    modalLoser.style.display = "block";
}
// Функция для открытия модального окна выигрыша
function openModalWin() {
    modalWiner.style.display = "block";
}
// Функция для закрытия модального окна проигрыша
function closeModalLost() {
    modalLoser.style.display = "none";
}
// Функция для закрытия модального окна выигрыша
function closeModalWin() {
    modalWiner.style.display = "none";
}
// Функция для запуска новой игры при проигрыше
function startNewGameLoser() {
    location.reload();
    closeModalLost();
}
// Функция для запуска новой игры при выигрыше
function startNewGameWiner() {
    location.reload();
    closeModalWin();
}
// Функция для обновления отображения угаданных букв
function updateGuessedLetters() {
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
// Функция для обновления отображения оставшихся попыток + мигание
function updateRemainingGuesses() {
    remainingGuessesElement.innerHTML = "Попытки: " + remainingGuesses;
    remainingGuessesElement.classList.add("blink");
    setTimeout(() => {
    remainingGuessesElement.classList.remove("blink");
    }, 1000);
}
// Функция для обновления отображения виселицы
function updateHangman() {
    switch (remainingGuesses) {
    case 9:
        base4Element.style.display = "block";
        break;
    case 8:
        base3Element.style.display = "block";
        break;
    case 7:
        base2Element.style.display = "block";
        break;
    case 6:
        base1Element.style.display = "block";
        break;
    case 5:
        headElement.style.display = "block";
        break;
    case 4:
        bodyElement.style.display = "block";
        break;
    case 3:
        leftArmElement.style.display = "block";
        break;
    case 2:
        rightArmElement.style.display = "block";
        break;
    case 1:
        leftLegElement.style.display = "block";
        break;
    case 0:
        rightLegElement.style.display = "block";
        break;
    }
}
// Обработчик события для кнопки "Угадать"
document.getElementById("guessButton").addEventListener("click", guessLetter);
// Инициализация отображения
updateGuessedLetters();
updateRemainingGuesses();
updateHangman();