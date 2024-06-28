<template>
  <div class="sm:w-100 md:w-[80%] mx-auto mt-4 mb-12 ">
    <iframe
      class="w-full rounded-lg "
      frameborder="0"
      scrolling="no"
      :src="iframeSrc"
    ></iframe>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();
const symbol = ref(route.params.id.toUpperCase());

const iframeSrc = computed(() => {
  return `http://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=CC11192CB64C4897A4E9B60C6D2D1930&symbol=${symbol.value}&days=365&width=800&height=420`;
});
</script>

<style scoped>
iframe {
  width: 100%;
  height: auto;
  min-height: 420px;
}
</style>
