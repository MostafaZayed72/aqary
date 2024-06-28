<template>
    <v-card class="nav text-center w-[80%] lg:w-[50%] mx-auto rounded-lg h-fit my-auto py-3" v-if="levels">
      <v-card-title>نقاط الدعم والمقاومة</v-card-title>
      <v-card-text>
        <ul>
          <li v-for="(level, index) in levels" :key="index">{{ level.toFixed(2) }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router'
  
  const route = useRoute();
  const symbol = ref(route.params.id.toUpperCase());

  const levels = ref(false);
  
  onMounted(async () => {
    try {
      const response = await fetch(`https://finnhub.io/api/v1/scan/support-resistance?symbol=${symbol.value}&resolution=D&token=cptgck1r01qnvrr8v9b0cptgck1r01qnvrr8v9bg`);
      const data = await response.json();
      levels.value = data.levels.map(level => parseFloat(level.toFixed(2)));
    } catch (error) {
      console.error('Error fetching support and resistance levels:', error);
    }
  });
  </script>
  
  <style scoped>
  /* تخصيص الستايل حسب الحاجة */
  </style>
  