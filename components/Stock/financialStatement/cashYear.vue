<template>
    <v-card class="nav">
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
          :items-per-page="10"
          class="elevation-1 nav"
          hide-default-footer
        >
          <!-- Scoped slot for customizing table cell content -->
          <template v-slot:item.date="{ item }">
            {{ item.date }}
          </template>
          <template v-slot:item.netIncome="{ item }">
            {{ formatCurrency(item.netIncome) }}
          </template>
          <template v-slot:item.depreciationAndAmortization="{ item }">
            {{ formatCurrency(item.depreciationAndAmortization) }}
          </template>
          <template v-slot:item.operatingCashFlow="{ item }">
            {{ formatCurrency(item.operatingCashFlow) }}
          </template>
          <template v-slot:item.freeCashFlow="{ item }">
            {{ formatCurrency(item.freeCashFlow) }}
          </template>
          <template v-slot:item.netCashProvidedByOperatingActivities="{ item }">
            {{ formatCurrency(item.netCashProvidedByOperatingActivities) }}
          </template>
          <template v-slot:item.netCashUsedForInvestingActivites="{ item }">
            {{ formatCurrency(item.netCashUsedForInvestingActivites) }}
          </template>
          <template v-slot:item.netCashUsedProvidedByFinancingActivities="{ item }">
            {{ formatCurrency(item.netCashUsedProvidedByFinancingActivities) }}
          </template>
          <template v-slot:item.netChangeInCash="{ item }">
            {{ formatCurrency(item.netChangeInCash) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute(); // Use useRoute to access route params
  const financials = ref([]);
  const filteredFinancials = ref([]);
  const loading = ref(true);
  const symbol = ref(route.params.id.toUpperCase()); // Get symbol from route params
  
  // Fetch data from API on component mount
  onMounted(async () => {
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`
      );
      const data = await response.json();
  
      // Extract cash data from financialsAnnual
      financials.value = data.financialsAnnual.cash.map(item => {
        const { symbol, deferredIncomeTax, effectOfForexChangesOnCash, period, acceptedDate, reportedCurrency, date, link, cik, finalLink, ...rest } = item;
        return rest;
      });
  
      // Update filteredFinancials after fetching data
      filteredFinancials.value = financials.value;
  
      // Ensure loading stops after data is fetched
      loading.value = false;
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.value = false;
    }
  });
  
  // Define table headers with specified text and value properties
  const tableHeaders = [
    { text: 'Date', value: 'date' },
    { text: 'Net Income', value: 'netIncome' },
    { text: 'Depreciation & Amortization', value: 'depreciationAndAmortization' },
    { text: 'Operating Cash Flow', value: 'operatingCashFlow' },
    { text: 'Free Cash Flow', value: 'freeCashFlow' },
    { text: 'Net Cash Provided by Operating Activities', value: 'netCashProvidedByOperatingActivities' },
    { text: 'Net Cash Used for Investing Activities', value: 'netCashUsedForInvestingActivites' },
    { text: 'Net Cash Used Provided by Financing Activities', value: 'netCashUsedProvidedByFinancingActivities' },
    { text: 'Net Change in Cash', value: 'netChangeInCash' }
  ];
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount).replace('SAR', '').trim();
  };
  </script>
  
  <style scoped>
  /* Add custom scoped styles if necessary */
  </style>
  