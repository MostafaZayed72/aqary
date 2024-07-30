<template>
    <v-container>
      <v-row class="nav mx-auto rounded-lg flex justify-between items-center  "
             :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
        <v-col cols="8" class="flex items-center">
          <ul class="flex flex-row-reverse text-slate-300 items-center gap-8">
            <li><nuxt-link :to="'/'" :class="{ 'font-bold text-white': route.path === '/' }" >{{ $t('الرئيسية') }}</nuxt-link></li>
            <li><nuxt-link :to="'/important-stocks'" :class="{ 'font-bold text-white': route.path === '/important-stocks' }">{{ $t('أهم الأسم') }}</nuxt-link></li>
            <li><nuxt-link :to="'/news'" :class="{ 'font-bold text-white': route.path === '/news' }">{{ $t('الأخبار') }}</nuxt-link></li>
            <li><nuxt-link :to="'/register'"  class="text-black bg-white rounded-lg px-6 py-2 flex gap-2 items-center">
              <Icon name="ic:round-west" />{{ $t('سجل الآن مجاناً') }}
            </nuxt-link></li>
            <li class="flex items-center gap-2">
              <!-- <ColorMode /> -->
              <LanguageSelector />
            </li>
          </ul>
        </v-col>
        <v-col cols="2" class="flex justify-end gap-3">
          <img src="/assets/images/landingPage/lastLogo.png" alt="">
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script setup>
const route= useRoute()
</script>

  <style scoped>
  .nav {
    background-color: #3d7eb6bd;
  }
  </style>
  