<template>
  <v-card class="text-center nav rounded-lg py-10" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
    <v-chips v-model="selectedComponent" class="flex justify-center gap-2">
      <v-chip @click="selectComponent('cashYear')" :color="selectedComponent === 'cashYear' ? 'primary' : undefined">{{ $t('Cash flow by Year') }}</v-chip>
      <v-chip @click="selectComponent('cash')" :color="selectedComponent === 'cash' ? 'primary' : undefined">{{ $t('Cash flow by quarter') }}</v-chip>
      <v-chip @click="selectComponent('incomeYear')" :color="selectedComponent === 'incomeYear' ? 'primary' : undefined">{{ $t('Income statement by year') }}</v-chip>
      <v-chip @click="selectComponent('income')" :color="selectedComponent === 'income' ? 'primary' : undefined">{{ $t('Income statement by quarter') }}</v-chip>
      <v-chip @click="selectComponent('balanceYear')" :color="selectedComponent === 'balanceYear' ? 'primary' : undefined">{{ $t('Balance sheet by year') }}</v-chip>
      <v-chip @click="selectComponent('balance')" :color="selectedComponent === 'balance' ? 'primary' : undefined">{{ $t('Balance sheet by quarter') }}</v-chip>
    </v-chips>

    <v-card-text>
      <StockFinancialStatementBalance v-if="selectedComponent === 'balance'" :data="apiData" />
      <StockFinancialStatementBalanceYear v-else-if="selectedComponent === 'balanceYear'" :data="apiData" />
      <StockFinancialStatementIncomeYear v-else-if="selectedComponent === 'incomeYear'" :data="apiData" />
      <StockFinancialStatementIncome v-else-if="selectedComponent === 'income'" :data="apiData" />
      <StockFinancialStatementCash v-else-if="selectedComponent === 'cash'" :data="apiData" />
      <StockFinancialStatementCashYear v-else-if="selectedComponent === 'cashYear'" :data="apiData" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';

const selectedComponent = ref('balance'); // Default selected component
const apiData = ref([]); // Data from API

const formatNumber = (number) => {
  if (typeof number === 'number') {
    return parseFloat(number.toFixed(2));
  }
  return number;
};

const formatData = (data) => {
  return data.map(item => {
    const formattedItem = {};
    for (const key in item) {
      formattedItem[key] = formatNumber(item[key]);
    }
    return formattedItem;
  });
};

const fetchData = async (component) => {
  try {
    const symbol = 'AAPL'; // Example symbol, replace with actual symbol
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/ratios-ttm/${symbol}?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`);
    apiData.value = formatData(response.data);
  } catch (error) {
    console.error('Error fetching data from API', error);
  }
};

const selectComponent = (component) => {
  selectedComponent.value = component;
  fetchData(component);
};

const downloadExcel = () => {
  const data = apiData.value;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'FinancialData.xlsx');
};

// Fetch initial data
fetchData(selectedComponent.value);
</script>

<style scoped>
/* Add Tailwind CSS classes or custom styles */
</style>
