<template>
  <div class="sm:w-100 md:w-[80%] mx-auto  mt-4 mb-12">
    <iframe
      class=" w-full  rounded-lg"
      frameborder="0"
      scrolling="no"
      :src="src"
    ></iframe>
  </div>
  <HomeNumbers />
</template>

<script setup>
const src = 'http://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=D71369AD69FB456EA6304F570A3AEB2A&symbol=^tasi&days=365&width=800&height=420'
</script>

<style scoped>
iframe {
  width: 100%;
  height: auto;
  min-height: 420px;

}

</style>
