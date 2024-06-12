<template>
    <div v-if="company" class="p-4 nav">
      <v-card class="mx-auto my-4 nav" >
        <v-img :src="company.image" class="white--text" height="200px">
          <v-card-title class="headline">{{ company.companyName }}</v-card-title>
        </v-img>
        <v-card-subtitle>{{ company.industry }} | {{ company.sector }}</v-card-subtitle>
        <v-card-text>
          <div class="mb-4">
            <strong>CEO:</strong> {{ company.ceo }}
          </div>
          <div class="mb-4">
            <strong>Price:</strong> {{ company.price }} {{ company.currency }}
          </div>
          <div class="mb-4">
            <strong>Market Cap:</strong> {{ company.mktCap }}
          </div>
          <div class="mb-4">
            <strong>Website:</strong>
            <a :href="company.website" target="_blank" class="text-blue-500 underline">
              {{ company.website }}
            </a>
          </div>
          <div class="mb-4">
            <strong>Description:</strong>
            <p>{{ company.description }}</p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const company = ref<any>(null);
  const route = useRoute();
  
  const fetchCompanyProfile = async (symbol: string) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=MzMorahM3ZyGf4IScs3X7OcDcRhlLSbc`);
      const data = await response.json();
      company.value = data[0];
    } catch (error) {
      console.error('Error fetching company profile:', error);
    }
  };
  
  onMounted(() => {
    const symbol = route.params.symbol || 'AAPL'; // Default to 'AAPL' if no symbol is provided in the URL
    fetchCompanyProfile(symbol);
  });
  </script>
  
  <style scoped>
  /* يمكنك إضافة أنماط إضافية هنا إذا لزم الأمر */
  </style>
  