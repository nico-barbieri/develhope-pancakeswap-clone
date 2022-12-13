import { svg } from "./icons.mjs";

const $swapGraph = document.querySelector('#swap-graph')
const $tradeMenuBtn = document.querySelectorAll(".small-menu-button")
const $graph = document.querySelector("#toggle-graph");
let graphIsHidden = false;

for (let i = 0; i < $tradeMenuBtn.length; i++) {
    $tradeMenuBtn[i].addEventListener('click', (event) => {
        event.preventDefault();
        $tradeMenuBtn.forEach(link => {
            link.classList.remove('active');
        });
        $tradeMenuBtn[i].classList.add('active')
    })
}

$graph.addEventListener('click', ()=>{
    if (!graphIsHidden) {
        $graph.innerHTML = svg.$showGraph;
        $swapGraph.classList.toggle('hide')
        graphIsHidden = true;
    } else {
        $graph.innerHTML = svg.$hideGraph;
        $swapGraph.classList.toggle('hide')
        graphIsHidden = false;
    }
})