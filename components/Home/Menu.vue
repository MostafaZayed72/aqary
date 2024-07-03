<template>
  <div class="text-center">
    <v-menu open-on-click :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <Icon class="text-2xl cursor-pointer" name="iconamoon:menu-burger-horizontal-bold" v-bind="props" />
      </template>
      <v-list :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('market-summary'); closeMenu"
              :class="{ active: activeItem === 'market-summary' }"
              to="/"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('Market Summary') }}
              <Icon class="text-2xl" name="arcticons:stockswidget" />
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('sectors'); closeMenu"
              :class="{ active: activeItem === 'sectors' }"
              to="/sectors"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('Sectors') }}
              <Icon class="text-2xl" name="mingcute:sector-fill" />
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('stocks-trending'); closeMenu"
              :class="{ active: activeItem === 'stocks-trending' }"
              to="/stocks-trending"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('Stocks Trending') }} <Icon class="text-2xl" name="material-symbols:trending-up-rounded" />
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('my-shares'); closeMenu"
              :class="{ active: activeItem === 'my-shares' }"
              to="/My-Shares"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('My Shares') }} <Icon class="text-2xl" name="streamline:stock"/>
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('Stock Analysis'); closeMenu"
              :class="{ active: activeItem === 'Stock Analysis' }"
              to="/Stock-Analysis/2222.SR"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('Stock Analysis') }} <Icon class="text-2xl" name="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance"/>
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('Stocks Scanner'); closeMenu"
              :class="{ active: activeItem === 'Stocks Scanner' }"
              to="/Stocks-Scanner"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('Stocks Scanner') }} <Icon class="text-2xl" name="streamline:scanner"/>
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('Comparisons'); closeMenu"
              :class="{ active: activeItem === 'Comparisons' }"
              to="/comparisons"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('Comparisons') }} <Icon class="text-2xl" name="uil:comparison"/>
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <nuxt-link @click="setActive('News'); closeMenu"
              :class="{ 'bg-teal-400': activeItem === 'News' }"
              to="/News"
              class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end"
            >
              {{ $t('News') }} <Icon class="text-2xl" name="material-symbols:news-sharp"/>
            </nuxt-link>
          </v-list-item-title>
        </v-list-item>
        <UserSign class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex gap-2 items-center justify-end" />
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeItem = ref(null);
const menu = ref(false);

const setActive = (item) => {
  activeItem.value = item;
};

const closeMenu = () => {
  menu.value = false;
};
</script>

<style scoped>
.active {
  @apply bg-teal-400; /* teal color for active item */
}
</style>
