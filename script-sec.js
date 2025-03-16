const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("option"));
const questionNumber = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer;

let questions = [
    {
        question: "Which language runs in a web browser?",
        choice1: "Java",
        choice2: "C",
        choice3: "Python",
        choice4: "Javascript",
        answer: 4
    },
    {
        question: "What does CSS stand for?",
        choice1: "Central Style Sheets",
        choice2: "Cascading Style Sheets",
        choice3: "Cascading Simple Sheets",
        choice4: "Cars SUVs Sailboats",
        answer: 2
    },
    {
        question: "What does HTML stand for?",
        choice1: "Hypertext Markup Language",
        choice2: "Hypertext Markdown Language",
        choice3: "Hyperloop Machine Language",
        choice4: "Helicopters Terminals Motorboats Lamborghinis",
        answer: 1
    },
    {
        question: "What year was JavaScript launched?",
        choice1: "1996",
        choice2: "1995",
        choice3: "1994",
        choice4: "none of the above",
        answer: 2
    },
    {  
        question: "Who is the current HOD of Comp Science, UNN?",
        choice1: "Prof. Udanor",
        choice2: "Dr. Greg",
        choice3: "Prof. Bakpo",
        choice4: "Dr. Okoronkwo",
        answer: 1
    }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
const TIMER_LIMIT = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }

    questionCounter++;
    questionNumber.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    startTimer(); // Start the timer when a new question is loaded
};

startTimer = () => {
    let timeLeft = TIMER_LIMIT;
    timerText.innerText = `Time left: ${timeLeft}s`; // Display the initial timer value

    // Clear any existing timers to avoid multiple timers running simultaneously
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = `Time left: ${timeLeft}s`; // Update the displayed time

        if (timeLeft <= 0) {
            clearInterval(timer);
            acceptingAnswers = false; // Stop accepting answers after time runs out
            getNewQuestion(); // Go to the next question or end the game
        }
    }, 1000);
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score+= num;
    scoreText.innerText = score;
};

startGame();
