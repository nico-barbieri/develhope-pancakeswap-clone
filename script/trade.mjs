import { timeUnitInMs, fakeData } from "./data-simulation.mjs";
import { assignActive } from "./setActive.mjs";
import { buttons } from "./buttons.mjs";
const $graphArea = document.getElementById('swap-graph-container');
const $swapGraph = document.getElementById('swap-graph').getContext("2d");
const $loader = document.querySelector('.chart-loader');
const $date = document.getElementById('tooltip-date');
const $value = document.getElementById('tooltip-value');
const $tradeMenuBtn = document.querySelectorAll(".small-menu-button");
const $timeRangeBtn = document.querySelectorAll(".time-range-button");
const $tradeBtn = document.querySelectorAll("#invert.trade-button");

let chartData = fakeData.chartData;
let timeRange = 'day';

//canvas size
  
for (const btnName in buttons) {
    buttons[btnName].$button.addEventListener('click', () => {
        buttons[btnName].$window?.classList.toggle('hide');
        buttons[btnName].$button.innerHTML = buttons[btnName].open
                                            ? buttons[btnName].svg.close 
                                            : buttons[btnName].svg.open;
        buttons[btnName].open = !buttons[btnName].open;
    })
}




let getMinValue = (data) => {
    return Math.min(...data.map(obj => obj.y));
}
let getMaxValue = (data) => {
    return Math.max(...data.map(obj => obj.y));
}
let valuesRange = (data) => {
    return getMaxValue(data) - getMinValue(data);
}

let simulatedData = fakeData.simulateData(timeUnitInMs.year, timeUnitInMs.hour);

fakeData.selectDataBasedOnTimeRange(simulatedData, 'day');

//detect if last value of chartData[timeRange] is bigger than the first and return green or red dependently
let redOrGreen = (array, opacity = 1) => {
    let color = 'grey';
    if (array[0]) {
        color = (array[1].y>array[array.length - 1].y)? `rgba(237,75,158, ${opacity})` : `rgba(49,208,170, ${opacity})`;
    }
    return color;
}

//update gradient
let redOrGreenGradient = (opacity1 = 1, opacity2 = 0) =>{
    let gradient = $swapGraph.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, redOrGreen(chartData[timeRange], opacity1));
    gradient.addColorStop(1, redOrGreen(chartData[timeRange], opacity2));
    return gradient;
}

// chart data
const data = {
    //labels: chartLabels,
    datasets: [{
        //label: 'BNB/CAKE',
        data: chartData['day'],
        fill: true,
        backgroundColor: redOrGreenGradient(.5, 0),
        borderColor: redOrGreen(chartData[timeRange]),
        borderWidth: 2,
    }],
}

const convertToDate = (time) => {
    return new Date(time).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

$value.innerHTML = simulatedData[simulatedData.length - 1].y.toFixed(2);
$date.innerHTML = convertToDate(simulatedData[simulatedData.length - 1].x);
//https://www.youtube.com/watch?v=3W3NFKxGw5w&t=4839s
const tooltipHandler = (context) => {
    const {tooltip} = context;
    $date.innerHTML = convertToDate(tooltip.dataPoints[0].raw.x);
    $value.innerHTML = parseFloat(tooltip.dataPoints[0].raw.y).toFixed(2);
}

// chart settings
const config = {
    type: 'line', //chart type
    data,
    options: {
        maintainAspectRatio: false,
        tension: .2,
        // axes
        scales: {
            x: {
                parsing: true,
                type: 'time',
                time: {
                    round: 'hour',
                },
                //bg grid settings (in this case, it's hidden)
                grid:  {
                    display: false,
                }
            },
            y: {
                //set lowest/highest point of y axis [see comment at the end for debugging]
                suggestedMin: Math.round(getMinValue(chartData[timeRange]) - (valuesRange(chartData[timeRange])/3)),
                suggestedMax: Math.round(getMaxValue(chartData[timeRange]) + (valuesRange(chartData[timeRange])/9)),
                //bg grid settings (in this case, it's hidden)
                grid:  {
                    display: false,
                },
                //y axis is hidden
                display: false,
            }
        },
        
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 20,
            },
        },
        
        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                enabled: false,
                external: tooltipHandler,
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
          },
        //delay animation on chart render [not active because there is the loader]
        //https://www.chartjs.org/docs/latest/samples/animations/delay.html
        animation: {
            onComplete: () => {
              $loader.classList.remove('loading');
              $loader.classList.add('faded');
            },
          },
    }
}

//render chart
export const swapChart = new Chart($swapGraph, config);

$timeRangeBtn.forEach(button => {
    button.addEventListener('click', () =>{
        if (!button.classList.contains('active')) {
            
            $loader.classList.remove('faded');
            $loader.classList.add('loading');
            
            timeRange = button.value;
            fakeData.selectDataBasedOnTimeRange(simulatedData, timeRange);
            swapChart.data.datasets[0].data = chartData[timeRange];
            swapChart.data.datasets[0].backgroundColor = redOrGreenGradient(.5, 0);
            swapChart.data.datasets[0].borderColor = redOrGreen(chartData[timeRange]);

            swapChart.update();
        }
    })
});

//show last data date & value when chart is not hovered
$graphArea.addEventListener('mouseout', () => {
    $value.innerHTML = simulatedData[simulatedData.length - 1].y.toFixed(2);
    $date.innerHTML = convertToDate(simulatedData[simulatedData.length - 1].x);
})

//now manage buttons
assignActive($timeRangeBtn);
assignActive($tradeMenuBtn)
assignActive($tradeBtn);
 
/*
Console max and min value of chartData[timeRange], its range and lowest/highest point of y axis:

console.log(`min: ${getMinValue(chartData[timeRange])}
            max: ${getMaxValue(chartData[timeRange])}
            range: ${valuesRange(chartData[timeRange])}
            min y: ${Math.round(getMinValue(chartData[timeRange]) - (valuesRange(chartData[timeRange])/3))}
            max y: ${Math.round(getMaxValue(chartData[timeRange]) + (valuesRange(chartData[timeRange])/9))}`);
*/
