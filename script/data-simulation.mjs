//empty object of data which will be filled randomly with fakeData.selectDataBasedOnTimeRange()
let chartData = {
    'day': [],
    'week': [],
    'month': [],
    'year': [],
}

// starting from value, return a value in the range [value - range/2, value + range/2]
let randomSum = (value, range = 10) => {
    value += Math.random() * range - (range / 2);
    return value
}

//randomly create an array of data in a span of time for every time unit
const simulateData = (timeRange = 0, timeUnit = 0) => {
    let dataset = [];
    let currentValue = 70;
    let numberOfValues = timeRange / timeUnit;

    for (let i = 0; i < numberOfValues; i++) {
        let value = dataset[0] ? dataset[0].y : currentValue;
        do {
            value = randomSum(value, 2); //how much value is instable: higher values -> more instable
        } while (value < 0);
        dataset.unshift({
            // calculate current time in ms and then subtract (timeMultiplier * i) to populate chartData
            x: (Date.now() - (timeUnit * i)),
            y: value,
        })
    }

    return dataset;
};

//given the array of objects "{x: time in ms, y: value}" which is returned by simulateData
//it creates a smaller array of objects which are 1h*span distant from each others
//and in a time span of given time (default is day).
//This smaller array is set at "time" key in chartData object if that key
//is still empty.
//Note that this fuction "assumes" that the given array has objects of data "1h distant"
//from the each others, like the one returned by simulateData
const selectDataBasedOnTimeRange = (dataset, time = 'day') => {
    if (!chartData[time][0]) {
        let span = 1;
        let dataRange;
        switch (time) {
            case 'day':
                dataRange = timeUnitInMs.day / timeUnitInMs.hour; //hours in a day
                span = 1; //1h
                break;  
            case 'week':
                dataRange = timeUnitInMs.week / timeUnitInMs.hour; //hours in a week
                span = 6; //6h
                break; 
            case 'month':
                dataRange = Math.ceil(timeUnitInMs.averageMonth / timeUnitInMs.hour); //hours in a month
                span = 24 //24h
                break;
            case 'year':
                dataRange = timeUnitInMs.year / timeUnitInMs.hour; //hours in a year
                span = 24 * 15 // ~ half a month in hour (24h * 15d)
                break;
            default:
                dataRange = timeUnitInMs.day / timeUnitInMs.hour; //hours in a day
                span = 1; //1h
                break;
        }

        for (let i = 0; i < dataset.slice(-dataRange).length; i+= span) {
            chartData[time].push(dataset.slice(-dataRange)[i]);
        }
    }
};

export const fakeData = {
    simulateData: simulateData,
    selectDataBasedOnTimeRange: selectDataBasedOnTimeRange,
    chartData: chartData,
}

export const timeUnitInMs = {
    hour: 3600000,
    day: 3600000 * 24,
    week: 3600000 * 24 * 7,
    year: 3600000 * 24 * 365,
    averageMonth: (3600000 * 24 * 365) / 12,
}