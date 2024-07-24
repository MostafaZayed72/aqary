<template>
    <v-container >
        <v-row class="footer mb-10 rounded-xl" >
            <v-col cols="12" class="flex items-start pt-8 justify-between px-10 text-white">
                <div class="flex flex-col items-end gap-2">
                    <h1>منصات التواصل</h1>
                    <div class="icons flex gap-4 items-center ">
                
                <Icon class="text-3xl cursor-pointer" name="logos:twitter"/>
                <Icon class="text-3xl cursor-pointer" name="logos:facebook"/>
                <Icon class="text-3xl cursor-pointer" name="skill-icons:instagram"/>
                <Icon class="text-3xl cursor-pointer" name="logos:whatsapp-icon"/>
                            </div>
                </div>
<div class="flex flex-col items-end gap-2">
<nuxt-link>سياسة الخصوصية</nuxt-link>
<nuxt-link>قانوني</nuxt-link>
<nuxt-link>شروط الخدمة</nuxt-link>
<nuxt-link>مركز المساعدة</nuxt-link>

</div>
<div class="flex flex-col items-end gap-2">
<nuxt-link>الرئيسية</nuxt-link>
<nuxt-link>الخصائص</nuxt-link>
<nuxt-link>كيف يعمل ؟</nuxt-link>
<nuxt-link>المقالات</nuxt-link>
<nuxt-link>التقييمات</nuxt-link>

</div>

<img src="/assets/images/landingPage/Group29.png" alt="">
</v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.footer {
    background-image: url('/assets/images/landingPage/Rectangle367.png');
    background-size: cover;
    position: relative;
    height: 250px;
    background-color: #1e2746;
}
</style>