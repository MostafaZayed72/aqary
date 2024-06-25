<template>
    <div class="flex flex-col md:flex-row gap-4">
        <div class="flex flex-col justify-center items-center bg-gray-200 h-fit my-auto rounded-lg">
            <h1 class="bg-gray-400 font-bold text-white text-xl px-6 py-2 rounded-lg mb-6">Indicators</h1>
            <div class="flex gap-6 md:gap-0 md:flex-col">
                <v-switch v-model="showSMA" label="SMA (10)" color="green" @change="toggleSMA"></v-switch>
                <v-switch v-model="showMACD" label="MACD" color="green" @change="toggleMACD"></v-switch>
                <v-switch v-model="showRSI" label="RSI" color="green" @change="toggleRSI"></v-switch>
            </div>
        </div>
        <div class="nav rounded-lg flex-1 dark-background" id="container" style="height: 600px; min-width: 310px;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Highcharts from 'highcharts/highstock';

// Function to generate dummy candlestick and volume data starting from 2023
const generateCandlestickData = () => {
    const data = [];
    let currentDate = new Date('2023-11-01').getTime(); // Start from November 1, 2023

    // Generate 70 candlesticks
    for (let i = 0; i < 70; i++) {
        const open = Math.random() * 10 + 120;
        const high = open + Math.random() * 5;
        const low = open - Math.random() * 5;
        const close = Math.random() * (high - low) + low;
        const volume = Math.random() * 1000 + 100; // Generate random volume

        data.push({
            x: currentDate,
            open,
            high,
            low,
            close,
            volume
        });

        currentDate += 24 * 3600 * 1000; // Increase date by one day
    }

    return data; // Data is already in order from oldest to newest
};

// Function to calculate EMA (Exponential Moving Average)
const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let emaArray = [];
    let ema = data[0].close; // start with the first data point

    emaArray.push([data[0].x, ema]);

    for (let i = 1; i < data.length; i++) {
        ema = data[i].close * k + ema * (1 - k);
        emaArray.push([data[i].x, ema]);
    }

    return emaArray;
};

// Function to calculate MACD (Moving Average Convergence Divergence)
const calculateMACD = (data) => {
    const shortPeriod = 12;
    const longPeriod = 26;
    const signalPeriod = 9;

    const shortEMA = calculateEMA(data, shortPeriod).map(d => d[1]);
    const longEMA = calculateEMA(data, longPeriod).map(d => d[1]);
    const macdLine = data.map((d, i) => [d.x, shortEMA[i] - longEMA[i]]);
    const signalLine = calculateEMA(macdLine.map(d => ({ x: d[0], close: d[1] })), signalPeriod);
    const macdHistogram = macdLine.map((d, i) => [d[0], d[1] - signalLine[i][1]]);

    return {
        macdLine,
        signalLine,
        macdHistogram
    };
};

// Function to calculate SMA (Simple Moving Average)
const calculateSMA = (data, period) => {
    const smaData = [];
    let total = 0;

    for (let i = 0; i < period - 1; i++) {
        smaData.push([data[i].x, null]); // Fill initial null values
        total += data[i].close; // Accumulate total for average calculation
    }

    for (let i = period - 1; i < data.length; i++) {
        total += data[i].close; // Add current close price to total
        const average = total / period; // Calculate SMA
        smaData.push([data[i].x, parseFloat(average.toFixed(2))]); // SMA value
        total -= data[i - period + 1].close; // Remove oldest close price from total
    }

    return smaData;
};

// Function to calculate RSI (Relative Strength Index)
const calculateRSI = (data) => {
    const period = 14;
    let gains = 0;
    let losses = 0;
    const rsiData = [];

    for (let i = 1; i < period; i++) {
        const change = data[i].close - data[i - 1].close;
        if (change > 0) {
            gains += change;
        } else {
            losses -= change;
        }
    }

    for (let i = period; i < data.length; i++) {
        const change = data[i].close - data[i - 1].close;
        if (change > 0) {
            gains = (gains * (period - 1) + change) / period;
            losses = (losses * (period - 1)) / period;
        } else {
            gains = (gains * (period - 1)) / period;
            losses = (losses * (period - 1) - change) / period;
        }

        const rs = gains / losses;
        const rsi = 100 - 100 / (1 + rs);
        rsiData.push([data[i].x, rsi]);
    }

    return rsiData;
};

// Generate dummy data
const candlestickData = generateCandlestickData();
// Extract OHLC data for candlestick chart
const ohlc = candlestickData.map(item => [item.x, item.open, item.high, item.low, item.close]);
// Extract volume data
const volumeData = candlestickData.map(item => [item.x, item.volume]);
// Calculate SMA with period 10
const smaData = calculateSMA(candlestickData, 10);
// Calculate MACD
const macdResult = calculateMACD(candlestickData);
const { macdLine, signalLine, macdHistogram } = macdResult;
// Calculate RSI
const rsiData = calculateRSI(candlestickData);

