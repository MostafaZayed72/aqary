<template>
  <v-card :title="$t('Filter stocks by trending')" flat class="nav rounded-lg text-center mx-auto sm:w-100 md:w-[90%]">


    <!-- Filter Chips for Sectors -->


    <!-- Filter Chips for Trending -->
    <v-chip-group v-model="selectedTrending" class="mt-4 text-center">
      <div class="flex justify-center mx-auto text-center gap-1 md:grid-cols-4 lg:grid-cols-6">
        <v-chip :key="'Uptrend'" :value="'uptrend'"
          class="ma-1 hover:bg-teal-400 delayed text-center flex justify-center items-center rounded-lg w-[150px]"
          color="primary" label="true">
          {{ $t('Uptrend') }}
        </v-chip>
        <v-chip :key="'Downtrend'" :value="'downtrend'"
          class="ma-1 hover:bg-teal-400 delayed text-center flex justify-center items-center rounded-lg w-[150px]"
          color="primary" label="true">
          {{ $t('Downtrend') }}
        </v-chip>
      </div>
    </v-chip-group>

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4"></v-progress-linear>

    <v-data-table v-if="!loading" class="nav rounded-lg text-start v-data-table text-green-700"
      :headers="translatedColumns" :items="filteredStocks" :search="search" item-value="symbol">
      <template v-slot:item.symbol="{ item }">
        <nuxtLink @click.prevent="navigateToStock(item.symbol)" href="#">{{ $t(item.symbol) }}</nuxtLink>
      </template>
      <template v-slot:item.name="{ item }">
        <nuxtLink @click.prevent="navigateToStock(item.symbol)" href="#">{{ translateName(item.name) }}</nuxtLink>
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
      <template v-slot:item.trending="{ item }">
        {{ item.trending ? $t('Uptrend') : $t('Downtrend') }}
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
const trends = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedSector = ref(['All']);
const selectedTrending = ref([]);
const { t, locale } = useI18n();
const router = useRouter();

const columns = [
  { key: 'symbol', titleKey: 'Symbol' },
  { key: 'name', titleKey: 'Name' },
  { key: 'sector', titleKey: 'Sector' },
  { key: 'price', titleKey: 'Price' },
  { key: 'marketCap', titleKey: 'Market Cap' },
  { key: 'sharesOutstanding', titleKey: 'Shares Outstanding' },
  { key: 'pe', titleKey: 'PE' },
  { key: 'earningsAnnouncement', titleKey: 'Earnings Announcement' },
  { key: 'yearHigh', titleKey: 'Year High' },
  { key: 'yearLow', titleKey: 'Year Low' },
  { key: 'trending', titleKey: 'Trending' },
  // Add more columns as needed
];

const fetchStocks = async () => {
  loading.value = true;
  try {
    const [stocksResponse, trendsResponse] = await Promise.all([
      fetch('https://finrep.net/api/StockMarket/GetAllSymbolData?apikey=pYR3gnW9oyf6juDsf5rtdP7hs2d8wuHg'),
      fetch('https://finrep.net/api/StockMarket/GetAllSymbolsTechnicalAnalysis?apikey=pYR3gnW9oyf6juDsf5rtdP7hs2d8wuHg')
    ]);

    if (!stocksResponse.ok) throw new Error('Network response was not ok for stocks');
    if (!trendsResponse.ok) throw new Error('Network response was not ok for trends');

    const [stocksData, trendsData] = await Promise.all([stocksResponse.json(), trendsResponse.json()]);

    // Merge trends data with stocks data
    const trendsMap = new Map(trendsData.map(item => [item.symbol, item.trending]));
    stocks.value = stocksData.map(stock => ({
      ...stock,
      trending: trendsMap.get(stock.symbol)
    }));
    const uptrendStocks = stocksData.filter(stock => trendsMap.get(stock.symbol) === true);
    if (uptrendStocks.length > 0) {
      selectedTrending.value = ['uptrend'];
    }

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

  if (selectedTrending.value.length > 0) {
    result = result.filter(stock => selectedTrending.value.includes(stock.trending ? 'uptrend' : 'downtrend'));
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

useHead({
  title: 'Stocks Trending'
})

</script>

<style scoped>
.delayed {
  transition: 0.5s;
}

v-data-table th,
v-data-table td {
  color: #333;
  /* لون النص في الأعمدة */
  background-color: #f5f5f5;
  /* لون خلفية الأعمدة */
  border-bottom: 1px solid #ddd;
  /* خط سفلي للأعمدة */
  padding: 10px;
  /* تباعد الحشو داخل الأعمدة */
}

/* تحديد الأنماط للعناوين في الجدول */
v-data-table v-data-table-header th {
  background-color: #e0e0e0;
  /* لون خلفية عناوين الأعمدة */
  color: #444;
  /* لون النص في عناوين الأعمدة */
  font-weight: bold;
  /* عرض الخط لعناوين الأعمدة */
}

/* تحديد الأنماط للأعمدة عند التحويل (hover) */
v-data-table tbody tr:hover {
  background-color: #f0f0f0;
  /* لون الخلفية عند التحويل على الصف */
}
</style>