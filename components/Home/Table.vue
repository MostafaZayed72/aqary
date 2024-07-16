<template>
  <v-card :title="$t('Stocks Filter')" flat class="nav rounded-lg text-center mx-auto sm:w-100 md:w-[90%]">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        :label="$t('Search')"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="nav rounded"
      ></v-text-field>
    </template>

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4"></v-progress-linear>

    <v-data-table 
      v-if="!loading"
      class="nav rounded-lg"
      :headers="translatedColumns"
      :items="filteredStocks"
      :search="search"
      item-value="symbol"
    >
      <template v-slot:item.symbol="{ item }">
        <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ $t(item.symbol) }}</a>
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
      <template v-slot:item.change="{ item }">
        {{ formatNumber(item.change) }}
      </template>
      <template v-slot:item.dayLow="{ item }">
        {{ formatNumber(item.dayLow) }}
      </template>
      <template v-slot:item.dayHigh="{ item }">
        {{ formatNumber(item.dayHigh) }}
      </template>
      <template v-slot:item.yearHigh="{ item }">
        {{ formatNumber(item.yearHigh) }}
      </template>
      <template v-slot:item.yearLow="{ item }">
        {{ formatNumber(item.yearLow) }}
      </template>
      <template v-slot:item.marketCap="{ item }">
        {{ formatNumber(item.marketCap) }}
      </template>
      <template v-slot:item.priceAvg50="{ item }">
        {{ formatNumber(item.priceAvg50) }}
      </template>
      <template v-slot:item.priceAvg200="{ item }">
        {{ formatNumber(item.priceAvg200) }}
      </template>
      <template v-slot:item.volume="{ item }">
        {{ formatNumber(item.volume) }}
      </template>
      <template v-slot:item.avgVolume="{ item }">
        {{ formatNumber(item.avgVolume) }}
      </template>
      <template v-slot:item.open="{ item }">
        {{ formatNumber(item.open) }}
      </template>
      <template v-slot:item.previousClose="{ item }">
        {{ formatNumber(item.previousClose) }}
      </template>
      <template v-slot:item.eps="{ item }">
        {{ formatNumber(item.eps) }}
      </template>
      <template v-slot:item.pe="{ item }">
        {{ formatNumber(item.pe) }}
      </template>
      <template v-slot:item.sharesOutstanding="{ item }">
        {{ formatNumber(item.sharesOutstanding) }}
      </template>
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
import axios from 'axios';

const search = ref('');
const stocks = ref([]);
const loading = ref(false);
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
  // { key: 'timestamp', titleKey: 'Timestamp' },
];

const fetchStocks = async () => {
  loading.value = true;
  error.value = null;

  try {
    const apiKey = "yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh";
    const response = await axios.get(`https://finrep.net/api/StockMarket/GetMainSymbolData`);
    
    if (response.status !== 200) throw new Error('Network response was not ok');

    const data = response.data;
    stocks.value = data.map(stock => ({
      ...stock,
      symbol: stock.symbol.replace('.sr', '')
    }));
  } catch (err) {
    error.value = err.message;
    console.error('There was a problem with the fetch operation:', err);
  } finally {
    loading.value = false;
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
  // تنسيق الأرقام لعرضها بفواصل لكل 3 أرقام
  if (number !== null && number !== undefined) {
    return parseFloat(number).toLocaleString();
  }
  return number;
};

const filteredStocks = computed(() => {
  return stocks.value.filter(stock =>
    Object.values(stock).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
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
