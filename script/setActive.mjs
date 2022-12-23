export function assignActive(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            event.preventDefault();
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            setTimeout(() => {
                buttons[i].classList.add('active');
            }, 1);
        })
    }
}