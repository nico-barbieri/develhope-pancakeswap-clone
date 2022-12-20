const loader = document.getElementById('page-loader');
function fadeOut() {
    loader.classList.add('faded');
};

window.addEventListener('load', fadeOut);