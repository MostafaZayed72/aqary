<!-- pages/index.vue -->
<template>
    <div class="container mx-auto p-4 w-100 lg:w-[70%]">
      <h1 class="text-2xl font-bold mb-4 text-center nav rounded-lg">Stock Patterns</h1>
      <v-card v-if="pattern" class="p-4 m-4 nav text-center rounded-lg">
        <v-card-title class="text-lg font-bold">{{ pattern.patternname }}</v-card-title>
        <v-card-subtitle class="text-sm ">{{ pattern.patterntype }}</v-card-subtitle>
        <v-card-text>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><strong>Symbol:</strong> {{ pattern.symbol }}</div>
            <div><strong>Status:</strong> {{ pattern.status }}</div>
            <div><strong>Start Time:</strong> {{ formatDate(pattern.start_time) }}</div>
            <div><strong>End Time:</strong> {{ formatDate(pattern.end_time) }}</div>
            <div><strong>Start Price:</strong> {{ pattern.start_price }}</div>
            <div><strong>End Price:</strong> {{ pattern.end_price }}</div>
            <div><strong>Entry:</strong> {{ pattern.entry }}</div>
            <div><strong>Stoploss:</strong> {{ pattern.stoploss }}</div>
            <div><strong>Profit Target 1:</strong> {{ pattern.profit1 }}</div>
          </div>

        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const pattern = ref(null)
  const route = useRoute();
  const symbol = ref(route.params.id.toUpperCase());
  
  const fetchPattern = async () => {
    try {
      const response = await fetch(`https://finnhub.io/api/v1/scan/pattern?symbol=${symbol.value}&resolution=D&token=cptgck1r01qnvrr8v9b0cptgck1r01qnvrr8v9bg`)
      const data = await response.json()
      if (data.points && data.points.length > 0) {
        pattern.value = data.points[0]
      }
    } catch (error) {
      console.error('Error fetching pattern data:', error)
    }
  }
  
  // اتبع التغييرات في قيمة route.params.id
  watch(() => route.params.id, () => {
    symbol.value = route.params.id.toUpperCase()
    fetchPattern()
  })
  
  onMounted(fetchPattern)
  
  const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0') // يوم
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // شهر
  const year = date.getFullYear() // سنة
  return `${day}/${month}/${year}`
}

  </script>
  