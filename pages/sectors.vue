<template>
  <v-card :title="$t('Filter stocks by sectors')" flat class="navy rounded-lg text-center mx-auto sm:w-100 md:w-[90%]">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        :label="$t('Search')"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="navy rounded"
      ></v-text-field>
    </template>

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4"></v-progress-linear>

    <v-data-table 
      v-if="!loading"
      class="navy rounded-lg"
      :headers="translatedColumns"
      :items="filteredStocks"
      :search="search"
    >
      <template #item.symbol="{ item }">
        <td class="text-center">
          <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ item.symbol }}</a>
        </td>
      </template>
      <template #item.companyName="{ item }">
        <td class="text-center">
          <a @click.prevent="navigateToStock(item.symbol)" href="#">{{ $t(item.companyName) }}</a>
        </td>
      </template>
      <template #item.price="{ item }">
        <td class="text-center">{{ formatNumber(item.price) }}</td>
      </template>
      <template #item.lastAnnualDividend="{ item }">
        <td class="text-center">{{ formatNumber(item.lastAnnualDividend) }}</td>
      </template>
      <template #item.volume="{ item }">
        <td class="text-center">{{ formatNumber(item.volume) }}</td>
      </template>
      <template #item.exchangeShortName="{ item }">
        <td class="text-center">{{ item.exchangeShortName }}</td>
      </template>
      <template #item.sector="{ item }">
        <td class="text-center">{{ item.sector }}</td>
      </template>
      <template #item.industry="{ item }">
        <td class="text-center">{{ item.industry }}</td>
      </template>
      <template #item.marketCap="{ item }">
        <td class="text-center">{{ formatNumber(item.marketCap) }}</td>
      </template>
      <template #item.beta="{ item }">
        <td class="text-center">{{ item.beta }}</td>
      </template>
    </v-data-table>

    <div v-else class="text-center pa-4">
      Loading...
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const search = ref('');
const stocks = ref([]);
const loading = ref(false); // حالة التحميل
const error = ref(null);
const { t, locale } = useI18n();
const router = useRouter();

const columns = [
  { key: 'symbol', titleKey: 'Symbol' },
  { key: 'companyName', titleKey: 'Company Name' },
  { key: 'price', titleKey: 'Price' },
  { key: 'lastAnnualDividend', titleKey: 'Last Annual Dividend' },
  { key: 'volume', titleKey: 'Volume' },
  { key: 'exchangeShortName', titleKey: 'Exchange' },
  { key: 'sector', titleKey: 'Sector' },
  { key: 'industry', titleKey: 'Industry' },
  { key: 'marketCap', titleKey: 'Market Cap' },
  { key: 'beta', titleKey: 'Beta' },
];

const fetchStocks = async () => {
  loading.value = true; // بدء التحميل
  try {
    const response = await fetch(
      'https://financialmodelingprep.com/api/v3/stock-screener?apikey=2YrQJiN4rDLCH2PfOsj5Up9utgAsazNN'
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    stocks.value = data.slice(0, 50);
  } catch (err) {
    error.value = err.message;
    console.error('There was a problem with the fetch operation:', err);
  } finally {
    loading.value = false; // انتهاء التحميل
  }
};

onMounted(() => {
  fetchStocks();
});

const translatedColumns = computed(() => {
  return columns.map(col => ({
    ...col,
    title: t(col.titleKey),
    align: 'center' // تحديد مركز النص
  }));
});

watch(locale, () => {
  // تحديث العناوين عند تغيير اللغة
});

const formatNumber = (number) => {
  // تنسيق الأرقام لعرض رقمين بعد الفاصلة العشرية
  return parseFloat(number).toFixed(2);
};

const filteredStocks = computed(() => {
  return stocks.value.filter(stock =>
    Object.values(stock).some(value =>
      String(value).toLowerCase().startsWith(search.value.toLowerCase())
    )
  );
});

const navigateToStock = (symbol) => {
  router.push(`/stocks/${symbol}`);
};
</script>

<style scoped>
#container {
  height: 600px;
  min-width: 310px;
}
</style>
