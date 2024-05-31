<template>
  <div class="cursor-pointer">
    <Icon
      v-if="$colorMode.preference == 'light'"
      name="material-symbols:nightlight"
      class="text-3xl"
      @click="$colorMode.preference = 'dark'"
    />
    <Icon
      v-else
      name="material-symbols:sunny-outline-rounded"
      class="text-3xl"
      @click="$colorMode.preference = 'light'"
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

nav {
  background: white;
}
.dark body {
  background-color: #08111a;
  color: #ebf4f1;
}
.dark nav {
  @apply bg-sky-950;
}
</style>
