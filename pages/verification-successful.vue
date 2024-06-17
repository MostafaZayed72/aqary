
<template>
    <div class="flex flex-col justify-center items-center h-screen gap-4">
<h1 class="text-2xl font-bold px-16 py-4 nav rounded-lg">{{ $t('Your account has been successfully confirmed') }}</h1>
<nuxt-link to="/" class="bg-teal-400 hover:bg-teal-500 delayed px-6 py-2 rounded-lg font-bold text-slate-950">{{ $t('Go to home page') }}</nuxt-link>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'custom'
});

</script>

<style>
.delayed{
    transition: 0.5s;
}
</style>