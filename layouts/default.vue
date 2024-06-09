<template>
  <div class=" h-screen" :class="$i18n.locale === 'ar-AR' ? 'ltr' : 'rtl'">
    <!-- Sidebar -->
    <div :class="sidebarClass" :style="sidebarStyle" class="sidebar hidden px-4 shadow md:flex flex-col items-center gap-4 h-full transition-none fixed top-0 nav overflow-hidden text-center">
      <!-- Sidebar content -->
      <h1 class="rounded py-4 text-teal-400 delayed hover:text-teal-600 font-bold text-xl cursor-pointer" style="border-bottom: 1px solid;" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">{{ $t('Financial Report') }}</h1>
      <!-- Add other sidebar links here -->
      <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Market Summary' }"
      @click="setActive('Market Summary')"
    >
      {{ $t('Market Summary') }} <Icon class="text-2xl" name="arcticons:stockswidget"/>
    </nuxt-link>
    <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Sectors' }"
      @click="setActive('Sectors')"
    >
      {{ $t('Sectors') }} <Icon class="text-2xl" name="mingcute:sector-fill" />
    </nuxt-link>
    <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'My Shares' }"
      @click="setActive('My Shares')"
    >
      {{ $t('My Shares') }} <Icon class="text-2xl" name="streamline:stock"/>
    </nuxt-link>
    <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Automated analysis' }"
      @click="setActive('Automated analysis')"
    >
      {{ $t('Automated analysis') }} <Icon class="text-2xl" name="emojione-v1:stock-chart"/>
    </nuxt-link>
    <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Dividends' }"
      @click="setActive('Dividends')"
    >
      {{ $t('Dividends') }} <Icon class="text-2xl" name="ph:money-wavy-bold"/>
    </nuxt-link>
    <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'Comparisons' }"
      @click="setActive('Comparisons')"
    >
      {{ $t('Comparisons') }} <Icon class="text-2xl" name="uil:comparison"/>
    </nuxt-link>
    <nuxt-link
      to=""
      class="cursor-pointer delayed hover:bg-teal-400 font-bold pa-2 rounded w-full flex  gap-2 items-center justify-end"
      :class="{ 'bg-teal-400': activeLink === 'News' }"
      @click="setActive('News')"
    >
      {{ $t('News') }} <Icon class="text-2xl" name="material-symbols:news-sharp"/>
    </nuxt-link>
      <input type="text" :placeholder="$t('Search')" class="flex text-center justify-center md:hidden rounded-xl pa-2  md:w-[60%] lg:w-[70%] w-full mx-auto" style="border: 1px solid;">

        
    </div>

    <!-- Main content container -->
    <div :class="mainContentClass" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
      <!-- Navbar -->
      <nav class="flex items-center justify-center text-center mx-auto shadow-lg sticky top-0 nav w-full z-50">
        <!-- Logo -->
        <nuxt-link to="/" class="w-[20%] md:w-[15%] lg:w-[10%] cursor-pointer"><img src="/assets/images/logo.png" alt="Logo"></nuxt-link>

        <!-- Search -->
        <input type="text" :placeholder="$t('Search By Companies or code')" class="hidden md:flex rounded-xl text-end pa-2 w-[80%] md:w-[60%] lg:w-[70%]" style="border: 1px solid;">

        <!-- Color Mode -->
        <!-- Color Mode and language-->
         
        <div class="flex gap-2 items-center w-full justify-center text-center mx-auto md:hidden">      
          
          <ColorMode />
<LanguageSelector />
</div>
<HomeMenu class="md:hidden"/> 


<div class="hidden flex items-center gap-2 md:flex mx-10">
  <ColorMode />
<LanguageSelector />
</div>
        <!-- Toggle Sidebar Button -->
        <button @click="toggleSidebar" class="p-2 ml-20 hidden md:flex">
          <svg v-if="isSidebarExpanded" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
          <Icon class="text-2xl" name="iconamoon:menu-burger-horizontal-bold" v-else />
          
        </button>
      </nav>

      <!-- Main content -->
      <div class="p-4" :class="$i18n.locale === 'ar-AR' ?  'rtl': 'ltr'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarExpanded: false, 
    };
  },
  computed: {
    sidebarClass() {
      return {
        'w-48': this.isSidebarExpanded,
        'w-0': !this.isSidebarExpanded
      };
    },
    sidebarStyle() {
      return this.$i18n.locale === 'ar-AR' ? { right: '0', left: 'auto', transform: this.isSidebarExpanded ? 'translateX(0)' : 'translateX(100%)' } : { left: '0', right: 'auto', transform: this.isSidebarExpanded ? 'translateX(0)' : 'translateX(-100%)' };
    },
    mainContentClass() {
      return {
        'flex-grow ml-48': this.isSidebarExpanded && this.$i18n.locale !== 'ar-AR',
        'flex-grow mr-48': this.isSidebarExpanded && this.$i18n.locale === 'ar-AR',
        'flex-grow': !this.isSidebarExpanded
      };
    }
  },
  methods: {
    // Method to toggle the sidebar expansion
    toggleSidebar() {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    },
    setActive(link) {
      this.activeLink = link;
    }
  },
};
</script>

<style scoped>
.delayed{
  transition: 0.5s;
}
.sidebar {
  overflow-x: hidden;
  white-space: nowrap;
  transition: transform 0.3s ease;
}

/* Styles for the navbar */
nav {
  height: 60px; /* Adjust as necessary */
  padding: 0 1rem;
}

button {
  border: none;
  cursor: pointer;
}

/* Direction handling */
.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}
</style>
