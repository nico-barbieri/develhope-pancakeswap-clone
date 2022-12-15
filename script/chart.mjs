let $swapGraph = document.getElementById('swap-graph').getContext("2d");

let chartData = []; //empty array of data which will be filled randomly with simulateData()
let gradient = $swapGraph.createLinearGradient(0, 0, 0, 250);
let delayed;

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
let simulateData = (array) => {
    if (!array[0]) {
        let startingPoint = 70;
        for (let i = 0; i < 24; i++) {
            let value = array[0]? array[array.length - 1].y : startingPoint;
            array.push({
                // calculate current time in ms and then subtract 1h (3600000ms) * (24 - i) to populate chartData
                // first pushed value will be 24h before current hour
                x: Date.now() - (3600000 * (24 - i)), 
                y: randomSum(value, 6),
            })
        }
    }
}

simulateData(chartData);

//detect if last value of chartData is bigger than the first and return green or red dependently
let redOrGreen = (array, opacity = 1) => {
    let color = 'grey';
    if (array[0]) {
        color = (array[1].y>array[array.length - 1].y)? `rgba(237,75,158, ${opacity})` : `rgba(49,208,170, ${opacity})`;
    }
    return color;
}

//update gradient
let updateGradient = (gradient, opacity1 = 1, opacity2 = 0) =>{
    gradient.addColorStop(0, redOrGreen(chartData, opacity1));
    gradient.addColorStop(1, redOrGreen(chartData, opacity2));
    return gradient;
}

// chart data
const data = {
    //labels: chartLabels,
    datasets: [{
        label: 'BNB/CAKE',
        data: chartData,
        backgroundColor: updateGradient(gradient, .5, 0),
        borderColor: redOrGreen(chartData),
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
                suggestedMin: Math.round(getMinValue(chartData) - (valuesRange(chartData)/3)),
                suggestedMax: Math.round(getMaxValue(chartData) + (valuesRange(chartData)/6)),
                //bg grid settings (in this case, it's hidden)
                grid:  {
                    display: false,
                },
                //y axis is hidden
                display: true,
            }
        },
        tension: .1, 
        fill: true,
        elements: {
            point: {
                radius: 0,
            }
        },

        //delay animation on chart render 
        //https://www.chartjs.org/docs/latest/samples/animations/delay.html

        animation: {
            onComplete: () => {
              delayed = true;
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

console.log(`min: ${getMinValue(chartData)}
max: ${getMaxValue(chartData)}
range: ${valuesRange(chartData)}
min y: ${Math.round(getMinValue(chartData) - (valuesRange(chartData)/3))}
max y: ${Math.round(getMaxValue(chartData) + (valuesRange(chartData)/6))}
`
);
