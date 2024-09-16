const modals = [
    'modal-canais-nutrientes',
    'modal-extenso-alveolar',
    'modal-extenso-anterior',
    'modal-extenso-do-tber',
    'modal-septo-sinusal'
];
const modal123 = [
    {
        id: 'modal-canais-nutrientes',
        images: ['/PRODONTO/img/seioMaxilar/seiomar/canaisnutrientes.jpeg', '/PRODONTO/img/seioMaxilar/Canais\ Nutrientes.png']
    },
    {
        id: 'modal-extenso-alveolar',
        images: ['/PRODONTO/img/seioMaxilar/seiomar/extensao_alveolar_sem_marca.png', '/PRODONTO/img/seioMaxilar/extensao_alveolar_marcada.png']
    },
    {
        id: 'modal-extenso-anterior',
        images: ['/PRODONTO/img/seioMaxilar/seiomar/exteant.jpeg', '/PRODONTO/img/seioMaxilar/Extensao\ Anterior.png']
    },
    {
        id: 'modal-extenso-do-tber',
        images: ['/PRODONTO/img/seioMaxilar/seiomar/extptuber.jpeg', '/PRODONTO/img/seioMaxilar/Extensao\ para\ Tuber.png']
    },
    {
        id: 'modal-septo-sinusal',
        images: ['/PRODONTO/img/seioMaxilar/seiomar/septosinualsemmarca.png', '/PRODONTO/img/seioMaxilar/septosinualmarcado.png']
    }
];


let currentModalIndex = 0;

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add("abrir");

    const closeModal = () => {
        modal.classList.remove("abrir");
    };

    modal.querySelector(".close-btn").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains('janela-modal-estrutura')) {
            closeModal();
        }
    });



    currentModalIndex = modals.indexOf(modalId);
    const modalImage = modal.querySelector('img');
    let [originalImage, compareImage] = modal123[currentModalIndex].images;
    modalImage.src = originalImage;


    modalImage.addEventListener('mouseover', function () {
        this.src = compareImage;
    });

    modalImage.addEventListener('mouseout', function () {
        this.src = originalImage;
    });

    modalImage.addEventListener('click', function () {
        let temp = originalImage;
        originalImage = compareImage;
        compareImage = temp;
        this.src = originalImage;
    });
}

function previousModal() {
    const currentModal = document.querySelector('.janela-modal-estrutura.abrir');
    if (currentModal) {
        currentModal.classList.remove('abrir');
    }

    currentModalIndex = (currentModalIndex - 1 + modals.length) % modals.length;
    const previousModalId = modals[currentModalIndex];
    abrirModal(previousModalId);
}

function nextModal() {
    const currentModal = document.querySelector('.janela-modal-estrutura.abrir');
    if (currentModal) {
        currentModal.classList.remove('abrir');
    }

    currentModalIndex = (currentModalIndex + 1) % modals.length;
    const nextModalId = modals[currentModalIndex];
    abrirModal(nextModalId);
}

// Abrir e fechar cada modal
document.querySelector('.button-1').onclick = () => abrirModal('modal-canais-nutrientes');
document.querySelector('.button-2').onclick = () => abrirModal('modal-extenso-alveolar');
document.querySelector('.button-3').onclick = () => abrirModal('modal-extenso-anterior');
document.querySelector('.button-4').onclick = () => abrirModal('modal-extenso-do-tber');
document.querySelector('.button-5').onclick = () => abrirModal('modal-septo-sinusal');
function abrirModalVm() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    function fecharModal(e) {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal') {
            modal.classList.remove('abrir');
            modal.removeEventListener('click', fecharModal);
        }
    }
    modal.addEventListener('click', fecharModal);
}