function abrirModal(modalId) {
    document.getElementById(modalId).classList.add("abrir");
  }
  
  function fecharModal(modalId) {
    document.getElementById(modalId).classList.remove("abrir");
  }
  
  // Abrir e fechar cada modal
  document.querySelector('.button-1').onclick = () => abrirModal('modal-sutura-palatina-mediana');
  document.querySelector('.button-2').onclick = () => abrirModal('modal-fossas-nasais');
  document.querySelector('.button-3').onclick = () => abrirModal('modal-forame-incisivo');
  document.querySelector('.button-4').onclick = () => abrirModal('modal-canal-incisivo');
  document.querySelector('.button-5').onclick = () => abrirModal('modal-aberturas-nasais-canal-incisivo');
  document.querySelector('.button-6').onclick = () => abrirModal('modal-fossas-incisivas');
  document.querySelector('.button-7').onclick = () => abrirModal('modal-aberturas-nasais-anterior');
  document.querySelector('.button-8').onclick = () => abrirModal('modal-assoalho-fossas-nasais');
  document.querySelector('.button-9').onclick = () => abrirModal('modal-conchas-nasais-inferiores');
  document.querySelector('.button-10').onclick = () => abrirModal('modal-septo-nasal');
  document.querySelector('.button-11').onclick = () => abrirModal('modal-paredes-canal-incisivo');
  