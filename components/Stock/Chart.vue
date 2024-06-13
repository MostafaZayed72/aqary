<template>
    <div id="container" class="chart mx-auto rounded-lg sm:w-100 md:w-[90%]" style="height: 600px; min-width: 310px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  // احصل على المعلمة id من الرابط
  const route = useRoute();
  const stockSymbol = ref(route.params.id.toUpperCase());
  
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(true);
  
  async function fetchData() {
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol.value}?apikey=2YrQJiN4rDLCH2PfOsj5Up9utgAsazNN`
      );
      const json = await response.json();
      data.value = json.historical.slice(0, 50);
      isLoading.value = false;
    } catch (err) {
      error.value = err;
      isLoading.value = false;
    }
  }
  
  await fetchData();
  
  if (process.client) {
    const Highcharts = await import('highcharts/highstock');
  
    onMounted(() => {
      if (data.value) {
        const priceData = data.value.map(item => [
          new Date(item.date).getTime(),
          item.open,
          item.high,
          item.low,
          item.close
        ]);
  
        const volumeData = data.value.map(item => [
          new Date(item.date).getTime(),
          item.volume
        ]);
  
        Highcharts.stockChart('container', {
          chart: {
            backgroundColor: 'transparent'
          },
          rangeSelector: {
            selected: 1,
            inputStyle: {
              color: '#2caffe',
            },
          },
          title: {
            text: `${stockSymbol.value} Price and Volume`,
            style: {
              color: '#2caffe'
            }
          },
          xAxis: {
            type: 'datetime',
            labels: {
              style: {
                color: '#2caffe'
              }
            }
          },
          yAxis: [{
            title: {
              text: 'Price',
              style: {
                color: '#2caffe'
              }
            },
            labels: {
              style: {
                color: '#2caffe'
              }
            },
            height: '60%',
            lineWidth: 2
          }, {
            title: {
              text: 'Volume',
              style:{
                color:'#2caffe' 
              } 
            }, 
            top:'65%', 
            height:'35%', 
            offset :0, 
            lineWidth :2  
          }],
          series:[{
            type:'candlestick', 
            name:'Stock Price', 
            data :priceData, 
            tooltip:{
              valueDecimals :2  
            },  
            yAxis :0,  
            upColor:'#00FF00', 
            color:'#FF0000' 
          },{
            type :'column', 
            name :'Volume', 
            data :volumeData,  
            yAxis :1,  
            color:'#2caffe' 
          }],
          plotOptions:{
            series:{
              dataGrouping:{
                enabled:false 
              },
              turboThreshold :0 
            }
          },
          legend:{
            itemStyle:{
              color:'#2caffe'   
            }   
          }   
        });
      }
    });
  }
  </script>
  
  <style scoped>
  #container {
    height: 600px;
    min-width: 310px;
  }
  </style>
  