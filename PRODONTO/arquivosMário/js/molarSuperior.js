const modals = [
    'modal-seio-maxilar',
    'modal-fossa-nasal',
    'modal-processo-zigomtico-da-maxila',
    'modal-osso-zigomtico',
    'modal-processo-pterigideo',
    'modal-hmulo-pterigideo',
    'modal-processo-coronide-da-mandbula',
    'modal-assoalho-do-seio-maxilar',
    'modal-assoalho-da-fossa-nasal',
    'modal-tber-maxilar'
];
const modal123 = [
    {
        id: 'modal-seio-maxilar',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/assm-seio.jpeg', '/PRODONTO/img/MolareSuperior/Seio\ Maxilar.png']
    },
    {
        id: 'modal-fossa-nasal',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/fossa-assfn.jpeg', '/PRODONTO/img/MolareSuperior/Fossa\ Nasal.png']
    },
    {
        id: 'modal-processo-zigomtico-da-maxila',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/osszig-prcoro1-przimax.jpeg', '/PRODONTO/img/MolareSuperior/Processo\ Zigomático\ da\ Maxila.png']
    },
    {
        id: 'modal-osso-zigomtico',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/osszig-prcoro1-przimax.jpeg', '/PRODONTO/img/MolareSuperior/Osso\ Zigomático.png']
    },
    {
        id: 'modal-processo-pterigideo',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/Processo_Pterigoide_1.png', '/PRODONTO/img/MolareSuperior/Processo_Pterigoide_1_Marcado.png']
    },
    {
        id: 'modal-hmulo-pterigideo',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/Hamulo.png', '/PRODONTO/img/MolareSuperior/Hamulo_Marcado.png']
    },
    {
        id: 'modal-processo-coronide-da-mandbula',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/osszig-prcoro1-przimax.jpeg', '/PRODONTO/img/MolareSuperior/Processo\ Coronóide.png']
    },
    {
        id: 'modal-assoalho-do-seio-maxilar',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar//assm-seio.jpeg', '/PRODONTO/img/MolareSuperior/Assoalho\ do\ Seio\ Maxilar.png']
    },
    {
        id: 'modal-assoalho-da-fossa-nasal',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/fossa-assfn.jpeg', '/PRODONTO/img/MolareSuperior/Assoalho\ da\ Fossa\ Nasal.png']
    },
    {
        id: 'modal-tber-maxilar',
        images: ['/PRODONTO/img/MolareSuperior/mosupmar/tuber.jpeg', '/PRODONTO/img/MolareSuperior/Túber\ da\ Maxila.png']
    }
];


let currentModalIndex = 0;
const imageSets = {
    id: 'modal-processo-coronide-da-mandbula',
    buttons: {
        'button-1': {
            original: '/PRODONTO/img/MolareSuperior/mosupmar/osszig-prcoro1-przimax.jpeg',
            compare: '/PRODONTO/img/MolareSuperior/Processo Coronóide.png'
        },
        'button-2': {
            original: '/PRODONTO/img/MolareSuperior/mosupmar/ham-prcoro2.jpeg',
            compare: '/PRODONTO/img/MolareSuperior/Processo Coronoite 2.png'
        }
    },
    id: 'modal-processo-pterigideo',
    buttons: {
        'button-1': {
            original: '/PRODONTO/img/MolareSuperior/mosupmar/Processo_Pterigoide_1.png',
            compare: '/PRODONTO/img/MolareSuperior/Processo_Pterigoide_1_Marcado.png'
        },
        'button-2': {
            original: '/PRODONTO/img/MolareSuperior/mosupmar/Processo_Pterigoide_2.png',
            compare: '/PRODONTO/img/MolareSuperior/Processo_Pterigoide_2_Marcado.png'
        }
    }
};

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
function changeImage(img1, img2) {
    const modalImage = document.querySelector('.janela-modal-estrutura.abrir img');
    modalImage.src = img1;

    // Remove event listeners anteriores para evitar sobreposição
    modalImage.removeEventListener('mouseover', handleMouseOver);
    modalImage.removeEventListener('mouseout', handleMouseOut);
    modalImage.removeEventListener('click', handleClick);

    // Define novos eventos com as imagens corretas para hover e clique
    function handleMouseOver() {
        this.src = img2;
    }

    function handleMouseOut() {
        this.src = img1;
    }

    function handleClick() {
        let temp = img1;
        img1 = img2;
        img2 = temp;
        this.src = img1;
    }

    modalImage.addEventListener('mouseover', handleMouseOver);
    modalImage.addEventListener('mouseout', handleMouseOut);
    modalImage.addEventListener('click', handleClick);
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-seio-maxilar');
document.querySelector('.button-2').onclick = () => abrirModal('modal-fossa-nasal');
document.querySelector('.button-3').onclick = () => abrirModal('modal-processo-zigomtico-da-maxila');
document.querySelector('.button-4').onclick = () => abrirModal('modal-osso-zigomtico');
document.querySelector('.button-5').onclick = () => abrirModal('modal-processo-pterigideo');
document.querySelector('.button-6').onclick = () => abrirModal('modal-hmulo-pterigideo');
document.querySelector('.button-7').onclick = () => abrirModal('modal-processo-coronide-da-mandbula');
document.querySelector('.button-8').onclick = () => abrirModal('modal-assoalho-do-seio-maxilar');
document.querySelector('.button-9').onclick = () => abrirModal('modal-assoalho-da-fossa-nasal');
document.querySelector('.button-10').onclick = () => abrirModal('modal-tber-maxilar');

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