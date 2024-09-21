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
    images: ['../assets/img/IncisivoSuperior/insuperma/suturapa-fossana.jpeg', '../assets/img/IncisivoSuperior/suturapalatinamedianahl.png']
  },
  {
    id: 'modal-fossas-nasais',
    images: ['../assets/img/IncisivoSuperior/insuperma/suturapa-fossana.jpeg', '../assets/img/IncisivoSuperior/fossasnasais.png']
  },
  {
    id: 'modal-forame-incisivo',
    images: ['../assets/img/IncisivoSuperior/insuperma/forameinc-abena.jpeg', '../assets/img/IncisivoSuperior/forameincisivohl.png']
  },
  {
    id: 'modal-canal-incisivo',
    images: ['../assets/img/IncisivoSuperior/insuperma/canaisinsisivos.jpeg', '../assets/img/IncisivoSuperior/Canais\ Incisivos.png']
  },
  {
    id: 'modal-aberturas-nasais-do-canal-incisivo',
    images: ['../assets/img/IncisivoSuperior/insuperma/abertnasalinc.png', '../assets/img/IncisivoSuperior/aberturanasalinc.png']
  },
  {
    id: 'modal-fossas-incisivas',
    images: ['../assets/img/IncisivoSuperior/insuperma/fossasin.jpeg', '../assets/img/areadeEstudo/IncisovoSuperiores/FossasIncisivas.png']
  },
  {
    id: 'modal-espinha-nasal-do-anterior',
    images: ['../assets/img/IncisivoSuperior/insuperma//assoa-espi.jpeg', '../assets/img/IncisivoSuperior/espinhanasalanterior.png']
  },
  {
    id: 'modal-assoalho-de-fossas-nasais',
    images: ['../assets/img/IncisivoSuperior/insuperma/assoalhodefossanasal1.png', '../assets/img/IncisivoSuperior/assoalhodefossanasal.png']
  },
  {
    id: 'modal-conchas-nasais-inferiores',
    images: ['../assets/img/IncisivoSuperior/insuperma/concnasa.png', '../assets/img/IncisivoSuperior/Conchas Nasais Inferiores.png']
  },
  {
    id: 'modal-septo-nasal',
    images: ['../assets/img/IncisivoSuperior/insuperma/assoa-espi.jpeg', '../assets/img/IncisivoSuperior/Septo\ Nasal.png']
  },
  {
    id: 'modal-paredes-do-canal-incisivo',
    images: ['../assets/img/IncisivoSuperior/insuperma/canaisinsisivos.jpeg', '../assets/img/IncisivoSuperior/Paredes\ dos\ Canais\ Incisivos.png']
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
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";
  
    this.handleClick = this.handleClick.bind(this);
  }
  
  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }
  
  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }
  
  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }
  
  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li"
  );
  mobileNavbar.init();