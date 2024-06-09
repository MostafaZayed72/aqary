<template>
  <div id="container" class="chart mx-auto" style="height: 600px; min-width: 310px"></div>
  <!-- {{ data.chart.result[0].indicators }} -->
</template>

<script setup>
import { onMounted } from 'vue';
const { data, error, isLoading } = await useFetch(
  'https://query1.finance.yahoo.com/v8/finance/chart/%5ETASI.SR',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
if (error.value) {
  console.error(error.value)
} else {
  console.log(data.value)
}

// تأكد من تحميل Highcharts فقط على الجانب العميل
if (process.client) {
  const Highcharts = await import('highcharts/highstock');

  // بيانات عشوائية للسعر والفوليوم لمدة 15 يومًا
  const priceData = [
    [Date.UTC(2023, 5, 1), 24, 28, 22, 26],
    [Date.UTC(2023, 5, 2), 26, 29, 25, 28],
    [Date.UTC(2023, 5, 3), 28, 30, 27, 29],
    [Date.UTC(2023, 5, 4), 29, 31, 15, 25],
    [Date.UTC(2023, 5, 5), 30, 32, 9, 20],
    [Date.UTC(2023, 5, 6), 31, 33, 30, 32],
    [Date.UTC(2023, 5, 7), 32, 34, 31, 33],
    [Date.UTC(2023, 5, 8), 33, 35, 32, 34],
    [Date.UTC(2023, 5, 9), 34, 36, 33, 35],
    [Date.UTC(2023, 5, 10), 35, 37, 34, 36],
    [Date.UTC(2023, 5, 11), 36, 38, 35, 37],
    [Date.UTC(2023, 5, 12), 37, 39, 36, 38],
    [Date.UTC(2023, 5, 13), 38, 40, 37, 39],
    [Date.UTC(2023, 5, 14), 39, 41, 38, 40],
    [Date.UTC(2023, 5, 15), 40, 45, 15, 15],
    [Date.UTC(2023, 5, 16), 41, 43, 25, 30],
    [Date.UTC(2023, 5, 17), 42, 44, 41, 43],
    [Date.UTC(2023, 5, 18), 43, 45, 42, 44],
    [Date.UTC(2023, 5, 19), 44, 46, 43, 45],
    [Date.UTC(2023, 5, 20), 45, 47, 44, 46],
    [Date.UTC(2023, 5, 21), 46, 48, 45, 47],
    [Date.UTC(2023, 5, 22), 47, 49, 46, 48],
    [Date.UTC(2023, 5, 23), 48, 50, 20, 25],
    [Date.UTC(2023, 5, 24), 49, 51, 48, 50],
    [Date.UTC(2023, 5, 25), 50, 52, 49, 51],
    [Date.UTC(2023, 5, 26), 51, 53, 50, 52],
    [Date.UTC(2023, 5, 27), 52, 54, 51, 53],
    [Date.UTC(2023, 5, 28), 53, 55, 52, 54],
    [Date.UTC(2023, 5, 29), 54, 56, 53, 55],
    [Date.UTC(2023, 5, 30), 55, 57, 54, 56]
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
    [Date.UTC(2023, 5, 15), 2900],
    [Date.UTC(2023, 5, 16), 3000],
    [Date.UTC(2023, 5, 17), 3100],
    [Date.UTC(2023, 5, 18), 3200],
    [Date.UTC(2023, 5, 19), 3300],
    [Date.UTC(2023, 5, 20), 3400],
    [Date.UTC(2023, 5, 21), 3500],
    [Date.UTC(2023, 5, 22), 3600],
    [Date.UTC(2023, 5, 23), 3700],
    [Date.UTC(2023, 5, 24), 3800],
    [Date.UTC(2023, 5, 25), 3900],
    [Date.UTC(2023, 5, 26), 4000],
    [Date.UTC(2023, 5, 27), 4100],
    [Date.UTC(2023, 5, 28), 4200],
    [Date.UTC(2023, 5, 29), 4300],
    [Date.UTC(2023, 5, 30), 4400]

  ];

  onMounted(() => {
    Highcharts.stockChart('container', {
      chart: {
        backgroundColor: 'transparent' // هنا تم تحديد لون الخلفية إلى الأسود
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Stock Price and Volume',
        style: {
          color: '#FFFFFF' // تغيير لون النص إلى الأبيض
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: '#FFFFFF' // تغيير لون النص إلى الأبيض
          }
        }
      },
      yAxis: [{
        title: {
          text: 'Price',
          style: {
            color: '#FFFFFF' // تغيير لون النص إلى الأبيض
          }
        },
        labels: {
          style: {
            color: '#FFFFFF' // تغيير لون النص إلى الأبيض
          }
        },
        height: '60%',
        lineWidth: 2
      }, {
        title: {
          text: 'Volume',
          style: {
            color: '#FFFFFF' // تغيير لون النص إلى الأبيض
          }
        },
        labels: {
          style: {
            color: '#FFFFFF' // تغيير لون النص إلى الأبيض
          }
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
      }],
      plotOptions: {
        candlestick: {
          color: '#FF0000', // لون الشموع الحمراء
          upColor: '#00FF00' // لون الشموع الخضراء
        }
      },
      legend: {
        itemStyle: {
          color: '#FFFFFF' // تغيير لون النص في الوسيلة التوضيحية إلى الأبيض
        }
      }
    });
  });
}
</script>

<style scoped>
#container {
  height: 600px;
  min-width: 310px;
}
</style>
