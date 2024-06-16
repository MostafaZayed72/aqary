<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center text-teal-400">Stock Information</h2>

    <div class="flex flex-col   nav mb-8">
      <v-autocomplete
        v-model="selectedStock"
        :items="stocksListNames"
        label="Select Stock"
        outlined
      ></v-autocomplete>
      <v-btn @click="fetchStockData" color="primary" class="mx-auto w-fit mb-4">Browse</v-btn>
    </div>

    <div class="overflow-x-auto nav">
      <table v-if="stocks.length > 0" class="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden nav">
        <thead class="bg-teal-400">
          <tr>
            <th v-for="(value, key) in stocks[0]" :key="key" class="px-4 py-2 text-left">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in stocks" :key="index">
            <td v-for="(value, key) in stock" :key="key" class="border px-4 py-2 nav">{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center mt-4 text-gray-600">No stock data available. Please select a stock.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedStock = ref(null);
const stocks = ref([]);
const apiKey = 'yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh';
let stocksList = ref([]);

async function fetchStocksList() {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=' + apiKey);
    stocksList.value = response.data.map(stock => ({
      name: stock.name,
      symbol: stock.symbol
    }));
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    alert('Failed to fetch stocks list. Please try again.');
  }
}

async function fetchStockData() {
  if (!selectedStock.value) {
    alert('Please select a stock from the list.');
    return;
  }

  // Find the symbol based on selectedStock name
  const selectedStockSymbol = stocksList.value.find(stock => stock.name === selectedStock.value)?.symbol;
  if (!selectedStockSymbol) {
    alert('Stock symbol not found for selected stock name.');
    return;
  }

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${selectedStockSymbol}?apikey=${apiKey}`);
    stocks.value.push(response.data[0]); // Add fetched stock to the existing stocks array
  } catch (error) {
    console.error('Error fetching stock data:', error);
    alert('Failed to fetch stock data. Please try again.');
  }
}

// Fetch stocks list when component is mounted
onMounted(fetchStocksList);

// Computed property to extract stock names from stocksList
const stocksListNames = computed(() => stocksList.value.map(stock => stock.name));
</script>

<style scoped>
/* Any Tailwind CSS customizations can be added here */
</style>
