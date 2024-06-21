<template>
  <v-data-table-server
    class="nav"
    v-model:items-per-page="itemsPerPage"
    :headers="translatedHeaders"
    :items="serverItems"
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

const route = useRoute(); // Access route params
const { t } = useI18n();

const itemsPerPage = ref(5);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

// ترجمة العناوين بشكل ديناميكي باستخدام مفتاح الترجمة
const translatedHeaders = computed(() => [
  { title: t('date'), key: 'date', align: 'start' },
  { title: t('netIncome'), key: 'netIncome', align: 'start' },
  { title: t('depreciationAndAmortization'), key: 'depreciationAndAmortization', align: 'start' },
  { title: t('deferredIncomeTax'), key: 'deferredIncomeTax', align: 'start' },
  { title: t('stockBasedCompensation'), key: 'stockBasedCompensation', align: 'start' },
  { title: t('changeInWorkingCapital'), key: 'changeInWorkingCapital', align: 'start' },
  { title: t('accountsReceivables'), key: 'accountsReceivables', align: 'start' },
  { title: t('inventory'), key: 'inventory', align: 'start' },
  { title: t('accountsPayables'), key: 'accountsPayables', align: 'start' },
  { title: t('otherWorkingCapital'), key: 'otherWorkingCapital', align: 'start' },
  { title: t('otherNonCashItems'), key: 'otherNonCashItems', align: 'start' },
  { title: t('netCashProvidedByOperatingActivities'), key: 'netCashProvidedByOperatingActivities', align: 'start' },
  { title: t('investmentsInPropertyPlantAndEquipment'), key: 'investmentsInPropertyPlantAndEquipment', align: 'start' },
  { title: t('acquisitionsNet'), key: 'acquisitionsNet', align: 'start' },
  { title: t('purchasesOfInvestments'), key: 'purchasesOfInvestments', align: 'start' },
  { title: t('salesMaturitiesOfInvestments'), key: 'salesMaturitiesOfInvestments', align: 'start' },
  { title: t('otherInvestingActivites'), key: 'otherInvestingActivites', align: 'start' },
  { title: t('netCashUsedForInvestingActivites'), key: 'netCashUsedForInvestingActivites', align: 'start' },
  { title: t('debtRepayment'), key: 'debtRepayment', align: 'start' },
  { title: t('commonStockIssued'), key: 'commonStockIssued', align: 'start' },
  { title: t('commonStockRepurchased'), key: 'commonStockRepurchased', align: 'start' },
  { title: t('dividendsPaid'), key: 'dividendsPaid', align: 'start' },
  { title: t('otherFinancingActivites'), key: 'otherFinancingActivites', align: 'start' },
  { title: t('netCashUsedProvidedByFinancingActivities'), key: 'netCashUsedProvidedByFinancingActivities', align: 'start' },
  { title: t('netChangeInCash'), key: 'netChangeInCash', align: 'start' },
  { title: t('cashAtEndOfPeriod'), key: 'cashAtEndOfPeriod', align: 'start' },
  { title: t('cashAtBeginningOfPeriod'), key: 'cashAtBeginningOfPeriod', align: 'start' },
  { title: t('operatingCashFlow'), key: 'operatingCashFlow', align: 'start' },
  { title: t('capitalExpenditure'), key: 'capitalExpenditure', align: 'start' },
  { title: t('freeCashFlow'), key: 'freeCashFlow', align: 'start' }
]);

// استخدام route.params.id لتحديد قيمة الـ symbol في رابط الاستعلام
const symbol = ref(route.params.id.toUpperCase());

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`);
    const financials = response.data.financialsQuarter.cash;
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

// تحميل البيانات عندما يتغير route.params.id
watchEffect(() => {
  symbol.value = route.params.id.toUpperCase();
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [] });
});
</script>
