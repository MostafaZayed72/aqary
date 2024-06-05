<template>
  <div id="container" style="height: 600px; min-width: 310px"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsVue from 'highcharts-vue';

HighchartsStock(Highcharts);

// بيانات عشوائية للسعر والفوليوم لمدة 15 يومًا
const priceData = [
  [Date.UTC(2023, 5, 1), 24, 28, 22, 26],
  [Date.UTC(2023, 5, 2), 26, 29, 25, 28],
  [Date.UTC(2023, 5, 3), 28, 30, 27, 29],
  [Date.UTC(2023, 5, 4), 29, 31, 28, 30],
  [Date.UTC(2023, 5, 5), 30, 32, 29, 31],
  [Date.UTC(2023, 5, 6), 31, 33, 30, 32],
  [Date.UTC(2023, 5, 7), 32, 34, 31, 33],
  [Date.UTC(2023, 5, 8), 33, 35, 32, 34],
  [Date.UTC(2023, 5, 9), 34, 36, 33, 35],
  [Date.UTC(2023, 5, 10), 35, 37, 34, 36],
  [Date.UTC(2023, 5, 11), 36, 38, 35, 37],
  [Date.UTC(2023, 5, 12), 37, 39, 36, 38],
  [Date.UTC(2023, 5, 13), 38, 40, 37, 39],
  [Date.UTC(2023, 5, 14), 39, 41, 38, 40],
  [Date.UTC(2023, 5, 15), 40, 42, 39, 41]
];

const volumeData = [
  [Date.UTC(2023, 5, 1), 1500],
  [Date.UTC(2023, 5, 2), 1800],
  [Date.UTC(2023, 5, 3), 1700],
  [Date.UTC(2023, 5, 4), 2000],
  [Date.UTC(2023, 5, 5), 1600],
  [Date.UTC(2023, 5, 6), 2200],
  [Date.UTC(2023, 5, 7), 2100],
  [Date.UTC(2023, 5, 8), 1900],
  [Date.UTC(2023, 5, 9), 2300],
  [Date.UTC(2023, 5, 10), 2400],
  [Date.UTC(2023, 5, 11), 2500],
  [Date.UTC(2023, 5, 12), 2600],
  [Date.UTC(2023, 5, 13), 2700],
  [Date.UTC(2023, 5, 14), 2800],
  [Date.UTC(2023, 5, 15), 2900]
];

onMounted(() => {
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Stock Price and Volume'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: [{
      title: {
        text: 'Price'
      },
      height: '60%',
      lineWidth: 2
    }, {
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],
    series: [{
      type: 'candlestick',
      name: 'Stock Price',
      data: priceData,
      tooltip: {
        valueDecimals: 2
      },
      yAxis: 0
    }, {
      type: 'column',
      name: 'Volume',
      data: volumeData,
      yAxis: 1
    }]
  });
});
</script>

<style scoped>
#container {
  height: 600px;
  min-width: 310px;
}
</style>
