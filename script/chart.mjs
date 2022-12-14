let $swapGraph = document.getElementById('swap-graph').getContext("2d");

//empty array of data which will be filled randomly with simulateData()
let chartData = []; 

//detect if last value of chartData is bigger than the first ***NOT WORKING***
let redOrGreen = (array) => {
    return (array[0]<array[array.lenght - 1])? "#ED4B9E" : "#31D0AA";
}

//fill randomly chartData
let simulateData = (array) => {
    if (!array[0]) {
        for (let i = 1; i < 24; i++) {
            array.unshift({
                //calculate current time in ms and then subtract 1h (3600000ms) * i to populate chartData
                x: Date.now() - (3600000 * i), 
                y: Math.random() * (75 - 65) + 60,
            })
        }
    }
}

simulateData(chartData);

const data = {
    //labels: chartLabels,
    datasets: [{
        label: '# of Votes',
        data: chartData,
        backgroundColor: redOrGreen(chartData),
        borderColor: redOrGreen(chartData),
        borderWidth: 1,
    }],
}

const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                parsing: true,
                type: 'realtime',
                realtime: {
                    onRefresh: (chart) => {
                      chart.data.datasets.forEach(function(dataset) {
                        dataset.data.push({
                          x: Date.now(),
                          y: Math.random() * (75 - 65) + 60,
                        });
                        dataset.backgroundColor = dataset.borderColor = redOrGreen(chartData);
                      });
                    },
                    duration: 3600000 * 24,
                    refresh: 3600000,
                },
                grid:  {
                    display: false,
                }
            },
            y: {
                beginAtZero: false,
                grid:  {
                    display: false,
                }
            }
        }
    }
}


simulateData(chartData);
export const swapChart = new Chart($swapGraph, config)
