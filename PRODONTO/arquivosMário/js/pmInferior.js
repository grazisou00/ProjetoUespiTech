const modals = [
    'modal-forame-mentual',
    'modal-canal-mandibular',
    'modal-fvea-submandibular',
    'modal-paredes-do-canal-mandibular',
    'modal-linha-milo-hiidea',
    'modal-base-mandibular'
];

const modal123 = [
    {
        id: 'modal-forame-mentual',
        images: ['/PRODONTO/img/preMolarInferior/prmoinfmar/b-c-f-p.jpeg', '/PRODONTO/img/preMolarInferior/Forame\ Mentual.png']
    },
    {
        id: 'modal-canal-mandibular',
        images: ['/PRODONTO/img/preMolarInferior/prmoinfmar/b-c-f-p.jpeg', '/PRODONTO/img/preMolarInferior/Canal\ da\ Mandibula.png']
    },
    {
        id: 'modal-fvea-submandibular',
        images: ['/PRODONTO/img/preMolarInferior/prmoinfmar/fovea.jpeg', '/PRODONTO/img/preMolarInferior/Fovea\ Submandibular.png']
    },
    {
        id: 'modal-paredes-do-canal-mandibular',
        images: ['/PRODONTO/img/preMolarInferior/prmoinfmar/b-c-f-p.jpeg', '/PRODONTO/img/preMolarInferior/Paredes\ do\ Canal\ da\ Mandibula.png']
    },
    {
        id: 'modal-linha-milo-hiidea',
        images: ['/PRODONTO/img/preMolarInferior/prmoinfmar/linhaaa.jpeg', '/PRODONTO/img/preMolarInferior/Linha\ Milo\ Hioidea.png']
    },
    {
        id: 'modal-base-mandibular',
        images: ['/PRODONTO/img/preMolarInferior/prmoinfmar/b-c-f-p.jpeg', '/PRODONTO/img/preMolarInferior/Base\ da\ Mandibula.png']
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
document.querySelector('.button-1').onclick = () => abrirModal('modal-forame-mentual');
document.querySelector('.button-2').onclick = () => abrirModal('modal-canal-mandibular');
document.querySelector('.button-3').onclick = () => abrirModal('modal-fvea-submandibular');
document.querySelector('.button-4').onclick = () => abrirModal('modal-paredes-do-canal-mandibular');
document.querySelector('.button-5').onclick = () => abrirModal('modal-linha-milo-hiidea');
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