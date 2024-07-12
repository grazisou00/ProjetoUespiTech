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
function redirecionarPagina() {
    window.location.href = "http://127.0.0.1:5500/PRODONTO/arquivosM%C3%A1rio/html/areadeEstudo%20(1).html"; // Substitua "URL_DA_PAGINA" pela URL para onde você deseja redirecionar
}
