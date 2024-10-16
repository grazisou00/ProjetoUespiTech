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
        question: 'Pergunta 1: São estruturas anatômicas cujas imagens podem se sobrepor aos molares inferiores em radiografias periapicais',
        answers: [
            { text: 'A linha milo-hióidea, o canal mandibular e a linha oblíqua.', correct: true },
            { text: 'O osso hioide, a linha milo-hióidea e o canal mandibular.', correct: false },
            { text: 'O ducto da glândula submandibular, o osso hioide e a linha oblíqua.', correct: false },
            { text: 'O canal mandibular, o ducto da glândula submandibular e o osso hioide.', correct: false }
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
        question: 'Pergunta 3: Qual estrutura anatômica é frequentemente confundida com uma lesão patológica em radiografias periapicais devido à sua aparência radiolúcida? ',
        answers: [
            { text: 'Osso esponjoso', correct: false },
            { text: 'Cisto', correct: false },
            { text: 'Saco periradicular', correct: true },
            { text: 'Dente impactado', correct: false }
        ]
    },
    {
        question: 'Pergunta 4: Pequenos pontos radiopacos, equidistantes entre a borda superior e inferior da mandíbula, que podem ser visualizados nas radiografias periapicais dos incisivos inferiores, abaixo do ápice dos incisivos, próximos à linha média, são denominados',
        answers: [
            { text: 'Foramina Lingual', correct: false },
            { text: 'Espinha Geniana', correct: true },
            { text: 'Protuberância Mentual', correct: false },
            { text: 'Espinha milo-hioídea', correct: false }
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
        question: 'Pergunta 7: Quanto à anatomia radiográfica da maxila em radiografias periapicais, assinale a alternativa que representa o reparo anatômico que é visualizado como uma imagem radiopaca de contornos nítidos, forma triangular, com base inferior e vértice supero- -anterior geralmente superposto à tuberosidade da maxila em posições diversas, às vezes chegando a prejudicar a interpretação radiográfica, principalmente do terceiro molar superior',
        answers: [
            { text: 'Fosseta Mirtiforme', correct: false },
            { text: 'Hámulo Pterigóideo', correct: true },
            { text: 'Processo Coronoide da Mandíbula', correct: false },
            { text: 'Processo Zigomático da Maxila', correct: false }
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
        question: 'Pergunta 9: São estruturas  anatômicas observadas nas radiografias de mandíbula:',
        answers: [
            { text: 'Fosseta mirtiforme; linha milo-hioídea; base da mandíbula;  forame mental.', correct: false },
            { text: 'tubérculo geni; processo zingomático; foramina lingual; forame mentual.', correct: false },
            { text: 'base da mandíbula; hámulo piterigoídeo; processo coronóide da mandíbula; canais nutrícios.', correct: false },
            { text: 'Protuberância mental; canais nutrícios; forame mentual; linha obliqua externa.', correct: true }
        ]
    },
    {
        question: 'Pergunta 10: São estruturas  anatômicas observadas nas radiografias de maxila:',
        answers: [
            { text: 'Fosseta mirtiforme; tabiques nasais; tuberosidade da maxila;  forame mental.', correct: false },
            { text: 'seio maxilar; processo zingomático; foramina lingual; Y invertido de Ennis.', correct: false },
            { text: 'fosseta mirtiforme; hámulo piterigoídeo; processo coronóide da mandíbula;  canais nutrícios.', correct: true },
            { text: 'Protuberância mental; seio maxilar; processo zingomático;  espinha nasal anterior.', correct: false }
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
    // Verificar se a pergunta tem statements e correctSequence (Pergunta 8)
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

        // Verificar se a pergunta tem items e options (Pergunta 9)
    } else if (question.items && question.options) {
        questionElement.innerText = question.question;

        // Adicionar itens (imagens radiográficas descritas)
        question.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerText = `${index + 1}. ${item}`;
            questionElement.appendChild(itemElement);
        });

        // Adicionar opções (estruturas anatômicas)
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.innerText = `( ) ${option}`;
            optionsContainer.appendChild(optionElement);
        });
        questionElement.appendChild(optionsContainer);

        // Adicionar botões de resposta
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

    } else {
        // Caso seja uma pergunta padrão
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
    resetState(); // Reseta o estado, como limpar as opções de resposta anteriores

    // Verificar se a pergunta tem statements e correctSequence (Pergunta 8)
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

        // Verificar se a pergunta tem items e options (Pergunta 9)
    } else if (question.items && question.options) {
        questionElement.innerText = question.question;

        // Adicionar itens
        question.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerText = `${index + 1}. ${item}`;
            questionElement.appendChild(itemElement);
        });

        // Adicionar opções
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.innerText = `( ) ${option}`;
            optionsContainer.appendChild(optionElement);
        });
        questionElement.appendChild(optionsContainer);

        // Adicionar botões de resposta
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

        // Caso seja uma pergunta padrão (sem statements ou items)
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
    score = 0; // Reiniciar o score ao reiniciar o jogo
    scoreContainer.classList.add('hide');
    startButton.classList.remove('hide');
    restartButton.classList.add('hide');
}
