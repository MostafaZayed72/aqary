<template>
    <v-card :title="$t('Favorite Stocks')" flat class="navy rounded-lg text-center mx-auto sm:w-100 md:w-[90%] mt-10" :style="$i18n.locale === 'ar-AR' ? 'direction:rtl' : 'direction:ltr'">
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
        hide-default-footer
        hide-default-pagination
      >
        <template v-slot:item.symbol="{ item }">
          <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ $t(item.symbol) }}</a>
        </template>
        <template v-slot:item.name="{ item }">
          {{ $t(item.name) }}
        </template>
        <template v-slot:item.price="{ item }">
          {{ formatNumber(item.price) }}
        </template>
        <template v-slot:item.changesPercentage="{ item }">
          <span :class="getChangeClass(item.changesPercentage)">
            {{ formatNumber(item.changesPercentage) }}%
          </span>
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
        <template v-slot:item.exchange="{ item }">
          {{ item.exchange }}
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
        <template v-slot:item.earningsAnnouncement="{ item }">
          {{ item.earningsAnnouncement }}
        </template>
        <template v-slot:item.sharesOutstanding="{ item }">
          {{ formatNumber(item.sharesOutstanding) }}
        </template>
        <template v-slot:item.timestamp="{ item }">
          {{ item.timestamp }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="deleteStock(item)" color="error" outlined>{{ $t('Delete') }}</v-btn>
        </template>
      </v-data-table>
  
      <!-- Show loading message when fetching data -->
      <div v-else class="text-center pa-4">
        Loading...
      </div>
  
      <!-- Confirmation Dialog -->
      <v-dialog v-model="confirmDeleteDialog" max-width="400">
        <template v-slot:activator="{ on }"></template>
        <v-card :style="$i18n.locale === 'ar-AR' ? 'direction:rtl' : 'direction:ltr'">
          <v-card-title>{{ $t('Confirm Deletion') }}</v-card-title>
          <v-card-text>
            {{ $t('Are you sure you want to delete this stock?') }}
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="hideDeleteDialog">{{ $t('No') }}</v-btn>
            <v-btn color="error" text @click="confirmDelete">{{ $t('Yes') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  const myEmail = ref('');
  const confirmDeleteDialog = ref(false); // Add this line
  let currentStock = null; // Add this line
  
  // Fetch favorite symbols on component mount
  onMounted(() => {
    myEmail.value = localStorage.getItem('email') || '';
    fetchFavoriteSymbols();
  });
  
  // Define columns for the data table
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
    { key: 'actions', titleKey: 'Delete' }
  ];
  
  // Function to fetch favorite symbols
  const fetchFavoriteSymbols = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`https://development.somee.com/api/FavoriteSymbol/GetSymbols?UserEmail=${myEmail.value}`);
      const symbols = response.data.map(item => item.symbolName);
  
      // Fetch stock details for each symbol
      for (const symbol of symbols) {
        const stockResponse = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`);
        if (stockResponse.data && stockResponse.data.length > 0) {
          stocks.value.push(stockResponse.data[0]);
        }
      }
    } catch (err) {
      error.value = err.message;
      console.error('There was a problem with the fetch operation:', err);
    } finally {
      loading.value = false;
    }
  };
  
  // Computed property for translated columns
  const translatedColumns = computed(() => {
    return columns.map(col => ({
      ...col,
      title: t(col.titleKey)
    }));
  });
  
  // Watch locale for language changes
  watch(locale, () => {
    // Handle language change if needed
  });
  
  // Function to format numbers to two decimal places
  const formatNumber = (number) => {
    return parseFloat(number).toFixed(2);
  };
  
  // Function to get CSS class based on change percentage
  const getChangeClass = (change) => {
    return change < 0 ? 'text-red-500' : 'text-green-500';
  };
  
  // Function to delete stock from favorite list
  const deleteStock = async (stock) => {
    // Store the current stock for deletion confirmation
    currentStock = stock;
    // Show delete confirmation dialog
    confirmDeleteDialog.value = true;
  };
  
  // Confirm deletion action
  const confirmDelete = async () => {
    if (!currentStock) {
      console.error('Stock object is not defined.');
      return;
    }
  
    const symbolName = currentStock.symbol; // Assuming 'symbol' is the property containing the symbol name
    try {
      // Send DELETE request
      await axios.post(`https://development.somee.com/api/FavoriteSymbol/deleteSymbol?UserEmail=${myEmail.value}&SymbolName=${symbolName}`);
    
    // Remove the stock from local array after successful deletion
    const index = stocks.value.findIndex(item => item.symbol === currentStock.symbol);
    if (index !== -1) {
      stocks.value.splice(index, 1);
    }
  } catch (err) {
    console.error('Failed to delete stock:', err);
    // Optionally handle error (e.g., show an error message to the user)
  } finally {
    // Hide the confirmation dialog
    confirmDeleteDialog.value = false;
  }
};

// Hide delete confirmation dialog
const hideDeleteDialog = () => {
  confirmDeleteDialog.value = false;
};

// Computed property for filtered stocks based on search query
const filteredStocks = computed(() => {
  return stocks.value.filter(stock =>
    Object.values(stock).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});

// Function to navigate to stock details page
const navigateToStock = (symbol) => {
  router.push(`/stocks/${symbol}`);
};

useHead({
  title: 'My Shares'
})

// Define the page meta if needed
</script>

<style scoped>
/* Scoped styles for the component */
#container {
  height: 600px;
  min-width: 310px;
}

.text-red-500 {
  color: red;
}

.text-green-500 {
  color: green;
}
</style>
  