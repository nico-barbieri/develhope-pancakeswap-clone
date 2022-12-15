let $swapGraph = document.getElementById('swap-graph').getContext("2d");
let $loader = document.querySelector('.chart-loader');
let delayed;
let timeRange = 'day';

//empty object of data which will be filled randomly with simulateData()
let chartData = {
    'day': [],
    'week': [],
    'month': [],
    'year': [],
}


// starting from value, return a value in the range [value - range/2, value + range/2]
let randomSum = (value, range = 10) => {
    value += Math.random() * range - (range/2);
    return value
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

//randomly fill chartData
let simulateData = (dataset, time = 'day') => {
    if (!dataset[time][0]) {
        let currentValue = 70;
        let numberOfValues;
        let timeMultiplier;
        switch (time) {
            case 'day':
                numberOfValues = 24;
                timeMultiplier = 3600000; //1h
                break;  
            case 'week':
                numberOfValues = 28;
                timeMultiplier = 21600000; //6h
                break; 
            case 'month':
                numberOfValues = 31;
                timeMultiplier = 86400000; //24h ~ 1d
                break;
            case 'year':
                numberOfValues = 24;
                // NOTE:
                // this is just an approximation of an half of a month
                // This does not consider leap years
                timeMultiplier = 86400000 * 365 / 24; // ~ half of a month
                break;
            default:
                numberOfValues = 24;
                timeMultiplier = 3600000; //1h
                break;
        }

        for (let i = 0; i < numberOfValues; i++) {
            let value = dataset[timeRange][0]? dataset[timeRange][0].y : currentValue;
            dataset[timeRange].unshift({
                // calculate current time in ms and then subtract (timeMultiplier * i) to populate chartData
                x: (Date.now() - (timeMultiplier * i)), 
                y: randomSum(value, 6),
            })
        }
    }
}

simulateData(chartData, 'day');

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
    let gradient = $swapGraph.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, redOrGreen(chartData[timeRange], opacity1));
    gradient.addColorStop(1, redOrGreen(chartData[timeRange], opacity2));
    return gradient;
}

// chart data
const data = {
    //labels: chartLabels,
    datasets: [{
        label: 'BNB/CAKE',
        data: chartData['day'],
        fill: true,
        backgroundColor: redOrGreenGradient(.5, 0),
        borderColor: redOrGreen(chartData[timeRange]),
        borderWidth: 2,
    }],
}

// chart settings
const config = {
    type: 'line', //chart type
    data,
    options: {
        // axes
        scales: {
            x: {
                parsing: true,
                type: 'time',
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
                display: true,
            }
        },
        tension: .1, 
        elements: {
            point: {
                radius: 0,
            }
        },

        //delay animation on chart render 
        //https://www.chartjs.org/docs/latest/samples/animations/delay.html
        animation: {
            onProgress: () => {
                $loader.classList.remove('faded');
                $loader.classList.add('loading');                
            },
            onComplete: () => {
              //delayed = true;
              $loader.classList.remove('loading');
              $loader.classList.add('faded');
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 50 + context.datasetIndex * 50;
              }
              return delay;
            },
          },
    }
}

//render chart
export const swapChart = new Chart($swapGraph, config)

const $timeRangeButtons = document.querySelectorAll('.time-range-button');

$timeRangeButtons.forEach(button => {
    button.addEventListener('click', () =>{
        if (!button.classList.contains('active')) {
            timeRange = button.value;
            simulateData(chartData, timeRange);

            //just to set last data value coherently
            if (timeRange != 'day') {
                chartData[timeRange][chartData[timeRange].length - 1].y = chartData['day'][chartData['day'].length - 1].y;
            }

            swapChart.data.datasets[0].data = chartData[timeRange];
            swapChart.data.datasets[0].backgroundColor = redOrGreenGradient(.5, 0);
            swapChart.data.datasets[0].borderColor = redOrGreen(chartData[timeRange]);

            swapChart.update();
        }
    })
});

 /*
Console max and min value of chartData[timeRange], its range and lowest/highest point of y axis:

console.log(`min: ${getMinValue(chartData[timeRange])}
            max: ${getMaxValue(chartData[timeRange])}
            range: ${valuesRange(chartData[timeRange])}
            min y: ${Math.round(getMinValue(chartData[timeRange]) - (valuesRange(chartData[timeRange])/3))}
            max y: ${Math.round(getMaxValue(chartData[timeRange]) + (valuesRange(chartData[timeRange])/9))}`);
*/


