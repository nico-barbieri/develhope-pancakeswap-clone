const $buttons = document.querySelectorAll('.small-menu-button');
const $sections = document.querySelectorAll('.trade-section');
const selectPage = () => {
    $buttons.forEach(button =>{
        button.addEventListener('click', () =>{
            if (button.dataset.section == null) {
                return; //do not show empy windows
            }
            $sections.forEach(sec=>{
                sec.classList.remove('show-window');
                sec.style.display= "none";
            })
            const section = document.getElementById(button.dataset.section);
            section.style.display = "flex";
            section.classList.add('show-window');
        })
    })
}

selectPage();