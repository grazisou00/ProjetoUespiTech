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
        question: 'Pergunta 1: Qual estrutura anatômica é frequentemente visualizada como uma sombra radiolúcida na radiografia periapical, localizada acima da coroa dos dentes superiores posteriores?',
        answers: [
            { text: 'Forame mentoniano', correct: false },
            { text: 'Seio maxilar', correct: true },
            { text: 'Canal radicular', correct: false },
            { text: 'Crista alveolar  ', correct: false }
        ]
    },
    {
        question: 'Pergunta 2: Na radiografia periapical, qual é a aparência típica da cortical óssea?',
        answers: [
            { text: 'Radiolúcida', correct: false },
            { text: 'Radiopaca', correct: true },
            { text: 'Heterogênea', correct: false },
            { text: 'Semitransparente  ', correct: false }
        ]
    },
    {
        question: 'Pergunta 3: Nas radiografias periapicais, onde é comum observar o forame mentoniano? ',
        answers: [
            { text: 'Na região dos incisivos inferiores', correct: false },
            { text: 'Na região dos pré-molares inferiores', correct: true },
            { text: 'Na região dos caninos superiores', correct: false },
            { text: 'Na região dos pré-molares superiores  ', correct: false }
        ]

    },
    {
        question: 'Pergunta 4: Qual estrutura anatômica aparece como uma linha radiopaca na radiografia, que representa a junção entre o osso alveolar e o dente?',
        answers: [
            { text: 'Ligamento periodontal', correct: false },
            { text: 'Canal mandibular', correct: false },
            { text: 'Lâmina dura', correct: true },
            { text: 'Forame incisivo', correct: false }
        ]
    },
    {
        question: 'Pergunta 5: Qual estrutura anatômica é comumente visível na radiografia periapical da região anterior da mandíbula?  ',
        answers: [
            { text: 'Forame mentoniano', correct: false },
            { text: 'Fossa pterigóidea', correct: false },
            { text: 'Sutura palatina', correct: false },
            { text: 'Protuberância mentual', correct: true }
        ]
    },
    {
        question: 'Pergunta 6: Na radiografia periapical, a linha que separa a coroa da raiz do dente é conhecida como:',
        answers: [
            { text: 'Margem alveolar', correct: false },
            { text: 'Limite cemento-esmalte  ', correct: true },
            { text: 'Sutura intermaxilar', correct: false },
            { text: 'Borda cortical', correct: false }
        ]
    },
    {
        question: 'Pergunta 7: Qual é a estrutura anatômica que aparece como um espaço radiolúcido entre as raízes de dentes adjacentes em uma radiografia periapical?',
        answers: [
            { text: 'Forame apical', correct: false },
            { text: 'Espaço periodontal', correct: true },
            { text: 'Seio maxilar ', correct: false },
            { text: 'Sutura do palato', correct: false }
        ]
    },
    {
        question: 'Pergunta 8: Qual estrutura anatômica é frequentemente observada na radiografia periapical como uma linha radiolúcida abaixo dos dentes?',
        answers: [
            { text: 'Forame mandibular', correct: false },
            { text: 'Sínfise mentoniana', correct: false },
            { text: 'Canal mandibular', correct: true },
            { text: 'Cortical óssea', correct: false }
        ]
    },
    {
        question: 'Pergunta 9: Em uma radiografia periapical, qual é a aparência típica da polpa dental?',
        answers: [
            { text: 'Radiolúcida', correct: true },
            { text: 'Radiopaca', correct: false },
            { text: 'Não visível', correct: false },
            { text: 'Radiotransparente', correct: false }
        ]
    },
    {
        question: 'Pergunta 10: Qual das seguintes estruturas é geralmente radiopaca e pode ser visualizada na radiografia periapical?',
        answers: [
            { text: 'Dentina', correct: true },
            { text: 'Tecido gengival', correct: false },
            { text: 'Forame mentoniano', correct: false },
            { text: 'Sulco vestibular', correct: false }
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
    score = 0;  
    incorrectQuestions = [];
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    
    if (question.statements) {
        questionElement.innerText = question.question;
        question.statements.forEach((statement, index) => {
            const statementElement = document.createElement('div');
            statementElement.innerText = statement;
            questionElement.appendChild(statementElement);
        });

        question.answers.forEach((answer, index) => {
            const container = document.createElement('div');
            container.classList.add('option-container');

            const button = document.createElement('button');
            button.innerText = String.fromCharCode(65 + index); 
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

        
    } else if (question.items && question.options) {
        questionElement.innerText = question.question;

       
        question.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerText = `${index + 1}. ${item}`;
            questionElement.appendChild(itemElement);
        });

        
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.innerText = `( ) ${option}`;
            optionsContainer.appendChild(optionElement);
        });
        questionElement.appendChild(optionsContainer);


        question.answers.forEach((answer, index) => {
            const container = document.createElement('div');
            container.classList.add('option-container');

            const button = document.createElement('button');
            button.innerText = String.fromCharCode(65 + index); 
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

    } else {
    
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
    resetState(); 
    if (question.statements) {
        questionElement.innerText = question.question;
        question.statements.forEach((statement, index) => {
            const statementElement = document.createElement('div');
            statementElement.innerText = statement;
            questionElement.appendChild(statementElement);
        });

        question.answers.forEach((answer, index) => {
            const container = document.createElement('div');
            container.classList.add('option-container');

            const button = document.createElement('button');
            button.innerText = String.fromCharCode(65 + index); 
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

       
    } else if (question.items && question.options) {
        questionElement.innerText = question.question;

       
        question.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerText = `${index + 1}. ${item}`;
            questionElement.appendChild(itemElement);
        });

        
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.innerText = `( ) ${option}`;
            optionsContainer.appendChild(optionElement);
        });
        questionElement.appendChild(optionsContainer);

       
        question.answers.forEach((answer, index) => {
            const container = document.createElement('div');
            container.classList.add('option-container');

            const button = document.createElement('button');
            button.innerText = String.fromCharCode(65 + index); 
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

      
    } else {
        questionElement.innerText = question.question;
        question.answers.forEach((answer, index) => {
            const container = document.createElement('div');
            container.classList.add('option-container');

            const button = document.createElement('button');
            button.innerText = String.fromCharCode(65 + index); 
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
    score = 0; 
    scoreContainer.classList.add('hide');
    startButton.classList.remove('hide');
    restartButton.classList.add('hide');
}
