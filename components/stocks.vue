<template>
  <div id="chartContainer"></div>
</template>

<script>
import Highcharts from 'highcharts';
import axios from 'axios';

export default {
  mounted() {
    this.fetchStockData();
  },
  methods: {
    async fetchStockData() {
      const stockSymbol = 'TSLA'; // قم بتغييره إلى الرمز الخاص بالسهم الذي تريد رسم بياناته
      try {
        const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}`);
        const data = response.data.chart.result[0];

        // تحضير البيانات للرسم
        const dates = data.timestamp.map(timestamp => new Date(timestamp * 1000));
        const prices = data.indicators.quote[0].close;

        // تكوين الرسم البياني
        Highcharts.chart('chartContainer', {
          title: {
            text: `Stock Price for ${stockSymbol}`
          },
          xAxis: {
            categories: dates
          },
          yAxis: {
            title: {
              text: 'Price'
            }
          },
          series: [{
            name: 'Stock Price',
            data: prices
          }]
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    }
  }
}
</script>

<style scoped>
#chartContainer {
  height: 400px;
}
</style>
