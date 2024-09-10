const modals = [
    'modal-canal-mandbular',
    'modal-fvea-submandibular',
    'modal-paredes-do-canal-mandibular',
    'modal-linha-milo-hiidea',
    'modal-linha-oblqua',
    'modal-base-mandibular'
];

const modal123 = [
    {
        id: 'modal-canal-mandbular',
        images: ['/PRODONTO/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '/PRODONTO/img/MolarInferior/Canal\ da\ Mandibula.png']
    },
    {
        id: 'modal-fvea-submandibular',
        images: ['/PRODONTO/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '/PRODONTO/img/MolarInferior/Fovea\ Submandibular.png']
    },
    {
        id: 'modal-paredes-do-canal-mandibular',
        images: ['/PRODONTO/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '/PRODONTO/img/MolarInferior/Paredes do Canal da Mandibula 2.png']
    },
    {
        id: 'modal-linha-milo-hiidea',
        images: ['/PRODONTO/img/MolarInferior/moinfmar/linha.jpeg', '/PRODONTO/img/MolarInferior/Linha\ Milo\ Hioidea.png']
    },
    {
        id: 'modal-linha-oblqua',
        images: ['/PRODONTO/img/MolarInferior/moinfmar/linha.jpeg', '/PRODONTO/img/MolarInferior/Linha\ Obliqua.png']
    },
    {
        id: 'modal-base-mandibular',
        images: ['/PRODONTO/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '/PRODONTO/img/MolarInferior/Base\ da\ Mandibula.png']
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
function changeImage(img1, img2) {
    const modalImage = document.querySelector('.janela-modal-estrutura.abrir img');
    modalImage.src = img1;

    // Adiciona eventos de hover para alternar entre as imagens
    modalImage.addEventListener('mouseover', function () {
        this.src = img2;
    });

    modalImage.addEventListener('mouseout', function () {
        this.src = img1;
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-canal-mandbular');
document.querySelector('.button-2').onclick = () => abrirModal('modal-fvea-submandibular');
document.querySelector('.button-3').onclick = () => abrirModal('modal-paredes-do-canal-mandibular');
document.querySelector('.button-4').onclick = () => abrirModal('modal-linha-milo-hiidea');
document.querySelector('.button-5').onclick = () => abrirModal('modal-linha-oblqua');
document.querySelector('.button-6').onclick = () => abrirModal('modal-base-mandibular');

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