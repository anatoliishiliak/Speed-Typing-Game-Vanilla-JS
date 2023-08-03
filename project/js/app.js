window.addEventListener("load", init);

//Availible levels
const levels = {
  easy: 10,
  medium: 7,
  hard: 5,
  insane: 3,
  impossible: 1,
};

//DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#high-score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const buttonEasy = document.querySelector("#button-easy");
const buttonMedium = document.querySelector("#button-medium");
const buttonHard = document.querySelector("#button-hard");
const buttonInsane = document.querySelector("#button-insane");
const buttonImpossible = document.querySelector("#button-impossible");

//Change level for user with button
buttonEasy.addEventListener("click", () => {
  currentLevel = levels.easy;
  button();
});
buttonMedium.addEventListener("click", () => {
  currentLevel = levels.medium;
  button();
});
buttonHard.addEventListener("click", () => {
  currentLevel = levels.hard;
  button();
});
buttonInsane.addEventListener("click", () => {
  currentLevel = levels.insane;
  button();
});
buttonImpossible.addEventListener("click", () => {
  currentLevel = levels.impossible;
  button();
});
function button() {
  time = currentLevel;
  timeDisplay.innerHTML = time;
  seconds.innerHTML = time;
  score = -1;
  scoreDisplay.innerHTML = 0;
  message.innerHTML = "Type to start!";
  currentWord.innerHTML = "hello";
}
//Globals
let currentLevel = levels.easy;
let time = currentLevel;
let score = -1;
let isPlaying;
// Get 1 random word API link
const wordsApi = "https://random-word-api.herokuapp.com/word";

//Load and Show word from API as data
function showWord() {
  fetch(wordsApi)
    .then((responce) => {
      return responce.json();
    })
    .then((data) => {
      currentWord.innerHTML = data;
    });
}

//Initialize Game
function init() {
  //Start matching on input value
  wordInput.addEventListener("input", startMatch);
  //Call countdown every second
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkStatus, 50);

  //Check for high score
  setInterval(highScore, 50);
  //Show number of seconds in UI
  timeDisplay.innerHTML = time;
  seconds.innerHTML = time;
}

//Start match

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord();
    wordInput.value = "";
    score++;
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}
//Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!";
    return true;
  } else {
    return false;
  }
}

//Countdown timer
function countdown() {
  //Make shure time is not run out
  if (time > 0 && currentWord.innerHTML != "hello") {
    //Decrement time
    time--;
    //Show correct message while typing
    whileTyping();
  } else if (time === 0) {
    isPlaying = false;
  }
  //Show time
  timeDisplay.innerHTML = time;
}
//Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over :(";
    score = -1;
  }
}

//Show correct message while typing
function whileTyping() {
  if (wordInput.value != 0) {
    message.innerHTML = "Typing...";
  }
}
//check for high score
function highScore() {
  if (
    message.innerHTML === "Game Over :(" &&
    scoreDisplay.innerHTML > highScoreDisplay.innerHTML
  ) {
    highScoreDisplay.innerHTML = scoreDisplay.innerHTML;
  }
}

// create hiscore with local storage - almost done
//make possible to user to change levels - done
