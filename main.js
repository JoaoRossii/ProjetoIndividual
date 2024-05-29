var ul = document.querySelector('.navbar ul');
var menuBtn = document.querySelector('.menu-btn ');
var opc = document.getElementsByClassName('.opcoes');

function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
    if (nargas.style.display = 'none') {
        nargas.style.display = 'flex';
    } else {
        nargas.style.display = 'none';
    }
    
}