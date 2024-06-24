<template>
    <div id="container" style="height: 600px; min-width: 310px;"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import Highcharts from 'highcharts/highstock';
  
  // Function to generate dummy candlestick and volume data starting from 2023
  const generateCandlestickData = () => {
    const data = [];
    let currentDate = new Date('2023-11-01').getTime(); // Start from January 1, 2023
  
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
  
  // Generate dummy data
  const candlestickData = generateCandlestickData();
  // Extract OHLC data for candlestick chart
  const ohlc = candlestickData.map(item => [item.x, item.open, item.high, item.low, item.close]);
  // Extract volume data
  const volumeData = candlestickData.map(item => [item.x, item.volume]);
  // Calculate SMA with period 10
  const smaData = calculateSMA(candlestickData, 10);
  
  onMounted(() => {
    createChart();
  });
  
  // Function to create the Highcharts chart
  const createChart = () => {
    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 1 // Default range selection
      },
      title: {
        text: 'Candlestick Chart with SMA and Volume'
      },
      subtitle: {
        text: 'Dummy Data'
      },
      xAxis: {
        type: 'datetime',
        min: Date.UTC(2023, 11, 1), // January 1, 2023
        max: Date.UTC(2023, 11, 31), // December 31, 2023
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
        height: '60%',
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
        top: '65%',
        height: '35%',
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
        data: ohlc
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
  </style>
  