import { buttons } from "./buttons.mjs";

const $target = document.getElementById('main-window');
const $buttons = document.querySelectorAll('.small-menu-button');

const selectPage = () => {
    $buttons.forEach(button =>{
        button.addEventListener('click', async () =>{
            const section = button.dataset.section;
            const html = await (await fetch(`./trade-components/${section}.html`)).text();
            $target.innerHTML = html;
        })
    })
}

selectPage();