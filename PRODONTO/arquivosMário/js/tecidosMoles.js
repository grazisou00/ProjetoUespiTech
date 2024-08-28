const modals = [
    'modal-projeo-do-lbio-superior',
    'modal-projeo-do-lbio-inferior',
    'modal-projeo-do-nariz',
    'modal-projeo-do-sulco-nasolabial',
    'modal-sombra-da-gengiva'
];

let currentModalIndex = 0;
let originalImage = '/PRODONTO/img/img223.jpeg';
let compareImage = '/PRODONTO/img/img224.jpeg';

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

    // Atualizar o índice do modal atual
    currentModalIndex = modals.indexOf(modalId);

    // Adicionar event listeners ao modal atualmente aberto
    const modalImage = modal.querySelector('#modal-image');
    if (modalImage) {
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-projeo-do-lbio-superior');
document.querySelector('.button-2').onclick = () => abrirModal('modal-projeo-do-lbio-inferior');
document.querySelector('.button-3').onclick = () => abrirModal('modal-projeo-do-nariz');
document.querySelector('.button-4').onclick = () => abrirModal('modal-projeo-do-sulco-nasolabial');
document.querySelector('.button-5').onclick = () => abrirModal('modal-sombra-da-gengiva');


function changeImage(img1, img2) {
    originalImage = img1;
    compareImage = img2;
}
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