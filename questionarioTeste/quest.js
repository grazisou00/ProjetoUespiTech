const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const retryButton = document.getElementById('retry-button');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;
let incorrectQuestions = [];
let questionsToRetry = [];

const questions = [
    {
        question: 'Pergunta 1: Qual é a capital da França?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'Londres', correct: false },
            { text: 'Roma', correct: false },
            { text: 'Berlim', correct: false }
        ]
    },
    {
        question: 'Pergunta 2: Quem pintou a Mona Lisa?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Claude Monet', correct: false }
        ]
    },
    {
        question: 'Pergunta 3: Qual é a fórmula química da água?',
        answers: [
            { text: 'H2O', correct: true },
            { text: 'CO2', correct: false },
            { text: 'NaCl', correct: false },
            { text: 'O2', correct: false }
        ]
    },
    {
        question: 'Pergunta 4: Em que ano o homem pisou na Lua pela primeira vez?',
        answers: [
            { text: '1969', correct: true },
            { text: '1959', correct: false },
            { text: '1979', correct: false },
            { text: '1989', correct: false }
        ]
    },
    {
        question: 'Pergunta 5: Qual é o maior planeta do sistema solar?',
        answers: [
            { text: 'Júpiter', correct: true },
            { text: 'Saturno', correct: false },
            { text: 'Terra', correct: false },
            { text: 'Marte', correct: false }
        ]
    },
    {
        question: 'Pergunta 6: Quem escreveu "Dom Quixote"?',
        answers: [
            { text: 'Miguel de Cervantes', correct: true },
            { text: 'William Shakespeare', correct: false },
            { text: 'Gabriel García Márquez', correct: false },
            { text: 'Jorge Luis Borges', correct: false }
        ]
    },
    {
        question: 'Pergunta 7: Qual é o elemento químico representado pelo símbolo "O"?',
        answers: [
            { text: 'Oxigênio', correct: true },
            { text: 'Ouro', correct: false },
            { text: 'Prata', correct: false },
            { text: 'Cálcio', correct: false }
        ]
    },
    {
        question: 'Pergunta 8: Qual é o animal terrestre mais rápido do mundo?',
        answers: [
            { text: 'Guepardo', correct: true },
            { text: 'Leão', correct: false },
            { text: 'Tigre', correct: false },
            { text: 'Leopardo', correct: false }
        ]
    },
    {
        question: 'Pergunta 9: Em que continente fica o Egito?',
        answers: [
            { text: 'África', correct: true },
            { text: 'Ásia', correct: false },
            { text: 'Europa', correct: false },
            { text: 'América do Sul', correct: false }
        ]
    },
    {
        question: 'Pergunta 10: Quem desenvolveu a teoria da relatividade?',
        answers: [
            { text: 'Albert Einstein', correct: true },
            { text: 'Isaac Newton', correct: false },
            { text: 'Galileu Galilei', correct: false },
            { text: 'Niels Bohr', correct: false }
        ]
    }

];

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', retryIncorrectQuestions);
restartButton.addEventListener('click', restartGame);

function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;  // Reiniciar o score ao começar o jogo
    incorrectQuestions = [];
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const container = document.createElement('div');
        container.classList.add('option-container');

        const button = document.createElement('button');
        button.innerText = String.fromCharCode(65 + index); // A, B, C, D
        button.classList.add('option-button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

        const text = document.createElement('span');
        text.innerText = answer.text;
        text.classList.add('option-text');

        container.appendChild(button);
        container.appendChild(text);
        answerButtons.appendChild(container);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct) {
        score++;
    } else {
        incorrectQuestions.push(questions[currentQuestionIndex]);
    }
    Array.from(answerButtons.children).forEach(button => {
        button.firstChild.disabled = true;
    });
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(setNextQuestion, 1000);
    } else {
        setTimeout(showScore, 1000);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Pontuação: ${score}/${questions.length}`;
    retryButton.classList.remove('hide');
    restartButton.classList.remove('hide');
}

function retryIncorrectQuestions() {
    if (incorrectQuestions.length === 0) {
        scoreContainer.classList.add('hide');
        startButton.classList.remove('hide');
        return;
    }
    questionContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    questionsToRetry = [...incorrectQuestions];
    incorrectQuestions = [];
    currentQuestionIndex = 0;
    setNextRetryQuestion();
}

function setNextRetryQuestion() {
    resetState();
    showRetryQuestion(questionsToRetry[currentQuestionIndex]);
}

function showRetryQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const container = document.createElement('div');
        container.classList.add('option-container');

        const button = document.createElement('button');
        button.innerText = String.fromCharCode(65 + index); // A, B, C, D
        button.classList.add('option-button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectRetryAnswer);

        const text = document.createElement('span');
        text.innerText = answer.text;
        text.classList.add('option-text');

        container.appendChild(button);
        container.appendChild(text);
        answerButtons.appendChild(container);
    });
}

function selectRetryAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct) {
        score++;
    } else {
        incorrectQuestions.push(questionsToRetry[currentQuestionIndex]);
    }
    Array.from(answerButtons.children).forEach(button => {
        button.firstChild.disabled = true;
    });
    if (questionsToRetry.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(setNextRetryQuestion, 1000);
    } else {
        setTimeout(showScore, 1000);
    }
}

function restartGame() {
    score = 0; // Reiniciar o score ao reiniciar o jogo
    scoreContainer.classList.add('hide');
    startButton.classList.remove('hide');
    restartButton.classList.add('hide');
}
