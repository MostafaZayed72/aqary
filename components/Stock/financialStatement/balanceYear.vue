<template>
  <v-card class="nav rounded-lg">
    <v-card-text>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
      <v-data-table
        v-else
        :items="filteredFinancials"
        class="elevation-1 nav"
        hide-default-footer
      >
        <!-- Scoped slot for customizing table cell content -->
        <template v-for="field in assetFields" v-slot:[`item.${field}`]="{ item }">
          {{ formatCurrency(item[field]) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Access route params
const financials = ref([]);
const filteredFinancials = ref([]);
const loading = ref(true);
const symbol = ref(route.params.id.toUpperCase()); // Dynamically get symbol from route

onMounted(async () => {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`
    );
    const data = await response.json();
console.log(route.params.id.toUpperCase())
    // Filter out 'cik' and 'finalLink' columns from financials
    financials.value = data.financialsAnnual.balance.map(item => {
      const { symbol,period, acceptedDate, reportedCurrency, date, link, cik, finalLink, ...rest } = item;
      return rest;
    });

    filteredFinancials.value = financials.value;

    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});

// Define table headers with specified text and value properties
const tableHeaders = [
  { text: 'Date', value: 'date' },
  { text: 'Cash & Cash Equivalents', value: 'cashAndCashEquivalents' },
  { text: 'Short-Term Investments', value: 'shortTermInvestments' },
  { text: 'Net Receivables', value: 'netReceivables' },
  { text: 'Inventory', value: 'inventory' },
  { text: 'Other Current Assets', value: 'otherCurrentAssets' },
  { text: 'Total Current Assets', value: 'totalCurrentAssets' },
  { text: 'Property Plant Equipment Net', value: 'propertyPlantEquipmentNet' },
  { text: 'Goodwill', value: 'goodwill' },
  { text: 'Intangible Assets', value: 'intangibleAssets' },
  { text: 'Total Non-Current Assets', value: 'totalNonCurrentAssets' },
  { text: 'Total Assets', value: 'totalAssets' }
];

// Define asset fields to display in the table
const assetFields = [
  'cashAndCashEquivalents',
  'shortTermInvestments',
  'netReceivables',
  'inventory',
  'otherCurrentAssets',
  'totalCurrentAssets',
  'propertyPlantEquipmentNet',
  'goodwill',
  'intangibleAssets',
  'totalNonCurrentAssets',
  'totalAssets'
];

// Helper function to format currency and remove SAR symbol
const formatCurrency = (amount) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR'
  }).format(amount).replace('SAR', '').trim();
};
</script>

<style scoped>
/* Add custom scoped styles if necessary */
</style>
