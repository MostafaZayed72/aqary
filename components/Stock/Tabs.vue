<template>
  <h1 v-if="myEmail" @click="addToFavorite" class="bg-gray-500 hover:bg-gray-600 delayed w-fit mb-2 px-10 py-2 rounded-lg text-white flex gap-2 items-center justify-center text-xl font-bold cursor-pointer">
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
      <v-tab :value="1" :class="{ 'active-tab underline': tab === 1 }">
        <h1 class="font-bold text-xl">{{ $t('Company Profile') }}</h1>
      </v-tab>
      <v-tab :value="2" :class="{ 'active-tab': tab === 2 }">
        <h1 class="font-bold text-xl">{{ $t('Financial statement') }}</h1>
      </v-tab>
      <v-tab :value="3" :class="{ 'active-tab': tab === 3 }">
        <h1 class="font-bold text-xl">{{ $t('Financial Ratios') }}</h1>
      </v-tab>
      <v-tab :value="4" :class="{ 'active-tab': tab === 4 }">
        <h1 class="font-bold text-xl">{{ $t('News') }}</h1>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-if="tab === 1" :value="1">
        <StockProfile />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="tab === 2" :value="2">
        <StockFinancialStatement />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="tab === 3" :value="3">
        <StockFinancialRatios />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="tab === 4" :value="4">
        <StockNews />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const tab = ref(1);
const route = useRoute();
const myEmail = ref('');

onMounted(() => {
  myEmail.value = localStorage.getItem('email') || '';
});

const addToFavorite = async () => {
  const userEmail = myEmail.value;
  const symbolName = route.params.id;
  const endpoint = `https://development.somee.com/api/FavoriteSymbol/AddSymbol?UserEmail=${userEmail}&SymbolName=${symbolName}`;

  try {
    const response = await axios.post(endpoint);
    console.log('Response:', response.data);
    alert('Stock added to favorites successfully!');
  } catch (error) {
    console.error('Error adding stock to favorites:', error);
    alert('Failed to add stock to favorites.');
  }
};
</script>

<style scoped>
.active-tab {
  color: white !important;
}
</style>
