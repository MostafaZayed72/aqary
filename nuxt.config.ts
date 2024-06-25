import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  //...
  runtimeConfig: {
    public: {
      host: process.env.NUXT_PUBLIC_HOST || '0.0.0.0',
      port: process.env.NUXT_PUBLIC_PORT ? parseInt(process.env.NUXT_PUBLIC_PORT, 10) : 3000
    }
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: ['@nuxtjs/i18n','nuxt-highcharts',"@nuxt/ui",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],

  vite: {
    
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  i18n: {
    lazy: true,
    langDir: "locales",
    strategy:"no_prefix",
    locales: [
      {
        code: 'en-US',
        iso: 'en-US',
        name: 'English',
        file: "en-US.json",
        dir: 'ltr'
      },
      {
        code: 'ar-AR',
        iso: 'ar-AR',
        name: 'Arabic',
        file: "ar-AR.json",
        dir: 'rtl'
      },
    ],
    defaultLocale: 'en-US',

  },

  app: {
    head: {
      script: [
        {
          src: 'https://www.stockdio.com/visualization/financial/charts/js/Stockdio.FinancialCharts.js',
          type: 'text/javascript'
        }
      ],
  
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: 'upgrade-insecure-requests'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap'
        }
      ]
    }
  },

  devtools: {
    enabled: false,
  },
})
