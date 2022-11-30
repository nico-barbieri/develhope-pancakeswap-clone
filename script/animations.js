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
        const xMovement = - (e.clientX * order / 600);
        const yMovement = - (e.clientY * order / 600);
        //changed top & left instead of transform to not conflict with animation
        layer.style.left = xMovement + '%';
        layer.style.top = yMovement + '%';
    })
}
