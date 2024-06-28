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
            <th v-for="(value, key) in stocks[0]" :key="key" v-if="key !== 'symbol'" class="px-4 py-2 text-left">{{ $t(key) }}</th>
            <th class="px-4 py-2 text-left">{{ $t('Delete') }}</th> <!-- إضافة عمود للإجراءات -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in stocks" :key="index">
            <td v-for="(value, key) in stock" :key="key" v-if="key !== 'symbol'" class="border px-4 py-2 nav">
              <!-- استخدام router-link لتحويل المسار عند النقر -->
              <router-link :to="`/stocks/${stock.symbol}`">{{ $t(value) }}</router-link>
            </td>
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const selectedStock = ref(null);
const stocks = ref([]);
const isLoading = ref(false);  // حالة التحميل
const apiKey = 'yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh';
let stocksList = ref([]);

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
  timestamp: 'الطابع الزمني'
};

async function fetchStocksList() {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=${apiKey}`);
    stocksList.value = response.data.map(stock => ({
      name: stock.name,
      symbol: stock.symbol.replace('.sr', '')  // إزالة .sr من الرموز
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

    // تأكد من أن الرمز مضبوط في البيانات
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

const stocksListNames = computed(() => stocksList.value.map(stock => t(`${stock.name}`)));

function translateKey(key) {
  return translations[key] || key;
}

definePageMeta({
  layout: 'custom'
});
</script>

<style scoped>
/* أي تخصيصات لـ Tailwind CSS يمكن إضافتها هنا */
</style>
