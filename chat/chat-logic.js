// https://kristatian.github.io/plants-for-hire/
// faker faker baby maker --> liar liar plants for hire

window.onload = function () {
    const img = document.getElementById("dark-mode-btn-img");
    if (localStorage.getItem("theme") === "light") {
        img.src = "plants-for-hire/assets/wakege.png";
    } else {
        img.src = localStorage.getItem("icon-path");
    }
};

function toggleDarkMode() {
    const img = document.getElementById("dark-mode-btn-img");
    img.src = localStorage.getItem("icon-path");

    // toggle adds class if doesn't exist, removes if exists
    // returns true if added, false if removed
    // documentElement returns root node (:root)
    const isDarkMode = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("icon-path", isDarkMode ? "plants-for-hire/assets/bedge.png" : "plants-for-hire/assets/wakege.png");
    img.src = localStorage.getItem("icon-path");

}

async function generateResponse(message) {
    var chatbox = document.getElementById("chat-box-content");
    const response = await fetch('responses.json');
    const data = await response.json();
    var isFound = false;

    console.log(data);

    let kristaReply = document.createElement("p");
    kristaReply.classList.add('kristaReply');
    kristaReply.classList.add('typewriter');

    let typewriterContainer = document.createElement("div");
    typewriterContainer.classList.add('typewriter-container');


    data.inputs.forEach(input => {
        if (input === message) {
            console.log("found " + input + " at index " + data.inputs.indexOf(message));
            const responseIndex = data.inputs.indexOf(message);
            kristaReply.innerHTML = data.responses[responseIndex];
            chatbox.appendChild(typewriterContainer);
            typewriterContainer.appendChild(kristaReply);
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
    kristaReply.classList.add('typewriter');
    kristaReply.classList.add('kristaReply');

    let typewriterContainer = document.createElement("div");
    typewriterContainer.classList.add('typewriter-container');

    var chatbox = document.getElementById("chat-box-content");
    let bubbleStyle = document.createElement("div");
    bubbleStyle.classList.add("half");
    bubbleStyle.classList.add("light");

    let bubbleBox = document.createElement("div");
    bubbleBox.classList.add("typing-bubble");

    let bubbles1 = document.createElement("span");
    bubbles1.classList.add("circle");
    bubbles1.classList.add("bouncing");

    let bubbles2 = document.createElement("span");
    bubbles2.classList.add("circle");
    bubbles2.classList.add("bouncing");

    let bubbles3 = document.createElement("span");
    bubbles3.classList.add("circle");
    bubbles3.classList.add("bouncing");

    chatbox.appendChild(bubbleStyle);
    bubbleStyle.appendChild(bubbleBox);
    bubbleBox.appendChild(bubbles1);
    bubbleBox.appendChild(bubbles2);
    bubbleBox.appendChild(bubbles3);

    await new Promise(res => setTimeout(res, 2000));

    chatbox.removeChild(bubbleStyle);
    const response = await generateResponse(String(message).toLowerCase());
    console.log(response);
    if (!response) {
        kristaReply.innerHTML = "Me personally, I really like Mr. William";
        chatbox.appendChild(typewriterContainer);
        typewriterContainer.appendChild(kristaReply);

    }
    await new Promise(resolve => {
        setTimeout(() => {
            const elements = document.getElementsByClassName("typewriter");
            for (let element of elements) {
                element.classList.add("done");
            }
            resolve();
        }, 4000);
    });
}