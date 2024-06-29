<template>
    <div class="flex flex-col justify-center items-center h-screen gap-4">
      <h1 v-if="isVerified" class="text-2xl font-bold px-16 py-4 nav rounded-lg">{{ $t('Your account has been successfully confirmed') }}</h1>
      <p v-else class="text-red-500">{{ errorMessage }}</p>
      <nuxt-link v-if="isVerified" to="/" class="bg-teal-400 hover:bg-teal-500 delayed px-6 py-2 rounded-lg font-bold text-slate-950">{{ $t('Go to home page') }}</nuxt-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const isVerified = ref(false);
  const errorMessage = ref('');
  const route = useRoute();
  const token = route.query.token;
  
  onMounted(async () => {
    try {
      const response = await axios.get(`https://development.somee.com/api/User/IsVerified?token=${token}`);
      if (response.data) {
        isVerified.value = true;
      } else {
        errorMessage.value = 'Token is invalid or expired.';
      }
    } catch (error) {
      errorMessage.value = error.response.data.msg || 'An error occurred during verification.';
    }
  });
  
  definePageMeta({
    layout: 'custom'
  });
  </script>
  
  <style>
  .delayed {
    transition: 0.5s;
  }
  </style>
  