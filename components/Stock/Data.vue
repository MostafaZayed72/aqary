   <!-- App.vue -->

   <template>
    <div class="container mx-auto py-8">

      <v-card class="nav">
        <v-card-text>
          <v-container>
            <v-row v-if="financialData">
              <v-col cols="12" md="6" v-for="(value, key) in financialData" :key="key">
                <v-card>
                  <v-card-title class="bg-teal-400">{{ $t( key) }}</v-card-title>
                  <v-card-text class="mt-4">{{ value }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <p>{{ $t('loadingMessage') }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const financialData = ref(null)
  const route = useRoute()
  const { t } = useI18n()

  onMounted(async () => {
    fetchData(route.params.id)
  })

  watch(route, (to, from) => {
    fetchData(to.params.id)
  })

  async function fetchData(symbol) {
    try {
      const response = await axios.get(`https://financialmodelingprep.com/api/v4/advanced_discounted_cash_flow?symbol=${symbol}&apikey=yJ2JzqBMsGlz3rV7rkogCtrEc7eY6QDh`)
      const data = response.data.find(item => item.year === '2024')
      financialData.value = data
    } catch (error) {
      console.error('Error fetching financial data:', error)
    }
  }
  </script>

  <style scoped>
  /* تحديد الأنماط الخاصة بك هنا إذا لزم الأمر */
  </style>
