let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let currentQuestionIndex = 0;
const questions = [
    {
        question: "Which subatomic particle is responsible for carrying a negative charge?",
        options: ["Proton", "Neutron", "Electron", "Positron"],
        correctIndex: 2 // Index of correct option in the options array
    },
    {
        question: "What is the primary function of chlorophyll in photosynthesis?",
        options: ["Absorbing carbon dioxide", "Absorbing sunlight", "Absorbing water", "Absorbing oxygen"],
        correctIndex: 1
    },
    {
        question: "Which of the following is NOT a greenhouse gas?",
        options: ["Carbon dioxide", "Methane", "Nitrogen", "Water vapor"],
        correctIndex: 2
    },
    {
        question: "What is the unit of electrical resistance?",
        options: ["Ampere", "Watt", "Ohm", "Volt"],
        correctIndex: 2
    },
    {
        question: "What is the process by which a solid changes directly into a gas called?",
        options: ["Melting", "Freezing", "Sublimation", "Condensation"],
        correctIndex: 2
    },
    {
        question: "Which planet in our solar system has the largest number of moons?",
        options: ["Mars", "Earth", "Jupiter", "Saturn"],
        correctIndex: 2
    },
    {
        question: "What is the fundamental unit of life?",
        options: ["Cell", "Atom", "Molecule", "Organism"],
        correctIndex: 0
    }
];

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz-forms').style.display = 'block';
    document.getElementById('progress-bar').style.display = 'block'; // Show the progress bar
    showNextQuestion();
    startTimer();
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (seconds >=10) {
            clearInterval(timerInterval);
            showResult();
            return;
        }
    }
    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    document.getElementById("timer").innerText = formattedTime;
}

function pad(num) {
    return (num < 10) ? "0" + num : num;
}

function showResult() {
    clearInterval(timerInterval);
    const timeSpent = document.getElementById("timer").innerText;
    const resultDiv = document.getElementById("resultat");
    resultDiv.innerHTML = `<h1>Results</h1>
                         <p>Time Spent: ${timeSpent}</p>
                         <p>Right Answers: ${rightAnswers}</p>
                         <p>Wrong Answers: ${wrongAnswers}</p>`;
    resultDiv.classList.remove("hidden");

    // Hide quiz forms and progress bar
    document.getElementById('quiz-forms').style.display = 'none';
    document.getElementById('progress-bar').style.display = 'none';
    document.getElementById('resultat').style.display = 'block';
}

function showNextQuestion() {
    const quizForms = document.getElementById("quiz-forms");
    const question = questions[currentQuestionIndex];
    const formHTML = `
        <div id="form${currentQuestionIndex}">
            <h1>${question.question}</h1>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="obj" onclick="handleAnswer(${index})">
                        <h4>${option}</h4>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    quizForms.innerHTML = formHTML;
    updateProgress(currentQuestionIndex);
}

function updateProgress(currentQuestion) {
    const totalQuestions = questions.length;
    let progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById("progress").style.width = progressPercentage + "%";
}

window.onload = function() {
    const quizForms = document.getElementById("quiz-forms");
    const firstQuestion = questions[0];
    const formHTML = `
        <div id="form0">
            <h1>${firstQuestion.question}</h1>
            <div class="options">
                ${firstQuestion.options.map((option, index) => `
                    <div class="obj" onclick="handleAnswer(0, ${index})">
                        <h4>${option}</h4>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    quizForms.innerHTML = formHTML;
    updateProgress(0);
};

function handleAnswer(selectedOptionIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedOptionIndex === question.correctIndex) {
        rightAnswers++; // Increment rightAnswers if the selected option is correct
    } else {
        wrongAnswers++; // Increment wrongAnswers if the selected option is incorrect
    }
    
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        showNextQuestion(); // Show the next question
    } else {
        clearInterval(timerInterval);
        showResult(); // Show the result if all questions have been answered
    }
}

