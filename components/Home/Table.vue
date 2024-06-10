<template>
  <v-card title="Stocks" flat class="nav rounded-lg">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
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

const columns = [
  { key: 'symbol', title: 'Symbol' },
  { key: 'name', title: 'Name' },
  { key: 'price', title: 'Price' },
  { key: 'changesPercentage', title: 'Changes Percentage' },
  { key: 'change', title: 'Change' },
  { key: 'dayLow', title: 'Day Low' },
  { key: 'dayHigh', title: 'Day High' },
  { key: 'yearHigh', title: 'Year High' },
  { key: 'yearLow', title: 'Year Low' },
  { key: 'marketCap', title: 'Market Cap' },
  { key: 'priceAvg50', title: 'Price Avg 50' },
  { key: 'priceAvg200', title: 'Price Avg 200' },
  { key: 'exchange', title: 'Exchange' },
  { key: 'volume', title: 'Volume' },
  { key: 'avgVolume', title: 'Avg Volume' },
  { key: 'open', title: 'Open' },
  { key: 'previousClose', title: 'Previous Close' },
  { key: 'eps', title: 'EPS' },
  { key: 'pe', title: 'PE' },
  { key: 'earningsAnnouncement', title: 'Earnings Announcement' },
  { key: 'sharesOutstanding', title: 'Shares Outstanding' },
  { key: 'timestamp', title: 'Timestamp' },
];

const fetchStocks = async () => {
  try {
    const response = await fetch(
      'https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=MzMorahM3ZyGf4IScs3X7OcDcRhlLSbc'
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
