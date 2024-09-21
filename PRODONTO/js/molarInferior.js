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
        images: ['../assets/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '../assets/img/MolarInferior/Canal\ da\ Mandibula.png']
    },
    {
        id: 'modal-fvea-submandibular',
        images: ['../assets/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '../assets/img/MolarInferior/Fovea\ Submandibular.png']
    },
    {
        id: 'modal-paredes-do-canal-mandibular',
        images: ['../assets/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '../assets/img/MolarInferior/Paredes do Canal da Mandibula 2.png']
    },
    {
        id: 'modal-linha-milo-hiidea',
        images: ['../assets/img/MolarInferior/moinfmar/linha.jpeg', '../assets/img/MolarInferior/Linha\ Milo\ Hioidea.png']
    },
    {
        id: 'modal-linha-oblqua',
        images: ['../assets/img/MolarInferior/moinfmar/linha.jpeg', '../assets/img/MolarInferior/Linha\ Obliqua.png']
    },
    {
        id: 'modal-base-mandibular',
        images: ['../assets/img/MolarInferior/moinfmar/base-can-fov-par.jpeg', '../assets/img/MolarInferior/Base\ da\ Mandibula.png']
    }
];
let currentModalIndex = 0;
const imageSets = {
    'button-1': {
        original: '../assets/img/MolarInferior/moinfmar/base-can-fov-par.jpeg',
        compare: '../assets/img/MolarInferior/Paredes do Canal da Mandibula 2.png'
    },
    'button-2': {
        original: '../assets/img/MolarInferior/moinfmar/paredecanalmadd.jpeg',
        compare: '../assets/img/MolarInferior/Paredes do Canal da Mandibula.png'
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-canal-mandbular');
document.querySelector('.button-2').onclick = () => abrirModal('modal-fvea-submandibular');
document.querySelector('.button-3').onclick = () => abrirModal('modal-paredes-do-canal-mandibular');
document.querySelector('.button-4').onclick = () => abrirModal('modal-linha-milo-hiidea');
document.querySelector('.button-5').onclick = () => abrirModal('modal-linha-oblqua');
document.querySelector('.button-6').onclick = () => abrirModal('modal-base-mandibular');
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