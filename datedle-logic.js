// https://kristatian.github.io/plants-for-hire/

window.onload = function () {
  const img = document.getElementById("dark-mode-btn-img");

  if (localStorage.getItem("theme") === null) {
    img.src = "assets/wakege.png";
  } else {
    img.src = localStorage.getItem("icon-path");
  }
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

var currentPicture = "";

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var guess = document.getElementById("guess-input").value;
  checkGuess(guess);
});

function checkGuess(guess) {
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
      updateBoard(matchedNames);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateBoard(matches) {
  if (matches.length > 0) {
    console.log('updating board');
    // get the associated data in json file for the matched answer

    // need to check against actual answer and adjust each <th> background-color based on proximity of answer

    // create and push new <th> to table list
  } else {
    console.log('no results found');
    // do nothing, show "no results found"
  }
}