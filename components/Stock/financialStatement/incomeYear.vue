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
  
  onMounted(async () => {
    try {
      const response = await fetch(
       `https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`
      );
      const data = await response.json();
  
      // Ensure to use financialsAnnual.income instead of financialsQuarter.balance
      financials.value = data.financialsAnnual.income.map(item => {
        const { symbol,period, acceptedDate, reportedCurrency, date, link, cik, finalLink, ...rest } = item;
        return rest;
      });
  
      // Update filteredFinancials after fetching data
      filteredFinancials.value = financials.value;
  
      // Ensure loading stops after data is fetched
      loading.value = false;
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.value = false; // Make sure loading stops on error too
    }
  });
  
  // Define table headers with specified text and value properties
  const tableHeaders = [
    { text: 'Date', value: 'date' },
    // Add more headers as needed
  ];
  </script>
  
  <style scoped>
  /* Add custom scoped styles if necessary */
  </style>
  