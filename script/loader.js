const loader = document.getElementById('page-loader');
const body = document.getElementById('body');
console.log(body);
function fadeOut() {
    loader.classList.add('faded');
    body.style.overflowY = 'overlay';
};

window.addEventListener('load', fadeOut);