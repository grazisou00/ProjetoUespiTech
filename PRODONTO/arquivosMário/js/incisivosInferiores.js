const modals = [
    'modal-fossa-mentual',
    'modal-foramina-lingual',
    'modal-canais-nutrientes',
    'modal-protuberncia-mentual',
    'modal-espinha-genianas',
    'modal-paredes-da-foramina-lingual',
    'modal-base-mandibular'
];
const modal123 = [
    {
        id: 'modal-fossa-mentual',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/cana-fora-pare.jpeg', '/PRODONTO/img/incisivoinferior/Fossa Mentual.jpeg']
    },
    {
        id: 'modal-foramina-lingual',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/cana-fora-pare.jpeg', '/PRODONTO/img/incisivoinferior/Foramina\ Lingual.png']
    },
    {
        id: 'modal-canais-nutrientes',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/cana-fora-pare.jpeg', '/PRODONTO/img/incisivoinferior/Canais\ Nutrientes.png']
    },
    {
        id: 'modal-protuberncia-mentual',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/pretu-turb-base.jpeg', '/PRODONTO/img/incisivoinferior/Protuberancia\ Mentual.png']
    },
    {
        id: 'modal-espinha-genianas',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/pretu-turb-base.jpeg', '/PRODONTO/img/incisivoinferior/Tuberculo\ de\ Geni.png']
    },
    {
        id: 'modal-paredes-da-foramina-lingual',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/cana-fora-pare.jpeg', '/PRODONTO/img/incisivoinferior/Paredes\ da\ Foramina\ Lingual.png']
    },
    {
        id: 'modal-base-mandibular',
        images: ['/PRODONTO/img/incisivoinferior/incisivoinfmar/pretu-turb-base.jpeg', '/PRODONTO/img/incisivoinferior/Base\ da\ Mandibula.png']
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-fossa-mentual');
document.querySelector('.button-2').onclick = () => abrirModal('modal-foramina-lingual');
document.querySelector('.button-3').onclick = () => abrirModal('modal-canais-nutrientes');
document.querySelector('.button-4').onclick = () => abrirModal('modal-protuberncia-mentual');
document.querySelector('.button-5').onclick = () => abrirModal('modal-espinha-genianas');
document.querySelector('.button-6').onclick = () => abrirModal('modal-paredes-da-foramina-lingual');
document.querySelector('.button-7').onclick = () => abrirModal('modal-base-mandibular');

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