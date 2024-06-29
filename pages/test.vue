<template>
  <div>
    <!-- Your template code here -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const token = ref('');

// Load token from localStorage on mounted
onMounted(() => {
  token.value = localStorage.getItem('token');
});

// Create axios instance with the API URL and headers
const instance = axios.create({
  baseURL: 'https://development.somee.com/api/StockMarket',
});

// Add a request interceptor to attach the token to the Authorization header
instance.interceptors.request.use(
  (config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchData = async () => {
  try {
    const response = await instance.get('/TestSecurity?symbol=2222.SR');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
