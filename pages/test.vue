<template>
  <button @click="fetchWeather">Get Weather Forecast</button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const weatherData = ref(null);

const fetchWeather = async () => {
  try {
    const response = await axios.get('https://finrep.net/api/WeatherForecast');
    weatherData.value = response.data;
    console.log(weatherData.value);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
</script>
