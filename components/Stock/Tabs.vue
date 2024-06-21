<template>
    <v-card class="navv rounded-lg">
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="white"
        class="bg-gray-500 text-black"
      >
        <v-tab :value="1"><h1 class="font-bold text-xl">{{ $t('Company Profile') }}</h1></v-tab>
        <v-tab :value="2"><h1 class="font-bold text-xl">{{ $t('Financial statement') }}</h1></v-tab>
      </v-tabs>
  
      <v-tabs-window v-model="tab">
        <v-tabs-window-item v-if="tab === 1" :value="1">
          <StockProfile />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="tab === 2" :value="2">
            <StockFinancialStatement />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tab = ref(1); // تعريف متغير ref لإدارة قيمة التبويب النشطة
  
  // في حال تغيير اللغة، يمكنك استخدام مراقب أو دالة لتحديث `tab` بناءً على اللغة الجديدة
  // مثال بسيط:
  // watchEffect(() => {
  //   const language = 'arabic'; // المتغير الذي يحدد اللغة
  //   tab.value = (language === 'arabic') ? 2 : 1; // تحديد التبويب بناءً على اللغة
  // });
  </script>
  
  <!-- لا يلزم إضافة أي تغييرات إضافية في النمط scoped -->
  