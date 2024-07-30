<template>
    <div class="header" :style="$i18n.locale === 'ar-AR' ? 'direction:ltr' : 'direction:rtl'">
        <v-container>
            <!-- START NAVBAR -->
            <!-- <LandingNavbar /> -->
            <!-- END NAVBAR -->

            <!-- START MAIN TITLE -->
            <v-row class="mt-16 ">
                <v-col cols="12" class="mt-16 mx-auto text-center flex flex-col items-center justify-center gap-4">
                    <div class="flex flex-row-reverse gap-2 ">
                        <h1 class="text-6xl text-blue-950 font-bold">{{ $t('التقرير المالي') }}</h1>
                        <h1 class="text-6xl text-white font-bold">{{ $t('هو طريقك المختصر') }}</h1>
                    </div>
                    <h1 class="text-6xl text-white font-bold">{{ $t('إلى عالم التداول') }}</h1>
                    <h1 class=" text-white text-2xl">{{ $t('نوفر لك الدخل للإستثمار في أكثر من 100 أصل للدخل المستمر') }}</h1>
                    <NuxtLink to="/register"><img class="my-10 cursor-pointer" src="/assets/images/landingPage/Group1.png" alt=""></NuxtLink>
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