// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    }
];

// DOM Elements
const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quiz-screen');
const resultScreen = document.querySelector('.result-screen');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const progressBar = document.querySelector('.progress');
const resultMessage = document.querySelector('.result-message');

// Quiz Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let selectedOption = null;

// Start Quiz
document.querySelector('.start-btn').addEventListener('click', () => {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
    startTimer();
});

// Load Question
function loadQuestion() {
    if (currentQuestion < quizData.length) {
        const question = quizData[currentQuestion];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(button);
        });

        // Update progress bar
        progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
    } else {
        showResult();
    }
}

// Select Option
function selectOption(index) {
    if (selectedOption !== null) return;
    
    selectedOption = index;
    const options = document.querySelectorAll('.option');
    const correctIndex = quizData[currentQuestion].correct;
    
    options.forEach((option, i) => {
        if (i === correctIndex) {
            option.classList.add('correct');
        } else if (i === index && i !== correctIndex) {
            option.classList.add('wrong');
        }
    });

    if (index === correctIndex) {
        score++;
        scoreElement.textContent = score;
    }

    setTimeout(() => {
        currentQuestion++;
        selectedOption = null;
        loadQuestion();
    }, 1000);
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            loadQuestion();
            timeLeft = 30;
        }
    }, 1000);
}

// Show Result
function showResult() {
    clearInterval(timer);
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScoreElement.textContent = score;
    
    // Animate score ring
    const scoreRing = document.querySelector('.score-ring');
    const percentage = (score / quizData.length) * 100;
    scoreRing.style.borderTopColor = getScoreColor(percentage);
    
    // Set result message
    if (percentage >= 80) {
        resultMessage.textContent = "Excellent! You're a quiz master!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good job! You know your stuff!";
    } else {
        resultMessage.textContent = "Keep practicing! You'll get better!";
    }
}

// Get Score Color
function getScoreColor(percentage) {
    if (percentage >= 80) return '#00ff88';
    if (percentage >= 60) return '#ffd700';
    return '#ff3d71';
}

// Restart Quiz
document.querySelector('.restart-btn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = '0';
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
});

// Button Particle Effect
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add particle effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createParticle(x, y);
    });
}); 