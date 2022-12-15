import { buttons } from "./buttons.mjs";
import { swapChart } from "./chart.mjs";

const $tradeMenuBtn = document.querySelectorAll(".small-menu-button");
const $timeRangeBtn = document.querySelectorAll(".time-range-button");

function assignActive(buttons) {
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

for (const btnName in buttons) {
    buttons[btnName].$button.addEventListener('click', () => {
        buttons[btnName].$window?.classList.toggle('hide');
        buttons[btnName].$button.innerHTML = buttons[btnName].open
                                            ? buttons[btnName].svg.close 
                                            : buttons[btnName].svg.open;
        buttons[btnName].open = !buttons[btnName].open;
    })
}

assignActive($tradeMenuBtn);
assignActive($timeRangeBtn);