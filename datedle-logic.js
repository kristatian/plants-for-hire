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

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    var guess = document.getElementById("guess-input").value;
    isFound(guess);
});

function isFound(guess) {
    console.log("checking: ", guess);
    fetch("datedle-answers.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const restaurantArray = Object.keys(data).map((name) => ({ name }));

            const answers = new Fuse(restaurantArray, {
                keys: ["name"], // Search by the "name" field
                threshold: 0.3, // Adjust for more/less strict matching
            });

            // fuzzy search should actually be for filtering drop down options shown under input box
            // probably need to change back to list.js LOL
            const results = answers.search(guess);
            const matchedNames = results.map((result) => result.item.name);
            console.log("found: ", matchedNames);
            updateBoard(matchedNames);
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateBoard(matches) {
    const gameContainer = document.getElementById("game-table").querySelector('tbody');

    const correct = 'green';
    const close = 'yellow';
    const wrong = 'red';

    fetch("datedle-answers.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (matches.length > 0) {
                console.log('updating board');
                // get the associated data in json file for the matched answer
                const guessName = data[matches]['name'];
                const guessDateVisited = data[matches]['date visited'];
                const guessNumOfVisits = data[matches]['number of visits'];
                const guessCuisine = data[matches]['cuisine'];

                // need to check against actual answer and adjust each <th> background-color based on proximity of answer



                var guessRow = document.createElement('tr');
                guessRow.id = "game-answers";

                var guessCol1 = document.createElement('th');
                guessCol1.textContent = guessName;
                guessCol1.style.backgroundColor = (guessName === answer) ? correct : wrong;

                var guessCol2 = document.createElement('th');
                guessCol2.textContent = guessDateVisited;
                guessCol2.style.backgroundColor = (guessDateVisited === data[answer]['date visited']) ? correct : wrong;

                var guessCol3 = document.createElement('th');
                guessCol3.textContent = guessNumOfVisits;
                guessCol3.style.backgroundColor = (guessNumOfVisits === data[answer]['number of visits']) ? correct : wrong;

                var guessCol4 = document.createElement('th');
                guessCol4.textContent = guessCuisine;
                guessCol4.style.backgroundColor = (guessCuisine === data[answer]['cuisine']) ? correct : wrong;

                guessRow.appendChild(guessCol1);
                guessRow.appendChild(guessCol2);
                guessRow.appendChild(guessCol3);
                guessRow.appendChild(guessCol4);
                gameContainer.appendChild(guessRow);

            } else {
                console.log('no results found');
                // do nothing, show "no results found"
            }
        })
        .catch((err) => {
            console.log(err);
        });

}