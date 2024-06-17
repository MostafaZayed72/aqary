<template>
  <v-card :title="$t('Stocks Filter')" flat class="navy rounded-lg text-center mx-auto sm:w-100 md:w-[90%]">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        :label="$t('Search')"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="navy rounded"
      ></v-text-field>
    </template>

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4"></v-progress-linear>

    <v-data-table 
      v-if="!loading"
      class="navy rounded-lg"
      :headers="translatedColumns"
      :items="filteredStocks"
      :search="search"
      item-value="symbol"
    >
      <template v-slot:item.symbol="{ item }">
        <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ item.symbol }}</a>
      </template>
      <template v-slot:item.name="{ item }">
        <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ $t(item.name) }}</a>
      </template>
      <template v-slot:item.price="{ item }">
        {{ formatNumber(item.price) }}
      </template>
      <template v-slot:item.changesPercentage="{ item }">
        {{ formatNumber(item.changesPercentage) }}%
      </template>
      <!-- إضافة المزيد من التواريخ حسب الحاجة -->
    </v-data-table>
    
    <div v-else class="text-center pa-4">
      Loading...
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const search = ref('');
const stocks = ref([]);
const loading = ref(false); // حالة التحميل
const error = ref(null);
const { t, locale } = useI18n();
const router = useRouter();

const columns = [
  { key: 'symbol', titleKey: 'Symbol' },
  { key: 'name', titleKey: 'Name' },
  { key: 'price', titleKey: 'Price' },
  { key: 'changesPercentage', titleKey: 'Changes Percentage' },
  { key: 'change', titleKey: 'Change' },
  { key: 'dayLow', titleKey: 'Day Low' },
  { key: 'dayHigh', titleKey: 'Day High' },
  { key: 'yearHigh', titleKey: 'Year High' },
  { key: 'yearLow', titleKey: 'Year Low' },
  { key: 'marketCap', titleKey: 'Market Cap' },
  { key: 'priceAvg50', titleKey: 'Price Avg 50' },
  { key: 'priceAvg200', titleKey: 'Price Avg 200' },
  { key: 'exchange', titleKey: 'Exchange' },
  { key: 'volume', titleKey: 'Volume' },
  { key: 'avgVolume', titleKey: 'Avg Volume' },
  { key: 'open', titleKey: 'Open' },
  { key: 'previousClose', titleKey: 'Previous Close' },
  { key: 'eps', titleKey: 'EPS' },
  { key: 'pe', titleKey: 'PE' },
  { key: 'earningsAnnouncement', titleKey: 'Earnings Announcement' },
  { key: 'sharesOutstanding', titleKey: 'Shares Outstanding' },
  { key: 'timestamp', titleKey: 'Timestamp' },
];

const fetchStocks = async () => {
  loading.value = true; // بدء التحميل
  try {
    const response = await fetch(
      'https://financialmodelingprep.com/api/v3/symbol/SAU?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh'
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    stocks.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('There was a problem with the fetch operation:', err);
  } finally {
    loading.value = false; // انتهاء التحميل
  }
};

onMounted(() => {
  fetchStocks();
});

const translatedColumns = computed(() => {
  return columns.map(col => ({
    ...col,
    title: t(col.titleKey)
  }));
});

watch(locale, () => {
  // تحديث العناوين عند تغيير اللغة
});

const formatNumber = (number) => {
  // تنسيق الأرقام لعرض رقمين بعد الفاصلة العشرية
  return parseFloat(number).toFixed(2);
};

const filteredStocks = computed(() => {
  return stocks.value.filter(stock =>
    Object.values(stock).some(value =>
      String(value).toLowerCase().startsWith(search.value.toLowerCase())
    )
  );
});

const navigateToStock = (symbol) => {
  router.push(`/stocks/${symbol}`);
};
</script>

<style scoped>
#container {
  height: 600px;
  min-width: 310px;
}
</style>
