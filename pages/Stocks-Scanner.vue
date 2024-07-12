<template>
  <v-card :title="$t('Stocks Filter')" flat class="nav rounded-lg text-center mx-auto sm:w-100 md:w-[90%]"
    :style="$i18n.locale === 'ar-AR' ? 'direction:rtl' : 'direction:ltr'">
    <template v-slot:text>
      <v-text-field v-model="search" :label="$t('Search')" prepend-inner-icon="mdi-magnify" variant="outlined"
        hide-details single-line class="nav rounded"></v-text-field>
    </template>

    <v-row class="mb-4" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
      <v-col v-for="(column, index) in columnss" :key="index" cols="12" sm="4">
        <v-text-field v-if="column.filterType === 'text'" v-model="filters[column.key]" :label="t(column.titleKey)"
          variant="outlined" hide-details class="nav rounded mx-4"></v-text-field>
        <v-select v-if="column.filterType === 'select'" v-model="filters[column.key]" :items="column.options"
          :label="t(column.titleKey)" variant="outlined" hide-details class="nav rounded"></v-select>
      </v-col>
    </v-row>

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4"></v-progress-linear>

    <v-data-table v-if="!loading" class="nav rounded-lg" :headers="translatedColumns" :items="filteredStocks"
      :search="search" item-value="symbol">
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

const filters = ref({}); // Object to store filter values
const columnss = [
  { key: 'dayHigh', titleKey: 'Day High', filterType: 'text' },
  { key: 'dayLow', titleKey: 'Day Low', filterType: 'text' },
  { key: 'change', titleKey: 'Change', filterType: 'text' },
  { key: 'changesPercentage', titleKey: 'Changes Percentage', filterType: 'text' },
  { key: 'price', titleKey: 'Price', filterType: 'text' },
];

const columns = [
  { key: 'symbol', titleKey: 'Symbol', filterType: 'text' },
  { key: 'name', titleKey: 'Name', filterType: 'text' },
  { key: 'price', titleKey: 'Price', filterType: 'text' },
  { key: 'changesPercentage', titleKey: 'Changes Percentage', filterType: 'text' },
  { key: 'change', titleKey: 'Change', filterType: 'text' },
  { key: 'dayLow', titleKey: 'Day Low', filterType: 'text' },
  { key: 'dayHigh', titleKey: 'Day High', filterType: 'text' },
  { key: 'yearHigh', titleKey: 'Year High', filterType: 'text' },
  { key: 'yearLow', titleKey: 'Year Low', filterType: 'text' },
  { key: 'marketCap', titleKey: 'Market Cap', filterType: 'text' },
  { key: 'priceAvg50', titleKey: 'Price Avg 50', filterType: 'text' },
  { key: 'priceAvg200', titleKey: 'Price Avg 200', filterType: 'text' },
  { key: 'exchange', titleKey: 'Exchange', filterType: 'select', options: ['NYSE', 'NASDAQ', 'AMEX'] },
  { key: 'volume', titleKey: 'Volume', filterType: 'text' },
  { key: 'avgVolume', titleKey: 'Avg Volume', filterType: 'text' },
  { key: 'open', titleKey: 'Open', filterType: 'text' },
  { key: 'previousClose', titleKey: 'Previous Close', filterType: 'text' },
  { key: 'eps', titleKey: 'EPS', filterType: 'text' },
  { key: 'pe', titleKey: 'PE', filterType: 'text' },
  { key: 'earningsAnnouncement', titleKey: 'Earnings Announcement', filterType: 'text' },
  { key: 'sharesOutstanding', titleKey: 'Shares Outstanding', filterType: 'text' },
  { key: 'timestamp', titleKey: 'Timestamp', filterType: 'text' },
];

const fetchStocks = async () => {
  loading.value = true; // بدء التحميل
  try {
    const response = await fetch(
      'https://development.somee.com/StockMarket/GetMainSymbolData'
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    stocks.value = data.map(stock => ({
      ...stock,
      symbol: (stock.symbol)
    }));
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
  return stocks.value.filter(stock => {
    const matchesSearch = Object.values(stock).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    );

    const matchesFilters = Object.keys(filters.value).every(key => {
      return !filters.value[key] || String(stock[key]).toLowerCase().includes(filters.value[key].toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });
});

const navigateToStock = (symbol) => {
  router.push(`/stocks/${symbol}`);
};

useHead({
  title: 'Stocks Scanner'
})

</script>

<style scoped>
#container {
  height: 600px;
  min-width: 310px;
}
</style>
