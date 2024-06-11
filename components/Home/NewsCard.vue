<template>
  <v-card class="mb-6 rounded-lg nav">
    <v-img :src="article.image" class="w-100 "  style="border-radius: 10px; "/>
    <v-card-title class="text-lg font-bold">{{ article.title }}</v-card-title>
    <v-card-subtitle class="text-blue">{{ article.date }}</v-card-subtitle>
    <v-card-text>
      <p v-html="article.content"></p>
    </v-card-text>
    <v-card-actions>
      <v-btn :href="article.link" target="_blank" color="primary">Read More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  article: Object,
});
</script>

<style scoped>
.v-card-title {
  font-size: 1.25rem;
  font-weight: 700;
}
.v-card-subtitle {
  color: #6b7280;
  margin-bottom: 1rem;
}
</style>
