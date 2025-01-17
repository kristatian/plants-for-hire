// https://kristatian.github.io/plants-for-hire/

function toggleDarkMode() {
    const currentMode = document.getElementById("dark-mode-btn-img").getAttribute("alt");
    console.log(currentMode);
    currentMode === "wakege" ? setTheme("#2e3440", "#eceff4") : setTheme("#eceff4", "#2e3440");
}

function setTheme(backgroundColour, textColour) {
    const img = document.getElementById("dark-mode-btn-img");
    if (textColour === "#eceff4") {
        img.src = "./assets/bedge.png";
        img.alt = "bedge";
    } else {
        img.src = "./assets/wakege.png";
        img.alt = "wakege";
    }
    // background colour
    document.body.style.backgroundColor = backgroundColour;
    document.body.style.transition = "background-color 0.5s";
    // button colours
    document.getElementById("dark-mode-btn").style.backgroundColor = backgroundColour;
    document.getElementById("dark-mode-btn").style.borderColor = backgroundColour;
    // text colour
    document.getElementById("text").style.color = textColour;
    document.getElementById("text").style.transition = "color 0.5s";
}

function getAdj() {
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

colours = ["#669900", "#99cc33", "#ccee66", "#006699", "#3399cc", "#990066", "#cc3399", '#ff6600', '#ff9900', '#ffcc00'];