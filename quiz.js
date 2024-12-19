import { database, ref, onValue, update } from './firebase-config.js';

// Variables
var quizContent = document.getElementById("quiz-content");
var submitBtn = document.getElementById("submit-btn");
var resultContainer = document.getElementById("result");
var scoreElement = document.getElementById("score");

// Example quiz questions
var quizQuestions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5"],
        correctAnswer: "4",
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter"],
        correctAnswer: "Mars",
    }
];

// Initialize user answers to null for each question
var userAnswers = new Array(quizQuestions.length).fill(null);

loadAllQuestions();



function loadAllQuestions() {
    let quizHTML = "";

    quizQuestions.forEach((questionObj, index) => {
        quizHTML += `
            <div class="question-container">
                <h3>${index + 1}. ${questionObj.question}</h3>
                <div class="options" id="options-${index}">
        `;
        questionObj.options.forEach((option, optIndex) => {
            quizHTML += `
                <label>
                    <input type="radio" name="question-${index}" value="${option}" class="option-input">
                    <span class="option">${option}</span>
                </label>
            `;
        });
        quizHTML += `</div></div>`;
    });

    quizContent.innerHTML = quizHTML;

    // Add event listeners to inputs
    quizQuestions.forEach((questionObj, index) => {
        const optionInputs = document.querySelectorAll(`input[name="question-${index}"]`);
        optionInputs.forEach((input) => {
            input.addEventListener("change", (event) => selectAnswer(index, event.target.value));
        });
    });
}

// Handle answer selection
function selectAnswer(questionIndex, selectedOption) {
    console.log(`Question ${questionIndex}, Selected Option: ${selectedOption}`);

    userAnswers[questionIndex] = selectedOption;
    console.log("Current userAnswers:", userAnswers);

    var optionsDiv = document.getElementById(`options-${questionIndex}`);
    var buttons = optionsDiv.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
    buttons.forEach((btn) => {
        console.log("Checking button:", btn.textContent);
        if (btn.textContent.trim() === selectedOption.trim()) {
            btn.classList.add("selected");
        }
    });
}

// Calculate score and save result to Firebase
function calculateScore() {
    let score = 0;

    quizQuestions.forEach((question, i) => {
        if (userAnswers[i] === question.correctAnswer) {
            score++;
        }
    });

    // Save result to Firebase
    const userResultsRef = ref(database, "userResults");
    const result = {
        score: score,
        total: quizQuestions.length,
        answers: userAnswers,
    };
    update(userResultsRef, { [Date.now()]: result });

    // Display result
    quizContent.style.display = "none";
    submitBtn.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = `${score} / ${quizQuestions.length}`;
}

// Submit button event listener
submitBtn.addEventListener("click", calculateScore);
