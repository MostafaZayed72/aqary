<template>
    <div >
      <div id="container" ></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import Highcharts from 'highcharts';
  
  let chart;
  
  const createChart = () => {
    chart = Highcharts.chart('container', {
      chart: {
        backgroundColor: '', // تغيير لون الخلفية هنا
        className: 'nav' // إضافة الفئة المخصصة هنا
      },
      title: {
        text: 'القيمة الدفترية',
        align: 'center',
        style: {
        color: '#06b6d4', // لون النص
        padding: '30px', // هوامش داخلية لتحسين التباين
        borderRadius: '5px' // تقويس الزوايا للشكل المستطيل
      }      },
      subtitle: {
        useHTML: true,
        text: `<span style="font-size: 80px">60%</span>
                <br>
                <span style="font-size: 22px">
                    عنصر 1: <b>60%</b> - عنصر 2: <b>40%</b>
                </span>`,
        floating: true,
        verticalAlign: 'middle',
        y: 30
      },
  
      legend: {
        enabled: false
      },
  
      tooltip: {
        valueDecimals: 2,
        valueSuffix: '%'
      },
  
      plotOptions: {
        series: {
          borderWidth: 0,
          colorByPoint: true,
          type: 'pie',
          size: '100%',
          innerSize: '80%',
          dataLabels: {
            enabled: true,
            crop: false,
            distance: '-10%',
            style: {
              fontWeight: 'bold',
              fontSize: '16px'
            },
            connectorWidth: 0
          }
        }
      },
      colors: ['#FCE700', '#B8E8FC'],
      series: [
        {
          type: 'pie',
          name: 'نسبة العناصر',
          data: [
            { name: 'عنصر 1', y: 60 },
            { name: 'عنصر 2', y: 40 }
          ]
        }
      ]
    });
  };
  
  onMounted(() => {
    createChart();
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 500px; /* يمكنك تعديل هذا حسب الحاجة */
    background-color: #f0f0f0; /* تغيير لون الخلفية هنا أيضًا لتجنب أي فرق بصري */
  }
  
  .custom-chart { /* الفئة المخصصة للرسم البياني */
    border: 2px solid #000; /* إضافة إطار أسود حول الرسم البياني */
    padding: 10px; /* إضافة مسافة داخلية */
    border-radius: 10px; /* إضافة زوايا مستديرة */
    /* يمكنك إضافة المزيد من الأنماط هنا */
  }
  </style>
  