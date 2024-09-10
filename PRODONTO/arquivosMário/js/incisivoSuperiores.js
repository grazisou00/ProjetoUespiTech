const modals = [
  'modal-sutura-palatina-mediana',
  'modal-fossas-nasais',
  'modal-forame-incisivo',
  'modal-canal-incisivo',
  'modal-aberturas-nasais-do-canal-incisivo',
  'modal-fossas-incisivas',
  'modal-espinha-nasal-do-anterior',
  'modal-assoalho-de-fossas-nasais',
  'modal-conchas-nasais-inferiores',
  'modal-septo-nasal',
  'modal-paredes-do-canal-incisivo'
];

const modal123 = [
  {
      id: 'modal-sutura-palatina-mediana',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma/suturapa-fossana.jpeg', '/PRODONTO/img/IncisivoSuperior/suturapalatinamedianahl.png']
  },
  {
      id: 'modal-fossas-nasais',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma/suturapa-fossana.jpeg', '/PRODONTO/img/IncisivoSuperior/fossasnasais.png']
  },
  {
      id: 'modal-forame-incisivo',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma/forameinc-abena.jpeg', '/PRODONTO/img/IncisivoSuperior/forameincisivohl.png']
  },
  {
      id: 'modal-canal-incisivo',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma/canaisinsisivos.jpeg', '/PRODONTO/img/IncisivoSuperior/Canais\ Incisivos.png']
  },
  {
      id: 'modal-aberturas-nasais-do-canal-incisivo',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma//assoa-espi.jpeg', '/PRODONTO/img/IncisivoSuperior/espinhanasalanterior.png']
  },
  {
      id: 'modal-fossas-incisivas',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma/fossasin.jpeg', '/PRODONTO/img/areadeEstudo/IncisovoSuperiores/FossasIncisivas.png']
  },
  {
      id: 'modal-espinha-nasal-do-anterior',
      images: ['/PRODONTO/img/IncisivoSuperior/insuperma//assoa-espi.jpeg', '/PRODONTO/img/IncisivoSuperior/Aberturas\ Nasais.png']
  },
  {
    id: 'modal-assoalho-de-fossas-nasais',
    images: ['/PRODONTO/img/IncisivoSuperior/insuperma//assoa-espi.jpeg', '/PRODONTO/img/IncisivoSuperior/assoalhodefossanasal.png']
  },
  {
    id: 'modal-conchas-nasais-inferiores',
    images: ['/PRODONTO/img/IncisivoSuperior/insuperma/concnasa.jpeg', '/PRODONTO/img/IncisivoSuperior/Conchas\ Nasais\ Inferiores.png']
  },
  {
    id: 'modal-septo-nasal',
    images: ['/PRODONTO/img/IncisivoSuperior/insuperma/assoa-espi.jpeg', '/PRODONTO/img/IncisivoSuperior/Septo\ Nasal.png']
  },
  {
    id: 'modal-paredes-do-canal-incisivo',
    images: ['/PRODONTO/img/IncisivoSuperior/insuperma/canaisinsisivos.jpeg', '/PRODONTO/img/IncisivoSuperior/Paredes\ dos\ Canais\ Incisivos.png']
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


    // Adicionar event listeners ao modal atualmente aberto
    currentModalIndex = modals.indexOf(modalId);
    const modalImage = modal.querySelector('img');
    let [originalImage, compareImage] = modal123[currentModalIndex].images;
    modalImage.src = originalImage;

    // Adicionar event listeners ao modal atualmente aberto
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-sutura-palatina-mediana');
document.querySelector('.button-2').onclick = () => abrirModal('modal-fossas-nasais');
document.querySelector('.button-3').onclick = () => abrirModal('modal-forame-incisivo');
document.querySelector('.button-4').onclick = () => abrirModal('modal-canal-incisivo');
document.querySelector('.button-5').onclick = () => abrirModal('modal-aberturas-nasais-do-canal-incisivo');
document.querySelector('.button-6').onclick = () => abrirModal('modal-fossas-incisivas');
document.querySelector('.button-7').onclick = () => abrirModal('modal-espinha-nasal-do-anterior');
document.querySelector('.button-8').onclick = () => abrirModal('modal-assoalho-de-fossas-nasais');
document.querySelector('.button-9').onclick = () => abrirModal('modal-conchas-nasais-inferiores');
document.querySelector('.button-10').onclick = () => abrirModal('modal-septo-nasal');
document.querySelector('.button-11').onclick = () => abrirModal('modal-paredes-do-canal-incisivo');

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