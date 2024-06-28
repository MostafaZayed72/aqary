<!-- components/TradingViewWidget.vue -->
<template>
      <StockPattern />

</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
  script.async = true
  script.innerHTML = JSON.stringify({
    "autosize": true,
    "symbol": "NASDAQ:AAPL",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "light",
    "style": "1",
    "locale": "en",
    "allow_symbol_change": true,
    "calendar": false,
    "support_host": "https://www.tradingview.com"
  })
  document.querySelector('.tradingview-widget-container__widget').appendChild(script)
})

definePageMeta({
  layout: 'custom'
});

</script>

<style scoped>
.tradingview-widget-container {
  position: relative;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #333;
  width: 100%;
  height: 500px; /* زيادة ارتفاع الحاوية */
}

.tradingview-widget-container__widget {
  width: 100%;
  height: 100%; /* ضبط ارتفاع الـ div الداخلي ليملأ الحاوية */
}

.tradingview-widget-copyright {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  line-height: 32px;
  background: #f4f4f4;
  border-top: 1px solid #e5e5e5;
}

.blue-text {
  color: #3bafea;
}
</style>
