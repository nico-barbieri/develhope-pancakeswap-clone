export function assignActive(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            event.preventDefault();
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            buttons[i].classList.add('active')
        })
    }
}