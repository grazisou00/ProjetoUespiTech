const modals = [
    'modal-projeo-do-lbio-superior',
    'modal-projeo-do-lbio-inferior',
    'modal-projeo-do-nariz',
    'modal-projeo-do-sulco-nasolabial',
    'modal-sombra-da-gengiva'
];

const modal123 = [
    {
        id: 'modal-projeo-do-lbio-superior',
        images: ['/PRODONTO/img/tecidosMoles/tecimolmar/labiosup.jpeg', '/PRODONTO/img/tecidosMoles/Projecao\ do\ Labio\ Superior.png']
    },
    {
        id: 'modal-projeo-do-lbio-inferior',
        images: ['/PRODONTO/img/tecidosMoles/tecimolmar/labioinf.jpeg', '/PRODONTO/img/tecidosMoles/Projecao\ do\ labio\ Inferior.png']
    },
    {
        id: 'modal-projeo-do-nariz',
        images: ['/PRODONTO/img/tecidosMoles/tecimolmar/projnariz.jpeg', '/PRODONTO/img/tecidosMoles/Projecao\ do\ Nariz.png']
    },
    {
        id: 'modal-projeo-do-sulco-nasolabial',
        images: ['/PRODONTO/img/tecidosMoles/tecimolmar/geng-nasolab.jpeg', '/PRODONTO/img/tecidosMoles/Projecao\ do\ Sulco\ Nasolabial.png']
    },
    {
        id: 'modal-sombra-da-gengiva',
        images: ['/PRODONTO/img/tecidosMoles/tecimolmar/geng-nasolab.jpeg', '/PRODONTO/img/tecidosMoles/Gengiva.png']
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-projeo-do-lbio-superior');
document.querySelector('.button-2').onclick = () => abrirModal('modal-projeo-do-lbio-inferior');
document.querySelector('.button-3').onclick = () => abrirModal('modal-projeo-do-nariz');
document.querySelector('.button-4').onclick = () => abrirModal('modal-projeo-do-sulco-nasolabial');
document.querySelector('.button-5').onclick = () => abrirModal('modal-sombra-da-gengiva');

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