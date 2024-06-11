<template> <v-container class="nav  px-4 py-6 my-10 rounded-lg  text-center flex justify-between " style="border: 1px solid #ccc;"
        :style="$i18n.locale == 'ar-AR' ? ' direction:rtl' : ''">
   <v-row >
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">339,260.34
                    </h1>
                    <h1>{{ $t('Shares issued (in millions)') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">572,140.79
                    </h1>
                    <h1>{{ $t('Net income (SAR in millions)') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">3,117,074.55
                    </h1>
                    <h1>{{ $t('Shareholders equity (SAR in millions)') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">10,078,956.98

                    </h1>
                    <h1>{{ $t('Market value (SAR in millions)') }}</h1>
                </div>
            </v-col>


            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">1.69
                    </h1>
                    <h1>{{ $t('Earnings per share (SAR)') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">9.19
                    </h1>
                    <h1>{{ $t('Book value (SAR)') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">21
                    </h1>
                    <h1>{{ $t('Number of sectors') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">16.63

                    </h1>
                    <h1>{{ $t('Price-earnings ratio') }}</h1>
                </div>
            </v-col>


            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">234
                    </h1>
                    <h1>{{ $t('Number of listed companies') }}</h1>
                </div>
            </v-col>
            <v-col cols="12" md="6" lg="3">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold">3.23

                    </h1>
                    <h1>{{ $t('Book value multiple') }}</h1>
                </div>
            </v-col>
            

        </v-row></v-container>
</template>