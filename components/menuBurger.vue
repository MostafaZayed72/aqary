<template>
   <div  :style="$i18n.locale == 'ar-AR' ? ' direction:rtl' : ''">
    <div class="sidebar shadow flex flex-col gap-4 items-start w-fit  h-screen px-2 "
      :style="$i18n.locale == 'ar-AR' ? ' ' : 'border-right:1px solid ;'">
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded mt-10 w-100">{{ $t('Market Summary') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Sectors') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('My Shares') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Automated analysis') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Dividends') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('Comparisons') }}</nuxt-link>
      <nuxt-link to="" class="cursor-pointer hover:bg-teal-400 font-bold pa-2 rounded w-100">{{ $t('News') }}</nuxt-link>
    </div>
  </div>
</template>