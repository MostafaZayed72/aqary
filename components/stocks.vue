<template>
  <div id="container" class="chart mx-auto" style="height: 600px; min-width: 310px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// جلب البيانات من الـ API
const data = ref(null);
const error = ref(null);
const isLoading = ref(true);
const symbol = ref();
async function fetchData() {
  try {
    const response = await fetch(
      'https://financialmodelingprep.com/api/v3/historical-price-full/2222.SR?apikey=Y7XCNvyL9hb1aHHu548kyeyVLff2Jr4j'
    );
    const json = await response.json();
    data.value = json.historical.slice(0, 50);
    symbol.value = json.symbol;
    isLoading.value = false;
  } catch (err) {
    error.value = err;
    isLoading.value = false;
  }
}

await fetchData();

// تأكد من تحميل Highcharts فقط على الجانب العميل
if (process.client) {
  const Highcharts = await import('highcharts/highstock');

  onMounted(() => {
    if (data.value) {
      // تحويل البيانات إلى التنسيق المطلوب لـ Highcharts
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
            color: '#45c8ff', // تغيير لون النص في حقول الإدخال إلى الأسود
          },

        },
        title: {
          text: `${symbol.value} Price and Volume`,
          style: {
            color: '#45c8ff'
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            style: {
              color: '#45c8ff'
            }
          }
        },
        yAxis: [{
          title: {
            text: 'Price',
            style: {
              color: '#45c8ff'
            }
          },
          labels: {
            style: {
              color: '#45c8ff'
            }
          },
          height: '60%',
          lineWidth: 2
        }, {
          title: {
            text: 'Volume',
            style:{
              color:'#45c8ff' 
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
         upColor:'#00FF00', // لون الشموع الخضراء (Up)
         color:'#FF0000' // لون الشموع الحمراء (Down)
       },{
         type :'column', 
         name :'Volume', 
         data :volumeData,  
         yAxis :1,  
         color:'#45c8ff' // لون الفوليوم الأخضر (Up)
       }],
       plotOptions:{
           series:{
             dataGrouping:{
               enabled:false // or groupPixelWidth :10
             },
             turboThreshold :0 // or a higher value like 1000
           }
       },
       legend:{
           itemStyle:{
               color:'#45c8ff'   
           }   
       }   
     });
   }
 });
}
</script>

<style scoped>
#container{
   height :600px;    
   min-width :310px;    
}
</style>
