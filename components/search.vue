<template>
  <div class="container mx-auto my-auto rounded-xl">
    <div class="flex flex-col nav my-auto rounded-xl">
      <v-autocomplete
        class="nav rounded-xl"
        v-model="selectedStock"
        :items="stocksListNames"
        :label="$t('Select stock')"  
        outlined
        hide-details
        @update:model-value="onModelValueUpdate"
      ></v-autocomplete>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const selectedStock = ref('');
const stocks = ref([]);
const isLoading = ref(false);
const apiKey = 'yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh';
let stocksList = ref([]);

async function fetchStocksList() {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=${apiKey}`);
    stocksList.value = response.data.map(stock => ({
      name: stock.name,
      symbol: stock.symbol.replace('.sr', '')
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

  const selectedStockItem = stocksList.value.find(stock => stock.name === selectedStock.value);
  if (!selectedStockItem) {
    alert('Stock symbol not found for selected stock name.');
    return;
  }

  const selectedStockSymbol = selectedStockItem.symbol;
  isLoading.value = true;

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${selectedStockSymbol}?apikey=${apiKey}`);
    const stockData = response.data[0];

    if (stockData.symbol) {
      stocks.value.push(stockData);
      router.push(`/stocks/${selectedStockSymbol}`);  // توجيه المستخدم إلى المسار المناسب
    } else {
      console.error('Stock data does not contain a symbol:', stockData);
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    alert('Failed to fetch stock data. Please try again.');
  } finally {
    isLoading.value = false;
  }
}

function deleteStock(index) {
  stocks.value.splice(index, 1);
}

onMounted(fetchStocksList);

const stocksListNames = computed(() => stocksList.value.map(stock => stock.name));

function redirectToStockPage() {
  if (selectedStock.value) {
    const selectedStockItem = stocksList.value.find(stock => stock.name === selectedStock.value);
    if (selectedStockItem) {
      router.push(`/stocks/${selectedStockItem.symbol}`);
    } else {
      console.error('Stock item not found for selected stock name:', selectedStock.value);
    }
  }
}

function onModelValueUpdate(value) {
  selectedStock.value = value;
  redirectToStockPage();
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
