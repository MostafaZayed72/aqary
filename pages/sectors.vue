<template>
  <v-card :title="$t('Filter stocks by sector')" flat class="navy rounded-lg text-center mx-auto sm:w-100 md:w-[90%]">
    <template v-slot:text>
      <v-text-field v-model="search" :label="$t('Search')" prepend-inner-icon="mdi-magnify" variant="outlined"
        hide-details single-line class="navy rounded"></v-text-field>

      <!-- Filter Chips for Sectors -->
      <div class="flex flex-wrap nav">
        <div class="nav" v-for="(sector, index) in sectors" :key="sector">
          <v-chip :value="sector" class="ma-1 hover:bg-teal-400 delayed bg-gray-500 text-white" color="primary" label>
            {{ $t(sector) }}
          </v-chip>
        </div>
      </div>

    </template>

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4"></v-progress-linear>

    <v-data-table v-if="!loading" class="navy rounded-lg text-start" :headers="translatedColumns"
      :items="filteredStocks" :search="search" item-value="symbol">
      <template v-slot:item.symbol="{ item }">
        <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ $t(item.symbol) }}</a>
      </template>
      <template v-slot:item.name="{ item }">
        <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ translateName(item.name) }}</a>
      </template>
      <template v-slot:item.sector="{ item }">
        {{ $t(item.sector) }}
      </template>
      <template v-slot:item.price="{ item }">
        {{ formatNumber(item.price) }}
      </template>
      <template v-slot:item.changesPercentage="{ item }">
        {{ formatNumber(item.changesPercentage) }}%
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

const search = ref('');
const stocks = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedSector = ref([]);
const { t, locale } = useI18n();
const router = useRouter();
const sectors = ref([
  'Consumer Cyclical',
  'Basic Materials',
  'Industrials',
  'Consumer Defensive',
  'Healthcare',
  'Technology',
  'Utilities',
  'Energy',
  'Real Estate',
  'Communication Services',
  'Financial Services',
  'All'
]);

const columns = [
  { key: 'symbol', titleKey: 'Symbol' },
  { key: 'name', titleKey: 'Name' },
  { key: 'price', titleKey: 'Price' },
  { key: 'marketCap', titleKey: 'Market Cap' },
  { key: 'sharesOutstanding', titleKey: 'Shares Outstanding' },
  { key: 'pe', titleKey: 'PE' },
  { key: 'earningsAnnouncement', titleKey: 'Earnings Announcement' },
  { key: 'yearHigh', titleKey: 'Year High' },
  { key: 'yearLow', titleKey: 'Year Low' },
  // Add more columns as needed
];

const fetchStocks = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      'https://development.somee.com/api/StockMarket/GetAllSymbolData?apikey=pYR3gnW9oyf6juDsf5rtdP7hs2d8wuHg'
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    stocks.value = data;
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
  selectedSector.value = []; // Reset selected sectors when language changes
});

const formatNumber = (number) => {
  return parseFloat(number).toFixed(2);
};

const filteredStocks = computed(() => {
  let result = stocks.value;

  if (selectedSector.value.length > 0 && !selectedSector.value.includes('All')) {
    result = result.filter(stock => selectedSector.value.includes(stock.sector));
  }

  if (search.value) {
    result = result.filter(stock =>
      Object.values(stock).some(value =>
        String(value).toLowerCase().includes(search.value.toLowerCase())
      )
    );
  }

  // Filter out stocks with empty or undefined sector
  result = result.filter(stock => stock.sector && stock.sector !== "");

  return result;
});

const translateName = (name) => {
  return t(name);
};

const navigateToStock = (symbol) => {
  router.push(`/stocks/${symbol}`);
};
</script>

<style scoped>
.delayed {
  transition: 0.5s;
}

.v-chip-group {
  display: flex !important;
  flex-wrap: wrap !important;
}
</style>
