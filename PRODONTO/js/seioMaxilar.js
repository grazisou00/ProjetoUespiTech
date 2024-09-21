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
        images: ['../assets/img/seioMaxilar/seiomar/canaisnutrientes.jpeg', '../assets/img/seioMaxilar/Canais\ Nutrientes.png']
    },
    {
        id: 'modal-extenso-alveolar',
        images: ['../assets/img/seioMaxilar/seiomar/extensao_alveolar_sem_marca.png', '../assets/img/seioMaxilar/extensao_alveolar_marcada.png']
    },
    {
        id: 'modal-extenso-anterior',
        images: ['../assets/img/seioMaxilar/seiomar/exteant.jpeg', '../assets/img/seioMaxilar/Extensao\ Anterior.png']
    },
    {
        id: 'modal-extenso-do-tber',
        images: ['../assets/img/seioMaxilar/seiomar/extptuber.jpeg', '../assets/img/seioMaxilar/Extensao\ para\ Tuber.png']
    },
    {
        id: 'modal-septo-sinusal',
        images: ['../assets/img/seioMaxilar/seiomar/septosinualsemmarca.png', '../assets/img/seioMaxilar/septosinualmarcado.png']
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