<template>
  <v-card :title="$t('Stocks Filter')" flat class="nav rounded-lg text-center">
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

    <v-data-table 
    class="nav rounded-lg"
      :headers="columns"
      :items="filteredStocks"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const search = ref('');
const stocks = ref([]);
const error = ref(null);
const { t } = useI18n();

const columns = [
{ key: 'symbol', title: t('Symbol') },
  { key: 'name', title: t('Name') },
  { key: 'price', title: t('Price') },
  { key: 'changesPercentage', title: t('Changes Percentage') },
  { key: 'change', title: t('Change') },
  { key: 'dayLow', title: t('Day Low') },
  { key: 'dayHigh', title: t('Day High') },
  { key: 'yearHigh', title: t('Year High') },
  { key: 'yearLow', title: t('Year Low') },
  { key: 'marketCap', title: t('Market Cap') },
  { key: 'priceAvg50', title: t('Price Avg 50') },
  { key: 'priceAvg200', title: t('Price Avg 200') },
  { key: 'exchange', title: t('Exchange') },
  { key: 'volume', title: t('Volume') },
  { key: 'avgVolume', title: t('Avg Volume') },
  { key: 'open', title: t('Open') },
  { key: 'previousClose', title: t('Previous Close') },
  { key: 'eps', title: t('EPS') },
  { key: 'pe', title: t('PE') },
  { key: 'earningsAnnouncement', title: t('Earnings Announcement') },
  { key: 'sharesOutstanding', title: t('Shares Outstanding') },
  { key: 'timestamp', title: t('Timestamp') },
];

const fetchStocks = async () => {
  try {
    const response = await fetch(
      'https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=Y7XCNvyL9hb1aHHu548kyeyVLff2Jr4j'
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    stocks.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('There was a problem with the fetch operation:', err);
  }
};

onMounted(() => {
  fetchStocks();
});

const filteredStocks = computed(() => {
  return stocks.value.filter(stock =>
    Object.values(stock).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});
</script>
