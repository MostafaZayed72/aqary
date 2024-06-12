<template>
    <div class="container mx-auto p-4">
      <v-container>
        <v-row>
            <v-col cols="12"><h1 class="text-blue font-bold text-center text-3xl">{{ $t('News') }}</h1></v-col>
          <v-col v-for="article in articles" :key="article.title" cols="12" md="6" lg="4">
            <HomeNewsCard :article="article" />
          </v-col>
          <v-col cols="12"><h1 class="text-blue font-bold text-center text-3xl mt-10"><NuxtLink class="bg-gray-200 hover:bg-gray-300 delayed px-10 py-2 rounded-lg" to="/news">{{ $t('More News') }}</NuxtLink></h1></v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const articles = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=5&apikey=MzMorahM3ZyGf4IScs3X7OcDcRhlLSbc');
      const data = await response.json();
      articles.value = data.content.map(article => ({
        title: article.title,
        date: new Date(article.date).toLocaleString(),
        content: article.content,
        image: article.image,
        link: article.link,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: auto;
  }

  .delayed{
    transition: 0.5s;
  }
  </style>
  