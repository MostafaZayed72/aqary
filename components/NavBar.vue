<template>
  <nav class="flex items-center justify-between shadow sticky top-0"
    :style="$i18n.locale == 'ar-AR' ? 'direction:rtl;' : 'direction:ltr;'">
    <!-- LOGO -->
    <nuxt-link to="/"><img class="w-[25%] md:w-[15%] lg:w-[10%] object-contain cus" src="/assets/images/logo.png" alt=""></nuxt-link>
    <!-- SEARCH -->
    <input type="text" :placeholder="$t('Search By Companies or code')" class="rounded-xl pa-2 w-[80%] relative"
      style="border: 1px solid gainsboro;">
    <!--COLOR AND LANGUAGE -->
    <div class="flex items-center mx-10 gap-2">
      <ColorMode />
      <LanguageSelector />
    </div>
  </nav>
  <!-- Links -->
  <div class="" :style="$i18n.locale == 'ar-AR' ? ' direction:rtl' : ''">
    <div class="sidebar shadow flex flex-col gap-4 items-start w-fit  h-screen px-2"
      :style="$i18n.locale == 'ar-AR' ? ' ' : 'border-right:1px solid ;'">
      <nuxt-link to="/" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded mt-10 w-100">{{ $t('Market Summary') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Sectors') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('My Shares') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Automated analysis') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Dividends') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Comparisons') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('News') }}</nuxt-link>
    </div>
  </div>
</template>

<style>
.delayed {
  transition: 0.3s ease-in-out;
}

input:focus {
  outline: none;
}
</style>
