$mobileBtn = document.querySelectorAll(".btn-on-mobile");

$mobileBtn.forEach(btn => {
    btn.addEventListener('click', (ev)=>{
        if(window.innerWidth < 769 ) {
            ev.preventDefault();
        }
    })
});