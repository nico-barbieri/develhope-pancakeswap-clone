const layers = document.querySelectorAll('.animation-layer');
document.addEventListener('mousemove', parallax);

layers.forEach(layer => {
    const order = layer.getAttribute('data-layer');
    layer.style.zIndex = 10 + Number(order);
    layer.style.animationDelay = (Number(order)/2)-10 + 's';
})

function parallax(e){
    layers.forEach(layer => {
        const order = layer.getAttribute('data-layer');
        const x = (window.innerWidth - e.clientX*order);
        const y = (window.innerHeight - e.clientY*order);
        layer.style.left = parseInt(x/200) + 'px';
        layer.style.top = parseInt(y/300) + 'px';
    })
}
