<template>
    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <Icon class="text-2xl cursor-pointer" name="iconamoon:menu-burger-horizontal-bold" v-bind="props" />
        </template>
        <v-list>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link @click="setActive('market-summary')" :class="{ active: activeItem === 'market-summary' }"
                to="#"
                class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
              >
                {{ $t('Market Summary') }}
                <Icon class="text-2xl" name="arcticons:stockswidget" />
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link @click="setActive('sectors')" :class="{ active: activeItem === 'sectors' }"
                to="#"
                class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
              >
                {{ $t('Sectors') }}
                <Icon class="text-2xl" name="mingcute:sector-fill" />
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeItem = ref(null)
  
  const setActive = (item) => {
    activeItem.value = item
  }
  </script>
  
  <style scoped>
  .active {
    @apply bg-teal-400  /* teal color for active item */
  }
  </style>
  