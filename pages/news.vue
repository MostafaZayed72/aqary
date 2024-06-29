<template>
    <v-container>
      <v-row>
        <v-col
          v-for="news in displayedNews"
          :key="news.id"
          cols="12"
          md="6"
        >
          <v-card class="nav">
            <v-img :src="news.image" height="200px"></v-img>
            <v-card-title>{{ news.headline }}</v-card-title>
            <v-card-subtitle>{{ formatDate(news.datetime) }}</v-card-subtitle>
            <v-card-text>{{ news.summary }}</v-card-text>
            <v-card-actions>
              <v-btn :href="news.url" target="_blank">Read more</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn v-if="canLoadMore" @click="loadMore">Load More</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  
  interface News {
    id: number
    headline: string
    datetime: number
    summary: string
    url: string
    image: string
  }
  
  const newsList = ref<News[]>([])
  const displayedNews = ref<News[]>([])
  const newsPerPage = 10
  const currentPage = ref(1)
  
  const fetchNews = async () => {
    const res = await fetch('https://finnhub.io/api/v1/news?category=2222.SR&token=cptgck1r01qnvrr8v9b0cptgck1r01qnvrr8v9bg')
    const data = await res.json()
    newsList.value = data
    loadMore()
  }
  
  const loadMore = () => {
    const start = (currentPage.value - 1) * newsPerPage
    const end = currentPage.value * newsPerPage
    displayedNews.value = newsList.value.slice(0, end)
    currentPage.value++
  }
  
  const canLoadMore = () => {
    return displayedNews.value.length < newsList.value.length
  }
  
  const formatDate = (timestamp: number) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(timestamp * 1000).toLocaleDateString('en-GB', options) // يمكنك تغيير 'en-GB' إلى اللغة المطلوبة
}
  
  onBeforeMount(fetchNews)
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>
  