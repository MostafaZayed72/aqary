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
    { title: t('calendarYear'), key: 'calendarYear', align: 'start' },
    { title: t('period'), key: 'period', align: 'start' },
    { title: t('currentRatio'), key: 'currentRatio', align: 'start' },
    { title: t('quickRatio'), key: 'quickRatio', align: 'start' },
    { title: t('cashRatio'), key: 'cashRatio', align: 'start' },
    { title: t('daysOfSalesOutstanding'), key: 'daysOfSalesOutstanding', align: 'start' },
    { title: t('daysOfInventoryOutstanding'), key: 'daysOfInventoryOutstanding', align: 'start' },
    { title: t('operatingCycle'), key: 'operatingCycle', align: 'start' },
    { title: t('daysOfPayablesOutstanding'), key: 'daysOfPayablesOutstanding', align: 'start' },
    { title: t('cashConversionCycle'), key: 'cashConversionCycle', align: 'start' },
    { title: t('grossProfitMargin'), key: 'grossProfitMargin', align: 'start' },
    { title: t('operatingProfitMargin'), key: 'operatingProfitMargin', align: 'start' },
    { title: t('pretaxProfitMargin'), key: 'pretaxProfitMargin', align: 'start' },
    { title: t('netProfitMargin'), key: 'netProfitMargin', align: 'start' },
    { title: t('effectiveTaxRate'), key: 'effectiveTaxRate', align: 'start' },
    { title: t('returnOnAssets'), key: 'returnOnAssets', align: 'start' },
    { title: t('returnOnEquity'), key: 'returnOnEquity', align: 'start' },
    { title: t('returnOnCapitalEmployed'), key: 'returnOnCapitalEmployed', align: 'start' },
    { title: t('netIncomePerEBT'), key: 'netIncomePerEBT', align: 'start' },
    { title: t('ebtPerEbit'), key: 'ebtPerEbit', align: 'start' },
    { title: t('ebitPerRevenue'), key: 'ebitPerRevenue', align: 'start' },
    { title: t('debtRatio'), key: 'debtRatio', align: 'start' },
    { title: t('debtEquityRatio'), key: 'debtEquityRatio', align: 'start' },
    { title: t('longTermDebtToCapitalization'), key: 'longTermDebtToCapitalization', align: 'start' },
    { title: t('totalDebtToCapitalization'), key: 'totalDebtToCapitalization', align: 'start' },
    { title: t('interestCoverage'), key: 'interestCoverage', align: 'start' },
    { title: t('cashFlowToDebtRatio'), key: 'cashFlowToDebtRatio', align: 'start' },
    { title: t('companyEquityMultiplier'), key: 'companyEquityMultiplier', align: 'start' },
    { title: t('receivablesTurnover'), key: 'receivablesTurnover', align: 'start' },
    { title: t('payablesTurnover'), key: 'payablesTurnover', align: 'start' },
    { title: t('inventoryTurnover'), key: 'inventoryTurnover', align: 'start' },
    { title: t('fixedAssetTurnover'), key: 'fixedAssetTurnover', align: 'start' },
    { title: t('assetTurnover'), key: 'assetTurnover', align: 'start' },
    { title: t('operatingCashFlowPerShare'), key: 'operatingCashFlowPerShare', align: 'start' },
    { title: t('freeCashFlowPerShare'), key: 'freeCashFlowPerShare', align: 'start' },
    { title: t('cashPerShare'), key: 'cashPerShare', align: 'start' },
    { title: t('payoutRatio'), key: 'payoutRatio', align: 'start' },
    { title: t('operatingCashFlowSalesRatio'), key: 'operatingCashFlowSalesRatio', align: 'start' },
    { title: t('freeCashFlowOperatingCashFlowRatio'), key: 'freeCashFlowOperatingCashFlowRatio', align: 'start' },
    { title: t('cashFlowCoverageRatios'), key: 'cashFlowCoverageRatios', align: 'start' },
    { title: t('shortTermCoverageRatios'), key: 'shortTermCoverageRatios', align: 'start' },
    { title: t('capitalExpenditureCoverageRatio'), key: 'capitalExpenditureCoverageRatio', align: 'start' },
    { title: t('dividendPaidAndCapexCoverageRatio'), key: 'dividendPaidAndCapexCoverageRatio', align: 'start' },
    { title: t('dividendPayoutRatio'), key: 'dividendPayoutRatio', align: 'start' },
    { title: t('priceBookValueRatio'), key: 'priceBookValueRatio', align: 'start' },
    { title: t('priceToBookRatio'), key: 'priceToBookRatio', align: 'start' },
    { title: t('priceToSalesRatio'), key: 'priceToSalesRatio', align: 'start' },
    { title: t('priceEarningsRatio'), key: 'priceEarningsRatio', align: 'start' },
    { title: t('priceToFreeCashFlowsRatio'), key: 'priceToFreeCashFlowsRatio', align: 'start' },
    { title: t('priceToOperatingCashFlowsRatio'), key: 'priceToOperatingCashFlowsRatio', align: 'start' },
    { title: t('priceCashFlowRatio'), key: 'priceCashFlowRatio', align: 'start' },
    { title: t('priceEarningsToGrowthRatio'), key: 'priceEarningsToGrowthRatio', align: 'start' },
    { title: t('priceSalesRatio'), key: 'priceSalesRatio', align: 'start' },
    { title: t('dividendYield'), key: 'dividendYield', align: 'start' },
    { title: t('enterpriseValueMultiple'), key: 'enterpriseValueMultiple', align: 'start' },
    { title: t('priceFairValue'), key: 'priceFairValue', align: 'start' }
]);

// استخدام route.params.id لتحديد قيمة الـ symbol في رابط الاستعلام
const symbol = ref(route.params.id.toUpperCase());

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
    loading.value = true;
    try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/ratios/${symbol.value}?period=quarter&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`);
        let financials = response.data;

        // تحديد النطاق الزمني والفرز
        if (sortBy.length) {
            const sortKey = sortBy[0].key;
            const sortOrder = sortBy[0].order;
            financials.sort((a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];
                return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
            });
        }

        // تقريب الأرقام إلى رقمين بعد الفاصلة العشرية
        financials = financials.map(item => {
            for (let key in item) {
                if (typeof item[key] === 'number') {
                    item[key] = parseFloat(item[key].toFixed(2));
                }
            }
            return item;
        });

        // تقسيم البيانات لعرضها على صفحات
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
