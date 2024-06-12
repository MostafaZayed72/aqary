<template>
    <div  class="mt-10 shadow nav py-4 px-10 ">
        <div class="flex flex-col md:flex-row-reverse items-center justify-between gap-10">
            <!-- LOGO -->
            <nuxt-link to="/" class="w-[50%] md:w-[15%] lg:w-[10%] cursor-pointer"><img src="/assets/images/logo.png" alt="Logo"></nuxt-link>
            <!-- MAIL US -->
             <div class="flex flex-col md:flex-row-reverse items-center gap-2 text-center">
                <Icon class="text-3xl"  name="material-symbols:mail"/>

     <h1 class="font-bold md:text-xl"> : {{ $t('Send E-mail') }}</h1>
     <!-- <input type="text" class="px-20 py-2 bg-white rounded"> -->
                   <h1 class="font-bold md:text-xl text-teal-400 hover:text-teal-500 delayed cursor-pointer">finance-report@info</h1>
             </div>
            <!-- START ICONS -->
            <div class="icons flex gap-4 items-center">
                
<Icon class="text-3xl cursor-pointer" name="logos:twitter"/>
<Icon class="text-3xl cursor-pointer" name="logos:facebook"/>
<Icon class="text-3xl cursor-pointer" name="skill-icons:instagram"/>
<Icon class="text-3xl cursor-pointer" name="logos:whatsapp-icon"/>
            </div>
        </div>
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
.delayed{
    transition: 0.5s;
}
.active {
  @apply bg-teal-400  /* teal color for active item */
}
</style>
