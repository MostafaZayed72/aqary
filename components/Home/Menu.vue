<template>
    <div class="text-center" >
      <v-menu open-on-click>
        <template v-slot:activator="{ props }">
          <Icon class="text-2xl cursor-pointer" name="iconamoon:menu-burger-horizontal-bold" v-bind="props" />
        </template>
        <v-list :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
          <v-list-item >
            <v-list-item-title>
              <nuxt-link @click="setActive('market-summary')" :class="{ active: activeItem === 'market-summary' }"
                to="/"
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
                to="/sectors"
                class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
              >
                {{ $t('Sectors') }}
                <Icon class="text-2xl" name="mingcute:sector-fill" />
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'My Shares' }"
      @click="setActive('My Shares')"
    >
      {{ $t('My Shares') }} <Icon class="text-2xl" name="streamline:stock"/>
    </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Stocks Scanner' }"
      @click="setActive('Stocks Scanner')"
    >
      {{ $t('Stocks Scanner') }} <Icon class="text-2xl" name="streamline:scanner"/>
    </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Dividends' }"
      @click="setActive('Dividends')"
    >
      {{ $t('Dividends') }} <Icon class="text-2xl" name="ph:money-wavy-bold"/>
    </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Comparisons' }"
      @click="setActive('Comparisons')"
    >
      {{ $t('Comparisons') }} <Icon class="text-2xl" name="uil:comparison"/>
    </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>
              <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'News' }"
      @click="setActive('News')"
    >
      {{ $t('News') }} <Icon class="text-2xl" name="material-symbols:news-sharp"/>
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
  