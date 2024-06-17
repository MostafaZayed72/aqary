<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  
  export default {
    props: {
      stocksData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        chart: null
      };
    },
    watch: {
      stocksData: {
        handler(newVal) {
          this.updateChart(newVal);
        },
        immediate: true
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        if (this.stocksData.length === 0) {
          return;
        }
  
        const categories = Object.keys(this.stocksData[0]); // Assuming all objects in stocksData have the same keys
        const seriesData = this.stocksData.map(stock => ({
          name: stock.name,
          data: categories.map(key => parseFloat(stock[key])) // Convert data to numbers if needed
        }));
  
        this.chart = Highcharts.chart(this.$refs.chart, {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Stocks Comparison'
          },
          xAxis: {
            categories: categories
          },
          yAxis: {
            title: {
              text: 'Value'
            }
          },
          series: seriesData
        });
      },
      updateChart(newData) {
        if (newData.length === 0 || !this.chart) {
          return;
        }
  
        const categories = Object.keys(newData[0]); // Assuming all objects in newData have the same keys
        const seriesData = newData.map(stock => ({
          name: stock.name,
          data: categories.map(key => parseFloat(stock[key])) // Convert data to numbers if needed
        }));
  
        this.chart.update({
          xAxis: {
            categories: categories
          },
          series: seriesData
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional: add any scoped styles */
  </style>
  