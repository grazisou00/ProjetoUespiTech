const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const retryButton = document.getElementById('retry-button');
const restartButton = document.getElementById('restart-button');
const sairButton = document.getElementById('sair-button')

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
        question: 'Pergunta 2: Em qual das seguintes regiões, o “Y” invertido de Ennis é observado em radiografia periapical?',
        answers: [
            { text: 'Molares superiores.', correct: true },
            { text: 'Dentes canino e incisivo lateral superiores', correct: false },
            { text: 'Dentes canino e incisivo lateral inferiores.', correct: false },
            { text: 'Túber da maxila.', correct: false }
        ]
    },
    {
        question: 'Pergunta 3: Quanto à anatomia radiográfica da maxila em radiografias periapicais, assinale a alternativa que representa o reparo anatômico que é visualizado como uma imagem radiopaca de contornos nítidos, forma triangular, com base inferior e vértice súpero-anterior geralmente superposto à tuberosidade da maxila em posições diversas, às vezes chegando a prejudicar a interpretação radiográfica, principalmente do terceiro molar superior.',
        answers: [
            { text: 'Fosseta Mirtiforme', correct: true },
            { text: 'Hámulo Pterigóideo', correct: false },
            { text: 'Processo Coronoide da Mandíbula', correct: false },
            { text: 'Processo Zigomático da Maxila', correct: false }
        ]

    },
    {
        question: 'Pergunta 4: Pequenos pontos radiopacos, equidistantes entre a borda superior e inferior da mandíbula, que podem ser visualizados nas radiografias periapicais dos incisivos inferiores, abaixo do ápice dos incisivos, próximos à linha média, são denominados',
        answers: [
            { text: 'Foramina Lingual', correct: true },
            { text: 'Espinha Geniana', correct: false },
            { text: 'Protuberância Mentual', correct: false },
            { text: 'Espinha milo-hioídea', correct: false }
        ]
    },
    {
        question: 'Pergunta 5: O forame no qual passam nervos e vasos que participam da inervação e irrigação dos incisivos centrais superiores. A sua imagem radiográfica é usualmente projetada entre as raízes, na região média e no terço apical dos incisivos centrais. Esse forame pode variar em tamanho e forma. ',
        answers: [
            { text: 'Palatino maior', correct: true },
            { text: 'Mentoniano', correct: false },
            { text: 'Foramina lingual', correct: false },
            { text: 'nasopalatino', correct: false }
        ]
    },
    {
        question: 'Pergunta 6: Na radiografia periapical da região de canino, os soalhos do seio maxilar e da cavidade nasal estão frequentemente superpostos e o cruzamento destes pode ser observado, formando estrutura denominada: Y invertido de Ennis.',
        answers: [
            { text: 'Y invertido de Ennis', correct: true },
            { text: 'W sinusal', correct: false },
            { text: 'Extensão alveolar do seio', correct: false },
            { text: 'Septo nasal', correct: false }
        ]
    },
    {
        question: 'Pergunta 7: Quanto à anatomia radiográfica da maxila em radiografias periapicais, assinale a alternativa que representa o reparo anatômico que é visualizado como uma imagem radiopaca de contornos nítidos, forma triangular, com base inferior e vértice supero- -anterior geralmente superposto à tuberosidade da maxila em posições diversas, às vezes chegando a prejudicar a interpretação radiográfica, principalmente do terceiro molar superior',
        answers: [
            { text: 'Fosseta Mirtiforme', correct: true },
            { text: 'Hámulo Pterigóideo', correct: false },
            { text: 'Processo Coronoide da Mandíbula', correct: false },
            { text: 'Processo Zigomático da Maxila', correct: false }
        ]
    },
    {
        question: 'Pergunta 8: Sobre anatomia radiográfica normal, marcar C para as afirmativas Certas, E para as Erradas e, após, assinalar a alternativa que apresenta a sequência CORRETA:',
        statements: [
            '(_) Em uma radiografia periapical da região de incisivos inferiores, existe a possibilidade de evidenciarmos as seguintes estruturas anatômicas: foramina lingual, sínfise mentual, espinha geniana e canal nutrício.',
            '(_) Ao realizar uma radiografia periapical de região de pré-molares inferiores, é possível observar fóvea somente de glândula sublingual, não sendo possível observar fóvea de glândula submandibular.',
            '(_) Uma radiografia periapical da região de molar superior permite a visualização de estruturas anatômicas como parede laterobasal do seio maxilar, processo zigomático da maxila e, inclusive, processo coronoide da mandíbula.'
        ],
        correctSequence: '',
        answers: [
            { text: 'C - C - E.', correct: true },
            { text: 'E - C - C.', correct: false },
            { text: 'C - E - C.', correct: false },
            { text: 'E - C - E.', correct: false }
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
        question: 'Pergunta 10: São estruturas  anatômicas observadas nas radiografias de maxila:',
        answers: [
            { text: 'Fosseta mirtiforme; tabiques nasais; tuberosidade da maxila;  forame mental.', correct: true },
            { text: 'seio maxilar; processo zingomático; foramina lingual; Y invertido de Ennis.', correct: false },
            { text: 'fosseta mirtiforme; hámulo piterigoídeo; processo coronóide da mandíbula;  canais nutrícios.', correct: false },
            { text: 'Protuberância mental; seio maxilar; processo zingomático;  espinha nasal anterior.', correct: false }
        ]
    }

];


startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', retryIncorrectQuestions);
restartButton.addEventListener('click', restartGame);
sairButton.addEventListener('click', sairGame);

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
function sairGame() {
    window.location.href = 'PRODONTO/arquivosMário/html/questionários.html';
}
