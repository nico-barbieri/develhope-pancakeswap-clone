import { buttons } from "./buttons.mjs";
import { swapChart } from "./chart.mjs";

const $tradeMenuBtn = document.querySelectorAll(".small-menu-button");

for (let i = 0; i < $tradeMenuBtn.length; i++) {
    $tradeMenuBtn[i].addEventListener('click', (event) => {
        event.preventDefault();
        $tradeMenuBtn.forEach(link => {
            link.classList.remove('active');
        });
        $tradeMenuBtn[i].classList.add('active')
    })
}

for (const btnName in buttons) {
    buttons[btnName].$button.addEventListener('click', () => {
        buttons[btnName].$window?.classList.toggle('hide');
        buttons[btnName].$button.innerHTML = buttons[btnName].open
                                            ? buttons[btnName].svg.close 
                                            : buttons[btnName].svg.open;
        buttons[btnName].open = !buttons[btnName].open;
    })
}