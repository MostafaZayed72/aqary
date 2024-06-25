<template>
    <v-container class="nav rounded-lg" :style="$i18n.locale === 'ar-AR' ? 'direction:rtl' : 'direction:ltr'">
      <v-card class="nav rounded-lg ">
        <v-card-title>
          <h1 class="text-center text-2xl font-bold">{{ $t('Saudi exchange data') }}</h1>
        </v-card-title>
        <v-card-text>
          <div class="grid grid-cols-1 md:grid-cols-3  gap-4 mt-6">
            <div class="flex gap-2 text-center mx-auto">
              <span class="font-bold">{{ $t('Open :') }}</span>
              <span>{{ latestData.open }}</span>
            </div>
            <div class="flex gap-2 text-center mx-auto ">
              <span class="font-bold">{{ $t('Date :') }}</span>
              <span>{{ latestData.date }}</span>
            </div>
            <div class="flex gap-2 text-center mx-auto ">
              <span class="font-bold">{{ $t('Close :') }}</span>
              <span>{{ latestData.close }}</span>
            </div>
            <div class="flex gap-2 text-center mx-auto">
              <span class="font-bold">{{ $t('High :') }}</span>
              <span>{{ latestData.high }}</span>
            </div>
            <div class="flex gap-2 text-center mx-auto">
              <span class="font-bold">{{ $t('Volume :') }}</span>
              <span>{{ latestData.volume }}</span>
            </div>
            <div class="flex gap-2 text-center mx-auto">
              <span class="font-bold">{{ $t('Low :') }}</span>
              <span>{{ latestData.low }}</span>
            </div>
           
          </div>
        </v-card-text>
      </v-card>
     
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const latestData = ref({})
  
  onMounted(async () => {
    const response = await fetch('https://financialmodelingprep.com/api/v3/historical-price-full/%5ETASI.SR?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh')
    const data = await response.json()
    latestData.value = data.historical[0]
  })
  </script>
  
  <style scoped>
  .grid {
    display: grid;
  }
  </style>
  