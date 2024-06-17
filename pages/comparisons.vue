<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center text-teal-400">{{ $t('Stocks comparison') }}</h2>

    <div class="flex flex-col nav mb-8">
      <v-autocomplete
        class="nav"
        v-model="selectedStock"
        :items="stocksListNames"
        :label="$t('Select stock')"
        outlined
      ></v-autocomplete>
      <v-btn @click="fetchStockData" color="primary" class="mx-auto w-fit mb-4" :disabled="isLoading">{{ isLoading ? $t('Loading...') : $t('Add to comparison list') }}</v-btn>
    </div>

    <div class="overflow-x-auto nav">
      <table v-if="stocks.length > 0" class="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden nav">
        <thead class="bg-teal-400">
          <tr>
            <th v-for="(value, key) in stocks[0]" :key="key" class="px-4 py-2 text-left">{{ $t(key) }}</th>
            <th class="px-4 py-2 text-left">{{ $t('Delete') }}</th> <!-- إضافة عمود للإجراءات -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in stocks" :key="index">
            <td v-for="(value, key) in stock" :key="key" class="border px-4 py-2 nav">{{ $t(value) }}</td>
            <td class="border px-4 py-2 nav">
              <v-btn @click="deleteStock(index)" color="error" outlined>{{ $t('Delete') }}</v-btn> <!-- زر لحذف السهم -->
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
const isLoading = ref(false);  // حالة التحميل
const apiKey = 'yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh';
let stocksList = ref([]);

const translations = {
  symbol: 'الرمز',
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
  timestamp: 'الطابع الزمني'
};

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

  const selectedStockSymbol = stocksList.value.find(stock => stock.name === selectedStock.value)?.symbol;
  if (!selectedStockSymbol) {
    alert('Stock symbol not found for selected stock name.');
    return;
  }

  isLoading.value = true;  // بدء التحميل

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${selectedStockSymbol}?apikey=${apiKey}`);
    stocks.value.push(response.data[0]);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    alert('Failed to fetch stock data. Please try again.');
  } finally {
    isLoading.value = false;  // إنهاء التحميل
  }
}

function deleteStock(index) {
  stocks.value.splice(index, 1); // حذف السهم من قائمة الأسهم
}

onMounted(fetchStocksList);

const stocksListNames = computed(() => stocksList.value.map(stock => stock.name));
const translatedStocksListNames = computed(() => stocksListNames.value.map(name => t(name)));

function translateKey(key) {
  return translations[key] || key;
}

definePageMeta({
  layout: 'custom'
})
</script>

<style scoped>
/* أي تخصيصات لـ Tailwind CSS يمكن إضافتها هنا */
</style>