// Create upper, lower, and middle lines for RSI channel
const rsiUpper = rsiData.map(point => [point[0], 70]);
const rsiLower = rsiData.map(point => [point[0], 30]);
const rsiMiddle = rsiData.map(point => [point[0], 50]);

const chart = ref(null); // Reference to the Highcharts chart instance
const showSMA = ref(true); // State to track if SMA is shown
const showMACD = ref(true); // State to track if MACD is shown
const showRSI = ref(true); // State to track if RSI is shown

const toggleSMA = () => {
    if (chart.value) {
        const smaSeries = chart.value.get('sma');
        if (smaSeries) {
            smaSeries.setVisible(showSMA.value, false);
        }
    }
};

const toggleMACD = () => {
    if (chart.value) {
        const macdSeries = chart.value.get('macd');
        if (macdSeries) {
            macdSeries.setVisible(showMACD.value, false);
        }
        const signalSeries = chart.value.get('signal');
        if (signalSeries) {
            signalSeries.setVisible(showMACD.value, false);
        }
        const histogramSeries = chart.value.get('histogram');
        if (histogramSeries) {
            histogramSeries.setVisible(showMACD.value, false);
        }
    }
};

const toggleRSI = () => {
    if (chart.value) {
        const rsiSeries = chart.value.get('rsi');
        if (rsiSeries) {
            rsiSeries.setVisible(showRSI.value, false);
        }
        const upperSeries = chart.value.get('rsiUpper');
        if (upperSeries) {
            upperSeries.setVisible(showRSI.value, false);
        }
        const lowerSeries = chart.value.get('rsiLower');
        if (lowerSeries) {
            lowerSeries.setVisible(showRSI.value, false);
        }
        const midSeries = chart.value.get('rsiMid');
        if (midSeries) {
            midSeries.setVisible(showRSI.value, false);
        }
    }
};

onMounted(() => {
    createChart();
});

// Function to create the Highcharts chart
const createChart = () => {
    chart.value = Highcharts.stockChart('container', {
        chart: {
            backgroundColor: '#e5e5e5', // Set the background color of the chart to white
        },
        rangeSelector: {
            selected: 1 // Default range selection
        },
        title: {
            text: 'Candlestick Chart with SMA, MACD, and RSI'
        },
        subtitle: {
            text: 'Dummy Data'
        },
        xAxis: {
            type: 'datetime',
            min: Date.UTC(2023, 10, 1), // November 1, 2023
            max: Date.UTC(2023, 11, 10), // December 10, 2023
            labels: {
                format: '{value:%Y-%m-%d}', // Format date labels
                rotation: 45,
                align: 'left'
            }
        },
        yAxis: [{
            startOnTick: false,
            endOnTick: false,
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '40%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '45%',
            height: '15%',
            offset: 0,
            lineWidth: 2
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'MACD'
            },
            top: '65%', // Increased top value to add more space
            height: '15%',
            offset: 0,
            lineWidth: 2
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'RSI'
            },
            top: '85%', // Adjusted top value accordingly
            height: '15%',
            offset: 0,
            lineWidth: 2
        }],
        tooltip: {
            split: true
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL',
            id: 'aapl',
            zIndex: 2,
            data: ohlc,
            color: 'red', // Default color for falling candles
            upColor: 'green', // Color for rising candles
        }, {
            type: 'column',
            name: 'Volume',
            id: 'volume',
            data: volumeData,
            yAxis: 1
        }, {
            type: 'line',
            name: 'SMA (10)',
            id: 'sma',
            data: smaData,
            yAxis: 0,
            color: 'red',
            lineWidth: 1,
            visible: showSMA.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'column',
            name: 'MACD Histogram',
            id: 'histogram',
            data: macdHistogram,
            yAxis: 2,
            color: 'gray',
            visible: showMACD.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'line',
            name: 'MACD Line',
            id: 'macd',
            data: macdLine,
            yAxis: 2,
            color: 'blue',
            lineWidth: 1,
            visible: showMACD.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'line',
            name: 'Signal Line',
            id: 'signal',
            data: signalLine,
            yAxis: 2,
            color: 'red',
            lineWidth: 1,
            visible: showMACD.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'line',
            name: 'RSI',
            id: 'rsi',
            data: rsiData,
            yAxis: 3,
            color: 'blue',
            lineWidth: 5,
            visible: showRSI.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'line',
            name: 'RSI Upper',
            id: 'rsiUpper',
            data: rsiUpper,
            yAxis: 3,
            color: 'black',
            visible: showRSI.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'line',
            name: 'RSI Lower',
            id: 'rsiLower',
            data: rsiLower,
            yAxis: 3,
            color: 'black',
            visible: showRSI.value,
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'line',
            name: 'RSI Middle',
            id: 'rsiMiddle',
            data: rsiMiddle,
            yAxis: 3,
            color: 'black',
            visible: showRSI.value,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
};
</script>

<style scoped>
#container {
    height: 600px;
    min-width: 310px;
}
.dark-background {
    background-color: #000; /* Set the background color of the chart container to black */
}
</style>
