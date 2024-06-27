<template>
    <div>
        <h1 class="text-center mt-10 mb-2 text-xl font-bold  w-fit mx-auto px-4 py-2 rounded nav">{{ $t('Select a stock to see its analysis') }}</h1>
      <v-autocomplete
        label="Choose Stock"
        variant="outlined"
        class="cursor-pointer"
        v-model="selectedName"
        :items="apiItems.map(item => item.name)"
      ></v-autocomplete>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const selectedName = ref(null);
  const apiItems = ref([]);
  const selectedSymbol = ref(null);
  
  const fetchStockSymbols = () => {
    const apiKey = 'yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh'; // Replace with your actual API key
    const apiUrl = `https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=${apiKey}`;
  
    axios.get(apiUrl)
      .then(response => {
        apiItems.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  onMounted(fetchStockSymbols);
  
  const updateSelectedSymbol = () => {
    const selectedStock = apiItems.value.find(item => item.name === selectedName.value);
    selectedSymbol.value = selectedStock ? selectedStock.symbol : null;
    
    // Navigate to the selectedSymbol route
    if (selectedSymbol.value) {
      router.push(`/Stock-Analysis/${selectedSymbol.value}`);
    }
  };
  
  watch(() => selectedName.value, updateSelectedSymbol);
  </script>
  