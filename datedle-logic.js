// https://kristatian.github.io/plants-for-hire/

window.onload = function () {
  const img = document.getElementById("dark-mode-btn-img");

  if (localStorage.getItem("theme") === null) {
    img.src = "assets/wakege.png";
  } else {
    img.src = localStorage.getItem("icon-path");
  }

  generateNewPicture();
  document.getElementById("playAgainModal").style.display = "hidden";
};

function toggleDarkMode() {
  const img = document.getElementById("dark-mode-btn-img");

  // toggle adds class if doesn't exist, removes if exists
  // returns true if added, false if removed
  // documentElement returns root node (:root)
  const isDarkMode = document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  localStorage.setItem(
    "icon-path",
    isDarkMode ? "assets/bedge.png" : "assets/wakege.png"
  );
  img.src = localStorage.getItem("icon-path");
}

function toggleLoveMode() {
  if (localStorage.getItem("loveTheme") !== "true") {
    const isLoveMode = document.documentElement.classList.toggle("love-mode");
    localStorage.setItem("loveTheme", isLoveMode);
  } else {
    const isLoveMode = document.documentElement.classList.toggle("love-mode");
    localStorage.setItem("loveTheme", isLoveMode);
  }
}

let currentPicture = "";
let isCorrectGuess = false;

function generateNewPicture() {
  console.log("nice try");
  let modal = document.getElementById("play-again-modal");
  modal.style.display = "none";
  // removes previous guesses from answer list
  const gameAnswers = document.getElementById("game-answers");
  while (gameAnswers.firstChild) {
    gameAnswers.removeChild(gameAnswers.lastChild);
  }

  fetch("datedle-answers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const keys = Object.keys(data);
      let randomIndex = Math.floor(Math.random() * keys.length);
      const currentImg = document.getElementById("main-img");
      currentImg.src = data[keys[randomIndex]].src;
      currentPicture = keys[randomIndex];
    });
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var guess = document.getElementById("guess-input").value;
  checkGuess(guess.toLowerCase());
  document.getElementById("guess-input").value = "";
});

function checkGuess(guess) {
  console.log("checking: ", guess);
  fetch("datedle-answers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      isCorrectGuess = guess === currentPicture;

      var guessRow = document.createElement("tr");

      var guessValues = [
        guess,
        data[guess]["date visited"],
        data[guess]["number of visits"],
        data[guess]["cuisine"],
      ];

      console.log("guessValues:", guessValues);

      var correctValues = [
        currentPicture,
        data[currentPicture]["date visited"],
        data[currentPicture]["number of visits"],
        data[currentPicture]["cuisine"],
      ];
      guessValues.forEach((value, index) => {
        var cell = document.createElement("th");

        if (index === 1) {
          let guessDate = new Date(guessValues[index]);
          let correctDate = new Date(correctValues[index]);
          if (guessDate > correctDate) {
            cell.innerHTML = value + "\n(earlier ↑)";
            cell.style.backgroundColor = "orange";
          } else if (guessDate < correctDate) {
            cell.innerHTML = value + "\n(later ↓)";
            cell.style.backgroundColor = "orange";
          } else {
            cell.innerHTML = value;
            cell.style.backgroundColor = "green";
          }
        } else if (index === 2) {
          if (guessValues[index] > correctValues[index]) {
            cell.innerHTML = value + "\n(↓)";
            cell.style.backgroundColor = "orange";
          } else if (guessValues[index] > correctValues[index]) {
            cell.innerHTML = value + "\n(↑)";
            cell.style.backgroundColor = "orange";
          } else {
            cell.innerHTML = value;
            cell.style.backgroundColor = "green";
          }
        } else {
          cell.innerHTML = value;
          cell.style.backgroundColor =
            value === correctValues[index] ? "green" : "red";
        }

        guessRow.appendChild(cell);
      });

      document.getElementById("game-answers").appendChild(guessRow);

      if (isCorrectGuess) {
        console.log("congratulations! generating next picture...");
        sideToSideSweep();
        let modal = document.getElementById("play-again-modal");
        modal.style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkBonusQuestion(guess) {
  fetch("datedle-answers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const isCorrectBonus = guess === data[currentPicture]["day of week"];
      const bonusGuessText = document.getElementById("bonus-guess");
      const bonusGuessValue = document.createElement("p");
      bonusGuessValue.innerHTML = guess;

      if (isCorrectBonus) {
        sideToSideSweep();
        bonusGuessValue.style.color = "green";
        bonusGuessText.append(bonusGuessValue);
      } else {
        bonusGuessValue.style.color = "red";
        bonusGuessText.append(bonusGuessValue);
      }
      const bonusAnswerText = document.getElementById("bonus-answer");
      const bonusAnswerValue = document.createElement("p");
      bonusAnswerValue.innerHTML = data[currentPicture]["day of week"];
      bonusAnswerValue.style.color = "green";
      bonusAnswerText.append(bonusAnswerValue);
    });
}

document.getElementById("bonus-form").addEventListener("submit", (event) => {
  event.preventDefault();
  var guess = document.getElementById("bonus-guess-input").value;
  checkBonusQuestion(guess.toLowerCase());
  document.getElementById("guess-input").value = "";
});

document.getElementsByClassName("close")[0].onclick = function () {
  document.getElementById("play-again-modal").style.display = "none";
};

document.getElementById("playagain-no").onclick = function () {
  document.getElementById("play-again-modal").style.display = "none";
  document.getElementById("guess-input").disabled = true;
};

// confetti stuff
function sideToSideSweep() {
  confetti({
    particleCount: 200,
    spread: 70,
    startVelocity: 60,
    origin: { x: 0, y: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    startVelocity: 60,
    origin: { x: 1, y: 0.8 },
  });
}
