<template>
  <v-data-table-server
    class="nav"
    v-model:items-per-page="itemsPerPage"
    :headers="translatedHeaders"
    :items="formattedServerItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="date"
    @update:options="loadItems"
    :style="$i18n.locale === 'ar-AR' ? 'direction: rtl;' : 'direction: ltr;'"
  ></v-data-table-server>
</template>

<script setup>
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ref, computed, watchEffect } from 'vue';

const route = useRoute();
const { t } = useI18n();

const itemsPerPage = ref(5);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const formatNumber = (number) => {
  if (number !== null && number !== undefined) {
    return Number(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return number;
};

const translatedHeaders = computed(() => [
  { title: t('date'), key: 'date', align: 'start' },
  { title: t('totalAssets'), key: 'totalAssets', align: 'start' },
  { title: t('totalLiabilities'), key: 'totalLiabilities', align: 'start' },
  { title: t('totalEquity'), key: 'totalEquity', align: 'start' },
  { title: t('netDebt'), key: 'netDebt', align: 'start' },
  { title: t('cashAndCashEquivalents'), key: 'cashAndCashEquivalents', align: 'start' },
  { title: t('shortTermInvestments'), key: 'shortTermInvestments', align: 'start' },
  { title: t('cashAndShortTermInvestments'), key: 'cashAndShortTermInvestments', align: 'start' },
  { title: t('netReceivables'), key: 'netReceivables', align: 'start' },
  { title: t('inventory'), key: 'inventory', align: 'start' },
  { title: t('otherCurrentAssets'), key: 'otherCurrentAssets', align: 'start' },
  { title: t('totalCurrentAssets'), key: 'totalCurrentAssets', align: 'start' },
  { title: t('propertyPlantEquipmentNet'), key: 'propertyPlantEquipmentNet', align: 'start' },
  { title: t('goodwill'), key: 'goodwill', align: 'start' },
  { title: t('intangibleAssets'), key: 'intangibleAssets', align: 'start' },
  { title: t('goodwillAndIntangibleAssets'), key: 'goodwillAndIntangibleAssets', align: 'start' },
  { title: t('longTermInvestments'), key: 'longTermInvestments', align: 'start' },
  { title: t('taxAssets'), key: 'taxAssets', align: 'start' },
  { title: t('otherNonCurrentAssets'), key: 'otherNonCurrentAssets', align: 'start' },
  { title: t('totalNonCurrentAssets'), key: 'totalNonCurrentAssets', align: 'start' },
  { title: t('otherAssets'), key: 'otherAssets', align: 'start' },
  { title: t('accountPayables'), key: 'accountPayables', align: 'start' },
  { title: t('shortTermDebt'), key: 'shortTermDebt', align: 'start' },
  { title: t('taxPayables'), key: 'taxPayables', align: 'start' },
  { title: t('deferredRevenue'), key: 'deferredRevenue', align: 'start' },
  { title: t('otherCurrentLiabilities'), key: 'otherCurrentLiabilities', align: 'start' },
  { title: t('totalCurrentLiabilities'), key: 'totalCurrentLiabilities', align: 'start' },
  { title: t('longTermDebt'), key: 'longTermDebt', align: 'start' },
  { title: t('deferredRevenueNonCurrent'), key: 'deferredRevenueNonCurrent', align: 'start' },
  { title: t('deferredTaxLiabilitiesNonCurrent'), key: 'deferredTaxLiabilitiesNonCurrent', align: 'end' },
  { title: t('otherNonCurrentLiabilities'), key: 'otherNonCurrentLiabilities', align: 'start' },
  { title: t('capitalLeaseObligations'), key: 'capitalLeaseObligations', align: 'start' },
  { title: t('preferredStock'), key: 'preferredStock', align: 'start' },
  { title: t('commonStock'), key: 'commonStock', align: 'start' },
  { title: t('retainedEarnings'), key: 'retainedEarnings', align: 'start' },
  { title: t('accumulatedOtherComprehensiveIncomeLoss'), key: 'accumulatedOtherComprehensiveIncomeLoss', align: 'start' },
  { title: t('othertotalStockholdersEquity'), key: 'othertotalStockholdersEquity', align: 'start' },
  { title: t('totalStockholdersEquity'), key: 'totalStockholdersEquity', align: 'start' },
  { title: t('totalEquity'), key: 'totalEquity', align: 'start' },
  { title: t('totalLiabilitiesAndStockholdersEquity'), key: 'totalLiabilitiesAndStockholdersEquity', align: 'start' },
  { title: t('minorityInterest'), key: 'minorityInterest', align: 'start' },
  { title: t('totalLiabilitiesAndTotalEquity'), key: 'totalLiabilitiesAndTotalEquity', align: 'start' },
  { title: t('totalInvestments'), key: 'totalInvestments', align: 'start' },
  { title: t('totalDebt'), key: 'totalDebt', align: 'start' },
]);

const symbol = ref(route.params.id.toUpperCase());

const formattedServerItems = computed(() => {
  return serverItems.value.map(item => {
    const formattedItem = {};
    for (const key in item) {
      formattedItem[key] = typeof item[key] === 'number' ? formatNumber(item[key]) : item[key];
    }
    return formattedItem;
  });
});

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`);
    const financials = response.data.financialsAnnual.balance;
    if (sortBy.length) {
      const sortKey = sortBy[0].key;
      const sortOrder = sortBy[0].order;
      financials.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      });
    }
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    serverItems.value = financials.slice(start, end);
    totalItems.value = financials.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  symbol.value = route.params.id.toUpperCase();
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
});
</script>
