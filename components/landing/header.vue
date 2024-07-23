<template>
    <div class="header" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
        <v-container>
            <!-- START NAVBAR -->
            <v-row class="nav mx-auto rounded-lg  flex justify-between items-center sticky top-10 z-20"
                :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
                <v-col cols="8" class="flex items-center ">
                    <ul class="flex flex-row-reverse text-slate-300 items-center gap-8">
                        <li><nuxt-link class="text-white font-bold">{{ $t('الرئيسية') }}</nuxt-link></li>
                        <li><nuxt-link>{{ $t('أهم الأسم') }}</nuxt-link></li>
                        <li><nuxt-link>{{ $t('الأخبار') }}</nuxt-link></li>
                        <li><nuxt-link class="text-black bg-white rounded-lg px-6 py-2 flex gap-2 items-center">
                                <Icon name="ic:round-west" />{{ $t('سجل الآن مجاناً') }}
                            </nuxt-link></li>
                        <li class="flex items-center gap-2">
                            <ColorMode />
                            <LanguageSelector />
                        </li>
                    </ul>
                </v-col>
                <v-col cols="2" class="flex justify-end gap-3">
                    <div class="text-end">
                        <h1 class="text-sm text-white">{{ $i18n.locale === 'ar-AR' ? $t('Report') : $t('Financial') }}
                        </h1>
                        <h1 class="text-lg font-bold text-white">{{ $i18n.locale === 'ar-AR' ? $t('Financial') :
                            $t('Report') }}</h1>
                    </div>

                    <img class="w-12 h-12  logo rounded-lg" src="/assets/images/landingPage/logo.png" alt="">

                </v-col>
            </v-row>
            <!-- END NAVBAR -->

            <!-- START MAIN TITLE -->
            <v-row class="mt-10 ">
                <v-col cols="12" class="mt-16 mx-auto text-center flex flex-col items-center justify-center gap-4">
                    <div class="flex flex-row-reverse gap-2 ">
                        <h1 class="text-6xl text-blue-950 font-bold">{{ $t('التقرير المالي') }}</h1>
                        <h1 class="text-6xl text-white font-bold">{{ $t('هو طريقك المختصر') }}</h1>
                    </div>
                    <h1 class="text-6xl text-white font-bold">{{ $t('إلى عالم التداول') }}</h1>
                    <h1 class=" text-white text-2xl">{{ $t('نوفر لك الدخل للإستثمار في أكثر من 100 أصل للدخل المستمر') }}</h1>
                    <img class="my-10" src="/assets/images/landingPage/Group1.png" alt="">
                    <img class="my-10 z-10 phone-frame" src="/assets/images/landingPage/Maskgroup1.png" alt="">
                    <div class="mock"></div>
                </v-col>
            </v-row>
            
        </v-container>
    </div>
</template>

<style scoped>
.header {
    background-image: url('/assets/images/landingPage/headerCover.png');
    background-size: contain;
    position: relative;
}
.mock {
  background-image: url('/assets/images/landingPage/Isolation_Mode.png');
  background-size: cover;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 70%;
}


.nav {
    background-color: #3d7eb6bd;
    
}

.logo {
    background-image: url('/assets/images/landingPage/logo-bg.png');
}



.phone-frame {
 border: 10px solid rgb(77, 75, 75);
 border-radius: 7%;
}


</style>