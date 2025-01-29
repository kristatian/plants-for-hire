// https://kristatian.github.io/plants-for-hire/
// faker faker baby maker --> liar liar plants for hire

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
    if (backgroundColour == "#2e3440") {
        document.getElementById("chat-box").style.backgroundColor = "#1d1d1d";
        document.getElementById("chat-box").style.transition = "background-color 0.5s";
    } else {
        document.getElementById("chat-box").style.backgroundColor = "#ffffff";
        document.getElementById("chat-box").style.transition = "background-color 0.5s";
    }
    // button colours
    document.getElementById("dark-mode-btn").style.backgroundColor = backgroundColour;
    document.getElementById("dark-mode-btn").style.borderColor = backgroundColour;
    // button colours
    document.getElementById("home-btn").style.backgroundColor = backgroundColour;
    document.getElementById("home-btn").style.borderColor = backgroundColour;
    // text colour
    document.getElementById("text").style.color = textColour;
    document.getElementById("text").style.transition = "color 0.5s";
}

async function generateResponse(message) {
    const response = await fetch('responses.json');
    const data = await response.json();
    var isFound = false;

    console.log(data);
    var chatbox = document.getElementById("chat-box-content");
    let kristaReply = document.createElement("p");
    kristaReply.classList.add('kristaReply');

    data.inputs.forEach(input => {
        if (input === message) {
            console.log("found " + input + " at index " + data.inputs.indexOf(message));
            const responseIndex = data.inputs.indexOf(message);
            kristaReply.innerHTML = data.responses[responseIndex];
            chatbox.appendChild(kristaReply);
            isFound = true;
        }
    })
    return isFound;
}

async function sendMessage() {
    const message = document.getElementById("chat-input").value;
    var chatbox = document.getElementById("chat-box-content");

    let userInput = document.createElement("p");
    userInput.classList.add('userInput');
    userInput.innerHTML = message;
    chatbox.appendChild(userInput);

    let kristaReply = document.createElement("p");
    kristaReply.classList.add('kristaReply');

    const response = await generateResponse(message);
    console.log(response);
    if (!response) {
        kristaReply.innerHTML = "Me personally, I really like Mr. William";
        chatbox.appendChild(kristaReply);
    }
}