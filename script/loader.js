const loader = document.getElementById('page-loader');
console.log(body);
function fadeOut() {
    loader.classList.add('faded');
};

window.addEventListener('load', fadeOut);