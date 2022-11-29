const layers = document.querySelectorAll('.animation-layer');
window.addEventListener('mousemove', parallax);

layers.forEach(layer => {
    const order = layer.getAttribute('data-layer');
    layer.style.zIndex = 10 + Number(order);
    layer.style.animationDelay = (Number(order)/2)-10 + 's';
})

function parallax(e){
    layers.forEach(layer => {
        const order = layer.getAttribute('data-layer');
        const xMovement = - Math.ceil(e.clientX * order / 300);
        const yMovement = - Math.ceil(e.clientY * order / 300);
        //changed top & left instead of transform to not conflict with animation
        layer.style.left = xMovement + 'px';
        layer.style.top = yMovement + 'px';
    })
}
