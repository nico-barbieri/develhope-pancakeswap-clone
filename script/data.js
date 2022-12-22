const btnData = document.getElementById('btn-click-data');
const farmsData = document.getElementById('farms-data');
const syrupData = document.getElementById('syrup-data');
const text = document.getElementById('data-text');

function switchData() {   
    if(syrupData.classList.contains('hyde-data')){
        syrupData.classList.replace('hyde-data','show-data');
        farmsData.classList.replace('show-data','hyde-data');
        text.innerHTML = " Syrup Pools";
    }else{
        farmsData.classList.replace('hyde-data','show-data');
        syrupData.classList.replace('show-data','hyde-data');
        text.innerHTML = " Farms";
    }
};

//declaration of periodicSwitch variable outside startSwitchData to avoid errors on first call
let periodicSwitch;

function startSwitchData(func, interval) {
    //first call to switchData without delay
    func();
    //stop previous switch loop
    clearInterval(periodicSwitch);
    //start new switch loop (call to switchData every 4000ms)
    periodicSwitch = setInterval(func, interval);
    return periodicSwitch;
}

//call to switchData through startSwitchData
function restartSwitchData() {
    startSwitchData(switchData, 4000);
}

//switch data and restart loop on click
btnData.addEventListener('click', restartSwitchData)

//start loop when page loads
startSwitchData(switchData, 4000);

