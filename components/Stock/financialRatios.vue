<template>
  <v-card class="text-center nav rounded-lg  py-10" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
    <v-chips v-model="selectedComponent" class="flex justify-center gap-2">
      <v-chip @click="selectedComponent = 'quarter'" :color="selectedComponent === 'quarter' ? 'primary' : undefined">{{ $t('Ratios by quarter') }}</v-chip>
      <v-chip @click="selectedComponent = 'year'" :color="selectedComponent === 'year' ? 'primary' : undefined">{{ $t('Ratios by year') }}</v-chip>
      
    </v-chips>
    

    <v-card-text>
      <StockFQuarter v-if="selectedComponent === 'quarter'" />
      <StockFYear v-else-if="selectedComponent === 'year'" />
      
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const selectedComponent = ref('year'); // Default selected component
const selectedColor = ref('primary'); // Default selected color

</script>

<style scoped>
/* Add Tailwind CSS classes or custom styles */
</style>
