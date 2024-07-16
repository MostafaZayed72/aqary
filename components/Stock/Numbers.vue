<template>
  <div v-if="isLoading" class=" nav" :style="$i18n.locale === 'ar-AR' ? 'direction:rtl' : 'direction:ltr'">
    <p>Loading...</p>
  </div>
  <div v-else-if="sessionData" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
    <v-container :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
      <v-card class="mx-auto my-4 nav rounded-lg " :style="$i18n.locale === 'ar-AR' ? 'direction:rtl' : 'direction:ltr'">
        <v-card-title class="headline text-center">{{ $t(sessionData.name) }}</v-card-title>
        <v-card-subtitle class="text-center">{{ $t(sessionData.symbol) }} | {{ sessionData.exchange }}</v-card-subtitle>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Price') }}:</strong> {{ formatNumber(sessionData.price) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Change') }}:</strong> {{ sessionData.change }} ({{ sessionData.changesPercentage }}%)
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Day Low') }}:</strong> {{ formatNumber(sessionData.dayLow) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Day High') }}:</strong> {{ formatNumber(sessionData.dayHigh) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Year Low') }}:</strong> {{ formatNumber(sessionData.yearLow) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Year High') }}:</strong> {{ formatNumber(sessionData.yearHigh) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Market Cap') }}:</strong> {{ formatMarketCap(sessionData.marketCap) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Volume') }}:</strong> {{ formatNumber(sessionData.volume) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Average Volume') }}:</strong> {{ formatNumber(sessionData.avgVolume) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Open') }}:</strong> {{ formatNumber(sessionData.open) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Previous Close') }}:</strong> {{ formatNumber(sessionData.previousClose) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('EPS') }}:</strong> {{ sessionData.eps }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('P/E Ratio') }}:</strong> {{ sessionData.pe }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Earnings Announcement') }}:</strong> {{ formatDate(sessionData.earningsAnnouncement) }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
  <div v-else class="p-4 nav">
    <p>No session data available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const sessionData = ref(null);
const error = ref(null);
const isLoading = ref(true);

const route = useRoute();
const symbol = ref(route.params.id.toUpperCase());

const formatNumber = (number) => {
  if (number !== null && number !== undefined) {
    return Number(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return number;
};

async function fetchSessionData() {
  try {
    const response = await fetch(
      `https://finrep.net/api/StockMarket/GetQuoteSymbolData?symbol=${symbol.value}`
    );
    const json = await response.json();
    sessionData.value = json[0];
    isLoading.value = false;
  } catch (err) {
    error.value = err;
    isLoading.value = false;
  }
}

function formatMarketCap(value) {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + ' T';
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + ' B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + ' M';
  } else {
    return value;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  return formattedDate.replace('ص', '');
}

onMounted(() => {
  fetchSessionData();
});
</script>
