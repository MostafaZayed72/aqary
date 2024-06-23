<template>
  
  <div class="p-4 nav rounded-lg">
    <div v-if="isLoading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h1 class="text-center text-2xl font-bold">{{ $t('Company News') }}</h1>
      <div v-if="news.length">
        <div v-for="article in news" :key="article.uuid" class="mb-4">
          <v-card class="mx-auto my-4 nav">
            <v-card-title class="headline">{{ article.title }}</v-card-title>
            <img
            v-if="article.image_url"
              :src="article.image_url || ''"
              @error="article.image_url = ''"
              class="white--text my-4 rounded-xl mx-auto"
              style="height: 200px;"
            />
            <v-card-subtitle>{{ article.source }} | {{ new Date(article.published_at).toLocaleDateString() }}</v-card-subtitle>
            <v-card-text>
              <div class="mb-4">
                <strong>Description:</strong>
                <p>{{ article.description }}</p>
              </div>
              <div class="mb-4">
                <strong>Snippet:</strong>
                <p>{{ article.snippet }}</p>
              </div>
              <div class="mb-4">
                <strong>URL:</strong>
                <a :href="article.url" target="_blank" class="text-blue-500 underline">
                  {{ article.url }}
                </a>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div v-else>
        <p class="text-center">{{ $t('No news available now for this stock') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const news = ref([]);
const error = ref(null);
const isLoading = ref(true);

// احصل على المعلمة id من الرابط
const route = useRoute();
const symbol = ref(route.params.id.toUpperCase());

async function fetchNews() {
  try {
    const response = await fetch(
      `https://api.marketaux.com/v1/news/all?symbols=${symbol.value}&filter_entities=true&language=en&api_token=zIdD5UooP3CgEqish9chWDtxXsG13F9CEoPl2v6N`
    );
    const json = await response.json();
    news.value = json.data;
    isLoading.value = false;
  } catch (err) {
    error.value = err;
    isLoading.value = false;
  }
}

onBeforeMount(() => {
  fetchNews();
});

</script>

<style scoped>
/* يمكنك إضافة أنماط إضافية هنا إذا لزم الأمر */
</style>
