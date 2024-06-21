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
  { title: t('revenue'), key: 'revenue', align: 'start' },
  { title: t('costOfRevenue'), key: 'costOfRevenue', align: 'start' },
  { title: t('grossProfit'), key: 'grossProfit', align: 'start' },
  { title: t('grossProfitRatio'), key: 'grossProfitRatio', align: 'start' },
  { title: t('researchAndDevelopmentExpenses'), key: 'researchAndDevelopmentExpenses', align: 'start' },
  { title: t('generalAndAdministrativeExpenses'), key: 'generalAndAdministrativeExpenses', align: 'start' },
  { title: t('sellingAndMarketingExpenses'), key: 'sellingAndMarketingExpenses', align: 'start' },
  { title: t('sellingGeneralAndAdministrativeExpenses'), key: 'sellingGeneralAndAdministrativeExpenses', align: 'start' },
  { title: t('otherExpenses'), key: 'otherExpenses', align: 'start' },
  { title: t('operatingExpenses'), key: 'operatingExpenses', align: 'start' },
  { title: t('costAndExpenses'), key: 'costAndExpenses', align: 'start' },
  { title: t('interestIncome'), key: 'interestIncome', align: 'start' },
  { title: t('interestExpense'), key: 'interestExpense', align: 'start' },
  { title: t('depreciationAndAmortization'), key: 'depreciationAndAmortization', align: 'start' },
  { title: t('ebitda'), key: 'ebitda', align: 'start' },
  { title: t('ebitdaratio'), key: 'ebitdaratio', align: 'start' },
  { title: t('operatingIncome'), key: 'operatingIncome', align: 'start' },
  { title: t('operatingIncomeRatio'), key: 'operatingIncomeRatio', align: 'start' },
  { title: t('totalOtherIncomeExpensesNet'), key: 'totalOtherIncomeExpensesNet', align: 'start' },
  { title: t('incomeBeforeTax'), key: 'incomeBeforeTax', align: 'start' },
  { title: t('incomeBeforeTaxRatio'), key: 'incomeBeforeTaxRatio', align: 'start' },
  { title: t('incomeTaxExpense'), key: 'incomeTaxExpense', align: 'start' },
  { title: t('netIncome'), key: 'netIncome', align: 'start' },
  { title: t('netIncomeRatio'), key: 'netIncomeRatio', align: 'start' },
  { title: t('eps'), key: 'eps', align: 'start' },
  { title: t('epsdiluted'), key: 'epsdiluted', align: 'start' },
  { title: t('weightedAverageShsOut'), key: 'weightedAverageShsOut', align: 'start' },
  { title: t('weightedAverageShsOutDil'), key: 'weightedAverageShsOutDil', align: 'start' },
]);

// استخدام route.params.id لتحديد قيمة الـ symbol في رابط الاستعلام
const symbol = ref(route.params.id.toUpperCase());

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol.value}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`);
    const financials = response.data.financialsQuarter.income;
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
