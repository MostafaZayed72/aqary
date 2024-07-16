<template>
  <div class="container mx-auto p-4">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-blue font-bold text-center text-3xl">{{ $t('International news') }}</h1>
        </v-col>
        <v-col v-for="article in articles" :key="article.title" cols="12" md="6" lg="4">
          <HomeNewsCard :article="article" />
        </v-col>
        <v-col cols="12" class="text-center mx-auto">
          <NuxtLink to="/news"><v-btn>{{ $t('Read More')
              }}</v-btn></NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://finrep.net/api/StockMarket/GetArticlesData?page=0&size=5');
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

.delayed {
  transition: 0.5s;
}
</style>