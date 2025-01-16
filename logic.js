
function toggleDarkMode() {
    const currentMode = document.getElementById("dark-mode-btn-img").getAttribute("alt");
    console.log(currentMode);
    currentMode === "wakege" ? setDarkMode() : setLightMode();
}

function setDarkMode() {
    const img = document.getElementById("dark-mode-btn-img");
    img.src = "./assets/bedge.png";
    img.alt = "bedge";
    document.body.style.backgroundColor = "#2e3440";
    document.getElementById("dark-mode-btn").style.backgroundColor = "#2e3440";
    document.getElementById("text").style.color = "#eceff4";
}

function setLightMode() {
    const img = document.getElementById("dark-mode-btn-img");
    img.src = "./assets/wakege.png";
    img.alt = "wakege";
    document.body.style.backgroundColor = "#eceff4";
    document.getElementById("dark-mode-btn").style.backgroundColor = "#eceff4";
    document.getElementById("text").style.color = "#2e3440";
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