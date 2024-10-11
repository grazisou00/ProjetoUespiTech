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
        question: 'Pergunta 1: Qual é a posição normal do forame mentoniano em relação aos dentes anteriores inferiores na radiografia periapical? ',
        answers: [
            { text: 'Anterior ao incisivo central', correct: false },
            { text: 'Posterior ao canino', correct: true },
            { text: 'Abaixo do segundo molar', correct: false },
            { text: 'Acima do primeiro molar', correct: false }
        ]
    },
    {
        question: 'Pergunta 2: Em uma radiografia periapical, qual área corresponde ao tecido ósseo que suporta o dente? ',
        answers: [
            { text: 'Saco periodontal', correct: false },
            { text: 'Osso alveolar', correct: true },
            { text: 'Coroa dentária', correct: false },
            { text: 'Cavidade pulpar', correct: false }
        ]
    },
    {
        question: 'Pergunta 3: Qual estrutura anatômica é frequentemente confundida com uma lesão patológica em radiografias periapicais devido à sua aparência radiolúcida? ',
        answers: [
            { text: 'Osso esponjoso', correct: false },
            { text: 'Cisto', correct: false },
            { text: 'Saco periradicular', correct: true },
            { text: 'Dente impactado', correct: false }
        ]

    },
    {
        question: 'Pergunta 4: Na análise de uma radiografia periapical de um molar superior, você nota uma sombra radiopaca na área do forame apical. Que estrutura pode estar representada? Escolha a alternativa correta:',
        answers: [
            { text: 'Nervo dental', correct: false },
            { text: 'Vasos sanguíneos', correct: false },
            { text: 'Cemento radicular', correct: false },
            { text: 'Osso alveolar', correct: true }
        ]
    },
    {
        question: 'Pergunta 5: Sobre a lâmina dura, considere as afirmações: ',
        statements: [
            'Escolha V ou F para cada afirmação:',
            '(  ) A lâmina dura é uma linha radiopaca que delimita a raiz do dente.',
            '(  ) Ela é frequentemente confundida com o cemento radicular.',
            '(  ) A lâmina dura está presente apenas em dentes com cáries.'
        ],
        answers: [
            { text: 'VVF', correct: false },
            { text: 'VFV', correct: false },
            { text: 'VFF', correct: true },
            { text: 'VVV', correct: false }
        ]
    },
    {
        question: 'Pergunta 6: Referente ao canal radicular, analise as seguintes afirmações: ',
        statements: [
            '(  ) O canal radicular é visualizado como uma área radiolúcida.',
            '(  ) Ele contém os nervos e vasos sanguíneos que irrigam o dente.',
            '(  ) O canal radicular aparece radiopaco devido à presença de tecido mineralizado.',
            'Escolha V ou F para cada afirmação:',
        ],
        answers: [
            { text: 'VVF', correct: true },
            { text: 'VFV', correct: false },
            { text: 'VFF', correct: false },
            { text: 'VVV', correct: false }
        ]
    },
    {
        question: 'Pergunta 7: Considere as afirmações sobre o osso alveolar: ',
        statements: [
            '(  ) O osso alveolar suporta as raízes dos dentes e aparece radiopaco.',
            '(  ) A densidade do osso alveolar pode aumentar em resposta a infecções.',
            '(  ) O osso alveolar é menos evidente em dentes perdidos.',
            'Escolha V ou F para cada afirmação:',
        ],
        answers: [
            { text: 'VVF', correct: false },
            { text: 'VFV', correct: false },
            { text: 'VFF', correct: false },
            { text: 'VVV', correct: true }
        ]
    },
    {
        question: 'Pergunta 8: Sobre os seios maxilares, considere as afirmações:',
        statements: [
            '(  ) Os seios maxilares são cavidades aéreas localizadas dentro da maxila.',
            '(  ) Eles aparecem radiopacos em radiografias periapicais.',
            '(  ) A presença de um dente impactado pode causar alterações na forma dos seios maxilares.',
            'Escolha V ou F para cada afirmação:',
        ],
        answers: [
            { text: 'VVF', correct: false },
            { text: 'VFV', correct: true },
            { text: 'VFF', correct: false },
            { text: 'VVV', correct: false }
        ]
    },
    {
        question: 'Pergunta 9: São estruturas  anatômicas observadas nas radiografias de mandíbula:',
        answers: [
            { text: 'Fosseta mirtiforme; linha milo-hioídea; base da mandíbula;  forame mental.', correct: false },
            { text: 'tubérculo geni; processo zingomático; foramina lingual; forame mentual.', correct: false },
            { text: 'base da mandíbula; hámulo piterigoídeo; processo coronóide da mandíbula; canais nutrícios.', correct: false },
            { text: 'Protuberância mental; canais nutrícios; forame mentual; linha obliqua externa.', correct: true }
        ]
    },
    {
        question: 'Pergunta 10:Em uma radiografia periapical, como o septo nasal geralmente aparece? ',
        answers: [
            { text: 'Radiopaco', correct: true },
            { text: 'Radiolucente', correct: false },
            { text: 'Iso-radiantes', correct: false },
            { text: 'Heterogêneo', correct: false }
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
