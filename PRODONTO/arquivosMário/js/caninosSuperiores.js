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

let originalImage = '/PRODONTO/img/img223.jpeg';
let compareImage = '/PRODONTO/img/img224.jpeg';

function abrirModal() {
    const modal = document.getElementById('janela-modal-estrutura');
    modal.classList.add('abrir');
    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close-btn' || e.target.id == 'janela-modal-estrutura') {
            modal.classList.remove('abrir')
        }
    })
}
//function closeModal() {
//document.querySelector('.modal-estrutura').style.display = 'none';
//}

function changeImage(img1, img2) {
    originalImage = img1;
    compareImage = img2;
    document.getElementById('modal-image').src = originalImage;
}

document.getElementById('modal-image').addEventListener('mouseover', function () {
    this.src = compareImage;
});

document.getElementById('modal-image').addEventListener('mouseout', function () {
    this.src = originalImage;
});

document.getElementById('modal-image').addEventListener('click', function () {
    let temp = originalImage;
    originalImage = compareImage;
    compareImage = temp;
    this.src = originalImage;
});

function previousModal() {
    // Implement your logic to show the previous modal
    alert("Previous modal");
}

function nextModal() {
    // Implement your logic to show the next modal
    alert("Next modal");
}