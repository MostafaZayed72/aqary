<template>
  <div class="container mx-auto nav pa-4 rounded my-10">
    <h1 class="text-3xl font-bold my-4 text-center">أعلى 5 أسهم من حيث التغيير في النسبة</h1>
    
    <!-- عرض شرطي لـ "Loading" -->
    <div v-if="loading" class="text-center my-4">
      <p>Loading...</p>
    </div>
    
    <!-- عرض الجدول عندما لا يكون التحميل نشطًا -->
    <v-data-table v-if="!loading" :headers="headers" :items="topStocks" class="elevation-1 nav" hide-default-footer hide-default-pagination>
      <template v-slot:item.name="{ item }">
        <!-- رابط يحتوي على رمز السهم مع توجيه ديناميكي -->
        <nuxt-link :to="`/stocks/${item.symbol}`" class="cursor-pointer">
          <span :class="{'text-green-500': item.changesPercentage >= 0, 'text-red-500': item.changesPercentage < 0}">
            {{ item.name }}
          </span>
        </nuxt-link>
      </template>
      
      <template v-slot:item.changesPercentage="{ item }">
        <span :class="{'text-green-500': item.changesPercentage >= 0, 'text-red-500': item.changesPercentage < 0}">
          {{ formatPercentage(item.changesPercentage) }}
        </span>
      </template>
    </v-data-table>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const headers = [
  { text: 'الشركة', value: 'name' },
  { text: 'التغيير في النسبة', value: 'changesPercentage' }
];

const topStocks = ref([]);
const loading = ref(true); // متغير لتحديد حالة التحميل

// دالة لتنسيق النسبة إلى رقمين بعد الفاصلة
const formatPercentage = (percentage) => {
  return `${parseFloat(percentage).toFixed(2)}%`;
};

onMounted(async () => {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh');
    const stocks = response.data;
    // Sort stocks by changesPercentage descending
    stocks.sort((a, b) => b.changesPercentage - a.changesPercentage);
    // Take top 5 stocks
    topStocks.value = stocks.slice(0, 5);
    loading.value = false; // تعيين قيمة false بعد انتهاء التحميل
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false; // في حالة حدوث خطأ أيضًا، تعيين قيمة false
  }
});
</script>

<style>
/* يمكنك إضافة Tailwind CSS classes أو أنماط مخصصة هنا */
</style>
