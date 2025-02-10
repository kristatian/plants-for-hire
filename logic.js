// https://kristatian.github.io/plants-for-hire/
// faker faker baby maker --> liar liar plants for hire

window.onload = function () {
    const img = document.getElementById("dark-mode-btn-img");

    console.log("theme is: " + localStorage.getItem("theme"))
    if (localStorage.getItem("theme") === "light") {
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
    localStorage.setItem("icon-path", isDarkMode ? "assets/bedge.png" : "assets/wakege.png");
    img.src = localStorage.getItem("icon-path");
}

function getAdj() {
    colours = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", '#e27396', '#ff4800', '#86bbd8', '#9bc53d', '#a06cd5'];

    fetch('lovely.json').then(response => {
        return response.json();
    }).then(data => {
        console.log(data);

        let adj = data.terms;
        const randomIndex = Math.floor(Math.random() * adj.length);
        const randomColour = Math.floor(Math.random() * colours.length);

        console.log("picked: " + adj[randomIndex]);

        document.getElementById("adj-to-replace").innerHTML = adj[randomIndex];
        document.getElementById("adj-to-replace").style.color = colours[randomColour];
    }).catch(err => {
        console.log(err);
    });
}