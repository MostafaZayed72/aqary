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
                <strong>{{ $t('Price') }}:</strong> {{ sessionData.price }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Change') }}:</strong> {{ sessionData.change }} ({{ sessionData.changesPercentage }}%)
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Day Low') }}:</strong> {{ sessionData.dayLow }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Day High') }}:</strong> {{ sessionData.dayHigh }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Year Low') }}:</strong> {{ sessionData.yearLow }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Year High') }}:</strong> {{ sessionData.yearHigh }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Market Cap') }}:</strong> {{ formatMarketCap(sessionData.marketCap) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Volume') }}:</strong> {{ sessionData.volume }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Average Volume') }}:</strong> {{ sessionData.avgVolume }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Open') }}:</strong> {{ sessionData.open }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="mb-4">
                <strong>{{ $t('Previous Close') }}:</strong> {{ sessionData.previousClose }}
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
// استيراد ref و onMounted من Vue
import { ref, onMounted } from 'vue';
// استيراد useRoute من vue-router
import { useRoute } from 'vue-router';

// تعريف sessionData و error كـ ref
const sessionData = ref(null);
const error = ref(null);
// تعريف isLoading كـ ref وتعيينها إلى true في البداية
const isLoading = ref(true);

// استخدام useRoute للوصول إلى route
const route = useRoute();
// تعريف symbol كـ ref وتعيينها إلى قيمة route.params.id مع التحويل للأحرف الكبيرة
const symbol = ref(route.params.id.toUpperCase());

// دالة fetchSessionData لجلب بيانات الجلسة
async function fetchSessionData() {
  try {
    // استدعاء fetch لجلب البيانات من API بناءً على الرمز (symbol)
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${symbol.value}?apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`
    );
    // تحويل الرد إلى JSON
    const json = await response.json();
    // تعيين قيمة sessionData لتكون السجل الأول في الاستجابة
    sessionData.value = json[0];
    // تعيين isLoading إلى false بمجرد اكتمال التحميل
    isLoading.value = false;
  } catch (err) {
    // في حالة وجود خطأ، تعيين error وتعيين isLoading إلى false
    error.value = err;
    isLoading.value = false;
  }
}

// دالة formatMarketCap لتنسيق قيمة Market Cap
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

// دالة formatDate لتنسيق التاريخ
function formatDate(dateString) {
  // إنشاء كائن تاريخ من السلسلة النصية
  const date = new Date(dateString);
  // إذا كنت ترغب في إزالة "ص" من التنسيق، يمكنك استخدام replace لإزالته
  const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  // يمكنك استخدام replace لإزالة "ص" من التنسيق
  return formattedDate.replace('ص', '');
}

// عندما يتم تحميل المكون، قم بتنفيذ fetchSessionData لجلب البيانات
onMounted(() => {
  fetchSessionData();
});
</script>
