<template>
  <div>
    <h1>بيانات Yahoo Finance</h1>
    <div v-if="yahooData">
      <p>سعر الفتح: {{ yahooData.chart.result[0].indicators.quote[0].open }}</p>
      <p>سعر الاغلاق: {{ yahooData.chart.result[0].indicators.quote[0].close }}</p>
      <!-- قم بعرض المزيد من البيانات حسب الحاجة -->
    </div>
    <div v-else>
      <p>جاري التحميل...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const yahooData = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/2350.SR');
    console.log('success')
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    yahooData.value = await response.json();
  } catch (error) {
    console.log('Error fetching Yahoo data:', error);
  }
});
</script>
