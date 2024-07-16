<template>
  <StockNumbers />
  <StockChart />

  <div v-if="company" class="nav rounded-lg">
    <v-card class="mx-auto my-4 nav rounded-lg">
      <v-card-title class="headline text-center">{{ $t(company.companyName) }}</v-card-title>
      <img :src="company.image" class="white--text my-4 rounded mx-auto" />

      <v-card-subtitle class="text-center">{{ company.industry }} | {{ company.sector }}</v-card-subtitle>
      <v-card-text class="text-center">
        <div class="mb-4">
          <strong>{{ $t('CEO') }}:</strong> {{ company.ceo }}
        </div>
        <div class="mb-4">
          <strong>{{ $t('Price') }}:</strong> {{ formatNumber(company.price) }} {{ $t('SAR') }}
        </div>
        <div class="mb-4">
          <strong>{{ $t('Market Cap') }}:</strong> {{ formatNumber(company.mktCap) }}
        </div>
        <div class="mb-4">
          <strong>{{ $t('Website') }}:</strong>
          <a :href="company.website" target="_blank" class="text-blue-500 underline">
            {{ company.website }}
          </a>
        </div>
        <div class="mb-4">
          <strong>{{ $t('Description') }}:</strong>
          <p>{{ company.description }}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const company = ref(null);
const error = ref(null);
const isLoading = ref(true);

// احصل على المعلمة id من الرابط
const route = useRoute();
const symbol = ref(route.params.id.toUpperCase());

const formatNumber = (number) => {
  if (number !== null && number !== undefined) {
    return Number(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return number;
};

async function fetchCompanyProfile(symbol) {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`
    );
    const json = await response.json();
    company.value = json[0];
    isLoading.value = false;
  } catch (err) {
    error.value = err;
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchCompanyProfile(symbol.value);
});
</script>

<style scoped>
/* يمكنك إضافة أنماط إضافية هنا إذا لزم الأمر */
</style>
