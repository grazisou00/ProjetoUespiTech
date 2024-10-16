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
        question: 'Pergunta 2: Em uma radiografia periapical, qual área corresponde ao tecido ósseo que suporta o dente? ',
        answers: [
            { text: 'Saco periodontal', correct: false },
            { text: 'Osso alveolar', correct: true },
            { text: 'Coroa dentária', correct: false },
            { text: 'Cavidade pulpar', correct: false }
        ]
    },
    {
        question: 'Pergunta 3: Quanto à anatomia radiográfica da maxila em radiografias periapicais, assinale a alternativa que representa o reparo anatômico que é visualizado como uma imagem radiopaca de contornos nítidos, forma triangular, com base inferior e vértice súpero-anterior geralmente superposto à tuberosidade da maxila em posições diversas, às vezes chegando a prejudicar a interpretação radiográfica, principalmente do terceiro molar superior.',
        answers: [
            { text: 'Fosseta Mirtiforme', correct: false },
            { text: 'Hámulo Pterigóideo', correct: false },
            { text: 'Processo Coronoide da Mandíbula', correct: true },
            { text: 'Processo Zigomático da Maxila', correct: false }
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
        question: 'Pergunta 6: Na radiografia periapical da região de canino, os soalhos do seio maxilar e da cavidade nasal estão frequentemente superpostos e o cruzamento destes pode ser observado, formando estrutura denominada:',
        answers: [
            { text: 'Y invertido de Ennis', correct: true },
            { text: 'W sinusal', correct: false },
            { text: 'Extensão alveolar do seio', correct: false },
            { text: 'Septo nasal', correct: false }
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
        question: 'Pergunta 9: Faça uma relação da imagem radiográfica com as estruturas anatômicas',
        items: [
            'Linha radiopaca na região de molares inferiores',
            'Imagem radiolúcida entre dentes anteriores superiores',
            'Estrutura em forma de gancho posterior aos molares superiores',
            'Área radiolúcida na região apical de incisivo lateral superior'
        ],
        options: [
            'hâmulo pterigoídeo',
            'fosseta mirtiforme',
            'forame incisivo',
            'linha obliqua interna'
        ],
        answers: [
            { text: '3-4-2-1', correct: true },
            { text: '3-4-1-2', correct: false },
            { text: '4-3-1-2', correct: false },
            { text: '4-2-3-1', correct: false }
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
