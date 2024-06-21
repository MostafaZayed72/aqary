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
          <template v-for="field in financialFields" v-slot:[`item.${field}`]="{ item }">
            {{ formatCurrency(item[field]) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const financials = ref([]);
  const filteredFinancials = ref([]);
  const loading = ref(true);
  const symbol = ref(route.params.id.toUpperCase());
  
  onMounted(async () => {
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`
      );
      const data = await response.json();
  
      // Ensure to use financialsQuarter.balance instead of financialsAnnual.income
      financials.value = data.financialsQuarter.income.map(item => {
        const { symbol, period, acceptedDate, reportedCurrency, date, link, cik, finalLink, ...rest } = item;
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
    // Add more headers as needed
  ];
  
  // Define financial fields to display in the table
  const financialFields = [
    'revenue',
    'costOfRevenue',
    'grossProfit',
    'researchAndDevelopmentExpenses',
    'generalAndAdministrativeExpenses',
    'operatingIncome',
    'netIncome'
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
  