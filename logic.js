// https://kristatian.github.io/plants-for-hire/
// faker faker baby maker --> liar liar plants for hire

function toggleDarkMode() {
    const currentMode = document.getElementById("dark-mode-btn-img").getAttribute("alt");
    console.log(currentMode);
    currentMode === "wakege" ? setTheme("#2e3440", "#eceff4") : setTheme("#eceff4", "#2e3440");
}

function loadTheme() {
    var textColor = sessionStorage.getItem("textColor");
    var backgroundColor = sessionStorage.getItem("backgroundColor");
    setTheme(backgroundColor, textColor);
}

function setTheme(backgroundColour, textColour) {
    const img = document.getElementById("dark-mode-btn-img");
    if (textColour === "#eceff4") {
        img.src = "./assets/bedge.png";
        img.alt = "bedge";
        sessionStorage.setItem("textColor", "#eceff4");
        sessionStorage.setItem("backgroundColor", "#2e3440");
    } else {
        img.src = "./assets/wakege.png";
        img.alt = "wakege";
        sessionStorage.setItem("textColor", "#2e3440");
        sessionStorage.setItem("backgroundColor", "#eceff4");
    }
    // background colour
    document.body.style.backgroundColor = backgroundColour;
    document.body.style.transition = "background-color 0.5s";
    // button colours
    document.getElementById("dark-mode-btn").style.backgroundColor = backgroundColour;
    document.getElementById("dark-mode-btn").style.borderColor = backgroundColour;
    // button colours
    document.getElementById("chat-btn").style.backgroundColor = backgroundColour;
    document.getElementById("chat-btn").style.borderColor = backgroundColour;
    // text colour
    document.getElementById("text").style.color = textColour;
    document.getElementById("text").style.transition = "color 0.5s";
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