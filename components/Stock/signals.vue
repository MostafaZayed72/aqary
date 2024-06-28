<template>
    <v-card class="w-[80%] lg:w-[50%] mx-auto nav rounded-lg" text-center>
      <v-card-title class="text-center">{{ $t('Stock Signals') }}</v-card-title>
      <v-card-text>
        <div class="text-center">
          <p><strong>{{$t('General Signal')}}:</strong> {{ $t(signal) }}</p>
          <p><strong>{{ $t('Buy') }}:</strong> {{ count.buy }}</p>
          <p><strong>{{ $t('Neutral') }}:</strong> {{ count.neutral }}</p>
          <p><strong>{{ $t('Sell') }}:</strong> {{ count.sell }}</p>
          <!-- <p><strong>Adx :</strong> {{ trend.adx }}</p> -->
          <p><strong>{{ $t('Direction') }}:</strong> {{ $t(trend.trending ? 'Bullish' : 'Bearish') }}</p>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router'
  
  const route = useRoute();
  const symbol = ref(route.params.id.toUpperCase());


  const analysis = ref(null);
  
  onMounted(async () => {
    try {
      const response = await fetch(`https://finnhub.io/api/v1/scan/technical-indicator?symbol=${symbol.value}&resolution=D&token=cptgck1r01qnvrr8v9b0cptgck1r01qnvrr8v9bg`);
      analysis.value = await response.json();
    } catch (error) {
      console.error('Error fetching technical analysis:', error);
    }
  });
  
  const signal = ref('');
  const count = ref({ buy: 0, neutral: 0, sell: 0 });
  const trend = ref({ adx: 0, trending: false });
  
  // Watch for changes in the analysis value and update the refs accordingly
  import { watch } from 'vue';
  watch(analysis, (newValue) => {
    if (newValue) {
      signal.value = newValue.technicalAnalysis.signal;
      count.value = newValue.technicalAnalysis.count;
      trend.value = newValue.trend;
    }
  });
  </script>
  
  <style scoped>
  /* تخصيص الستايل حسب الحاجة */
  </style>
  