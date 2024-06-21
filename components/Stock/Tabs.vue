<template>
  <h1 class="bg-gray-500 w-fit mb-2 px-10 py-2 rounded-lg text-white flex gap-2 items-center justify-center text-xl font-bold cursor-pointer">
    {{ $t('Add this stock to favorite') }} 
    <Icon class="text-2xl text-red" name="material-symbols:favorite-rounded" />
  </h1>
  <v-card class="navv rounded-lg">
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="white"
      class="bg-gray-500 text-black"
    >
      <v-tab :value="1"  :class="{ 'active-tab underline': tab === 1 }">
        <h1 class="font-bold text-xl">{{ $t('Company Profile') }}</h1>
      </v-tab>
      <v-tab :value="2" :class="{ 'active-tab': tab === 2 }">
        <h1 class="font-bold text-xl">{{ $t('Financial statement') }}</h1>
      </v-tab>
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

const tab = ref(1);
</script>

<style scoped>
.active-tab {
  
  color: white !important;
}
</style>
