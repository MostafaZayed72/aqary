<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center text-teal-400">{{ $t('Stocks comparison') }}</h2>

    <div class="flex flex-col nav mb-8 rounded-lg">
      <v-autocomplete
        class="nav"
        v-model="selectedStock"
        :items="stocksListNames"
        :label="$t('Select stock')"
        outlined
      ></v-autocomplete>
      <v-btn @click="fetchStockData" color="primary" class="mx-auto w-fit mb-4" :disabled="isLoading">
        {{ isLoading ? $t('Loading...') : $t('Add to comparison list') }}
      </v-btn>
    </div>

    <div class="overflow-x-auto rounded-lg">
      <table
        v-if="stocks.length > 0"
        class="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden rounded-lg"
      >
        <thead class="nav">
          <tr>
            <th v-for="(value, key) in stocks[0]" :key="key" v-if="key !== 'symbol'" class="px-4 py-2 text-left">
              {{ translateKey(key) }}
            </th>
            <th class="px-4 py-2 text-left">{{ $t('Delete') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in stocks" :key="index">
            <td v-for="(value, key) in stock" :key="key" v-if="key !== 'symbol'" class="border px-4 py-2 nav">
              {{ typeof value === 'number' ? formatNumber(value) : value }}
            </td>
            <td class="border px-4 py-2 nav">
              <v-btn @click="deleteStock(index)" color="error" outlined>{{ $t('Delete') }}</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center mt-4 text-gray-600 nav">{{ $t('No stock data available. Please select a stock.') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const selectedStock = ref(null);
const stocks = ref([]);
const isLoading = ref(false);
const stocksList = ref([]);

const translations = {
  name: 'الاسم',
  price: 'السعر',
  change: 'التغيير',
  changesPercentage: 'نسبة التغيير',
  volume: 'حجم التداول',
  marketCap: 'القيمة السوقية',
  avgVolume: 'متوسط حجم التداول',
  pe: 'نسبة السعر إلى الأرباح',
  eps: 'ربحية السهم',
  high: 'أعلى سعر',
  low: 'أدنى سعر',
  open: 'سعر الافتتاح',
  previousClose: 'الإغلاق السابق',
  dayLow: 'أقل سعر خلال اليوم',
  dayHigh: 'أعلى سعر خلال اليوم',
  yearHigh: 'أعلى سعر خلال العام',
  yearLow: 'أقل سعر خلال العام',
  priceAvg50: 'متوسط السعر 50',
  priceAvg200: 'متوسط السعر 200',
  exchange: 'المؤشر',
  earningsAnnouncement: "توزيع الأرباح السنوي",
  sharesOutstanding: 'الأسهم المعلقة',
  // timestamp: 'الطابع الزمني'
};

async function fetchStocksList() {
  try {
    const response = await axios.get('https://finrep.net/api/StockMarket/GetMainSymbolData');
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
    const response = await axios.get(`https://finrep.net/api/StockMarket/GetQuoteSymbolData?symbol=${selectedStockSymbol}`);
    const stockData = response.data[0];

    if (stockData.symbol) {
      stocks.value.push(stockData);
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

function translateKey(key) {
  return translations[key] || key;
}

const formatNumber = (number) => {
  if (typeof number === 'number') {
    return parseFloat(number.toFixed(2)).toLocaleString();
  } else {
    return number;
  }
};

useHead({
  title: 'Comparisons'
});
</script>

<style scoped>
/* تخصيصات لـ Tailwind CSS */
</style>
