// Questions in json format 

const questions = [
    {
        question: "1. What does HTML stand for ?",
        options: ["Hyper text markup language", "High text machine language", "Hyperlink and text mark language"],
        answer: 0
    },
    {
        question: "2. Which is the correct css syntax ?",
        options: ["{body:color=black;}", "body {color: black;}", "{body;color:black;}"],
        answer: 1
    },
    {
        question: "3.  Inside which element do we put javascript",
        options: ["&lt;js&gt", "&lt;script&gt", "&lt;javascript&gt"],
        answer: 1
    },
    {
        question: "4. what is React ? ",
        options: ["Library", "framework", "both"],
        answer: 0
    },
    {
        question: "Which tech company developed React ?",
        options: ["Google", "Microsoft", "Facebook"],
        answer: 2
    }


];

// Shuffle questions for random order
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}
const quizData = shuffle(questions);
let currentQ = 0;
let score = 0;

const quizDiv = document.getElementById("quiz");
const progress = document.querySelector(".progress");
const nextButton = document.getElementById("nextButton");
const resultDiv = document.getElementById("result");
const highScoreDiv = document.getElementById("highScore");
const themeToggle = document.getElementById("themeToggle")

// Load high score from localStorage 
let highScore = localStorage.getItem("highScore") || 0;
highScoreDiv.innerText = `🏆 High Score: ${highScore}`;


function loadQuestion() {
    let q = quizData[currentQ];
    quizDiv.innerHTML = `
<p>${q.question}</p>
<div class= "options">
${q.options.map((opt, i) => `
    <label>
    <input type= "radio" name="option" value="${i}" >${opt}
    </label>
    `).join("")}
    </div>
`;
    updateProgress();
}

function updateProgress() {
    let percent = ((currentQ + 1) / quizData.length) * 100;
    progress.style.width = percent + "%";
}

nextButton.addEventListener("click", () => {
    let selected = document.querySelector('input[name ="option"]:checked');
    if (!selected) {
        alert("please select an option!");
        return;
    }
    if (parseInt(selected.value) === quizData[currentQ].answer) {
        score++;
    }

    currentQ++;

    if (currentQ < quizData.length) {
        loadQuestion();
    } else {
        quizDiv.innerHTML = "";
        nextButton.style.display = "none";
        progress.style.width = "100%";
        resultDiv.innerHTML = `✅ You scored ${score}/${quizData.length}`;

        // update High score
        if (score > highScore) {
            localStorage.setItem("highScore", score);
            highScoreDiv.innerText = `🏆 High Score: ${score} (!New)`;

        }
    }
});


// Dark mode toggle
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "🌙 Dark Mode";
    }
}

//Load saved theme
let savedTheme = localStorage.getItem("theme") || "Light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    let newTheme = document.body.classList.contains("dark") ? "Light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});


// load first question

loadQuestion();
