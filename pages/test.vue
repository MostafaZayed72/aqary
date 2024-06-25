<template>
    <div class="w-full h-0 pb-[52.5%] relative ">
      <iframe
        class="absolute top-0 left-0 w-full h-full rounded-lg"
        frameborder="0"
        scrolling="no"
        :src="src"
      ></iframe>
    </div>
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
  