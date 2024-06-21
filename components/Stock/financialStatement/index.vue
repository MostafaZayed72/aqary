<template>
    <v-card class="text-center nav rounded-lg  py-10" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
      <v-chips v-model="selectedComponent" class="flex justify-center gap-2">
        <v-chip @click="selectedComponent = 'balance'" :color="selectedComponent === 'balance' ? 'primary' : undefined">{{ $t('Balance sheet by quarter') }}</v-chip>
        <v-chip @click="selectedComponent = 'balanceYear'" :color="selectedComponent === 'balanceYear' ? 'primary' : undefined">{{ $t('Balance sheet by year') }}</v-chip>
        <v-chip @click="selectedComponent = 'income'" :color="selectedComponent === 'income' ? 'primary' : undefined">{{ $t('Income statement by quarter') }}</v-chip>
        <v-chip @click="selectedComponent = 'incomeYear'" :color="selectedComponent === 'incomeYear' ? 'primary' : undefined">{{ $t('Income statement by year') }}</v-chip>
        <v-chip @click="selectedComponent = 'cash'" :color="selectedComponent === 'cash' ? 'primary' : undefined">{{ $t('Cash flow by quarter') }}</v-chip>
        <v-chip @click="selectedComponent = 'cashYear'" :color="selectedComponent === 'cashYear' ? 'primary' : undefined">{{ $t('Cash flow by Year') }}</v-chip>
      </v-chips>
  
      <v-card-text>
        <StockFinancialStatementBalance v-if="selectedComponent === 'balance'" />
        <StockFinancialStatementBalanceYear v-else-if="selectedComponent === 'balanceYear'" />
        <StockFinancialStatementIncomeYear v-else-if="selectedComponent === 'incomeYear'" />
        <StockFinancialStatementIncome v-else-if="selectedComponent === 'income'" />
        <StockFinancialStatementCash v-else-if="selectedComponent === 'cash'" />
        <StockFinancialStatementCashYear v-else-if="selectedComponent === 'cashYear'" />
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedComponent = ref('balance'); // Default selected component
  const selectedColor = ref('primary'); // Default selected color
  
  </script>
  
  <style scoped>
  /* Add Tailwind CSS classes or custom styles */
  </style>
  