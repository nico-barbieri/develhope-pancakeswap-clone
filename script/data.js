const btnData = document.getElementById('btn-click-data')
const farmsData = document.getElementById('farms-data')
const syrupData = document.getElementById('syrup-data')
const text = document.getElementById('text')

btnData.addEventListener('click', function (){
    if(syrupData.classList.contains('d-none')){
        syrupData.classList.replace('d-none','flex');
        farmsData.classList.replace('flex','d-none');
        text.innerHTML = " Syrup Pools";


    }
    else{
        farmsData.classList.replace('d-none','flex');
        syrupData.classList.replace('flex','d-none');
        text.innerHTML = " Farms";

    }
})
