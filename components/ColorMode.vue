<template>
  <div class="cursor-pointer">
   
    <Icon
      v-if="$colorMode.preference == 'dark'"
      name="material-symbols:sunny-outline-rounded"
      class="text-3xl"
      @click="$colorMode.preference = 'light'"
    />
    <Icon
      v-else
      name="material-symbols:nightlight"
      class="text-3xl"
      @click="$colorMode.preference = 'dark'"
    />
  </div>
</template>

<script setup>
const colorMode = useColorMode();
console.log(colorMode.preference);
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.nav {
  background: rgb(238, 236, 236);
}
.navy {
  background: rgb(238, 236, 236);
}
.box {
  background: rgb(238, 236, 236);
}
.dark body {
  background-color: #08111a;
  color: #5b5e5d;
}
.dark .navv {
  background-color: #08111a;
}
.dark .nav {
  @apply bg-dark1;
  color: white
}
.dark .nav th:hover {
  @apply text-teal-400 !important;
}
.dark .nav th {
@apply font-bold;
@apply text-teal-400;
@apply text-lg;
}
 .nav th:hover {
  @apply text-emerald-500 !important;
}
 .nav th {
@apply font-bold;
@apply text-emerald-500;
@apply text-lg;
}
.dark .navy {
  @apply bg-dark1;
  color: white
}

.chart{
  background: rgb(238, 236, 236);
}
.dark .chart {
  @apply bg-dark1;
  color: white
}
.dark .box {
  @apply bg-dark1;
  @apply text-white;
}
.dark .sidebar {
  @apply bg-dark1;
}

.myRow{
  border-top: 1px solid rgb(226, 223, 223);
}
.dark .myRow{
  border-top: 1px solid white;
}
</style>
