// https://kristatian.github.io/plants-for-hire/

var answer = "";

window.onload = function () {
    const img = document.getElementById("dark-mode-btn-img");

    if (localStorage.getItem("theme") === null) {
        img.src = "assets/wakege.png";
    } else {
        img.src = localStorage.getItem("icon-path");
    }

    // pick an image and load it
    fetch("datedle-answers.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Get the keys of the object
            const keys = Object.keys(data);
            const randomIndex = Math.floor(Math.random() * keys.length);
            const currentImg = document.getElementById('main-img');
            currentImg.src = data[keys[randomIndex]].src;
            answer = keys[randomIndex];
        })
        .catch((err) => {
            console.log(err);
        });
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

var currentPicture = "good catch cafe";

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var guess = document.getElementById("guess-input").value;
  checkGuess(guess.toLowerCase());
});

function checkGuess(guess) {
  console.log("checking: ", guess);
  fetch("datedle-answers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const restaurantArray = Object.keys(data).map((name) => ({ name }));
      console.log(restaurantArray);
      const isCorrect = guess === currentPicture;

      var guessRow = document.createElement("tr");

      var guessValues = [
        guess,
        data[guess]["date visited"],
        data[guess]["number of visits"],
        data[guess]["cuisine"],
      ];

      var correctValues = [
        currentPicture,
        data[currentPicture]["date visited"],
        data[currentPicture]["number of visits"],
        data[currentPicture]["cuisine"],
      ];

      guessValues.forEach((value, index) => {
        var cell = document.createElement("th");
        cell.innerHTML = value;
        if (value === correctValues[index]) {
          console.log("correct guess");
          cell.style.backgroundColor = "green";
        } else {
          console.log("incorrect guess");
          cell.style.backgroundColor = "red";
        }
        guessRow.appendChild(cell);
      });

      document.getElementById("game-answers").appendChild(guessRow);      
    })
    .catch((err) => {
      console.log(err);
    });
}