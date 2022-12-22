const invertBtn = document.querySelector('#invert')
const tradeForm = document.querySelector('.trade-form-container-xs')
invertBtn.removeAttribute('refresh')

invertBtn.addEventListener('click', (ev) =>{
    ev.preventDefault();
    if(tradeForm.classList.contains('flex-column')){
        tradeForm.classList.remove('flex-column')
        tradeForm.classList.add('flex-column-reverse')
    }
    else{
        tradeForm.classList.add('flex-column')
        tradeForm.classList.remove('flex-column-reverse')
    }
   
   
})