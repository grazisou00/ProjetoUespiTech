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

const modals = [
    'modal-forame-mentual',
    'modal-base-mandibular',
    'modal-protuberncia-mentual'
];

const modal123 = [
    {
        id: 'modal-forame-mentual',
        images: ['/PRODONTO/img/caninoinferior/semM/caninoinfForame.jpeg', '/PRODONTO/img/caninoinferior/Forame%20Mentual.png']
    },
    {
        id: 'modal-base-mandibular',
        images: ['/PRODONTO/img/caninoinferior/semM/base-pretuberancia.jpeg', '/PRODONTO/img/caninoinferior/Base\ da\ Mandibula.png']
    },
    {
        id: 'modal-protuberancia-mentual',
        images: ['/PRODONTO/img/caninoinferior/semM/base-pretuberancia.jpeg', '/PRODONTO/img/caninoinferior/Protuberancia\ Mentual.png']
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

    // Atualizar o índice do modal atual
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-forame-mentual');
document.querySelector('.button-2').onclick = () => abrirModal('modal-base-mandibular');
document.querySelector('.button-3').onclick = () => abrirModal('modal-protuberancia-mentual');
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