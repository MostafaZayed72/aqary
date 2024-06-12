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

    <v-data-table 
      class="navy rounded-lg"
      :headers="translatedColumns"
      :items="filteredStocks"
      :search="search"
    >
      <template #item.{item}>
        <td class="text-center">{{ item.symbol }}</td>
        <td class="text-center">{{ item.companyName }}</td>
        <td class="text-center">{{ item.price }}</td>
        <td class="text-center">{{ item.lastAnnualDividend }}</td>
        <td class="text-center">{{ item.volume }}</td>
        <td class="text-center">{{ item.exchangeShortName }}</td>
        <td class="text-center">{{ item.country }}</td>
        <td class="text-center">{{ item.sector }}</td>
        <td class="text-center">{{ item.industry }}</td>
        <td class="text-center">{{ item.marketCap }}</td>
        <td class="text-center">{{ item.beta }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const search = ref('');
const stocks = ref([]);
const error = ref(null);
const { t, locale } = useI18n();

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
  try {
    const response = await fetch(
      'https://financialmodelingprep.com/api/v3/stock-screener?apikey=MzMorahM3ZyGf4IScs3X7OcDcRhlLSbc'
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    stocks.value = data.slice(0,50);
  } catch (err) {
    error.value = err.message;
    console.error('There was a problem with the fetch operation:', err);
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

const filteredStocks = computed(() => {
  return stocks.value.filter(stock =>
    Object.values(stock).some(value =>
      String(value).toLowerCase().startsWith(search.value.toLowerCase())
    )
  );
});
</script>
