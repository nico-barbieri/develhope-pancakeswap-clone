const $goUp = document.getElementById('go-up');

$goUp.addEventListener('click', ()=>{
    // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})