<template>
    <NavBar />
    <div class="pages-header h-[600px] w-[95%] mx-auto mt-10 rounded flex flex-col items-center justify-center  ">
        <h1 class="md:text-xl lg:text-3xl font-bold bg-green-500 rounded-lg py-4 px-6 text-white mb-10 w-[90%] md:w-[60%] lg:w-[60%] text-center">ابحث عن عقارات للبيع و للايجار في السعودية
        </h1>
        <div class="w-[90%] md:w-[60%] lg:w-[60%] rounded py-4 px-4 flex flex-col gap-4" style="background-color:#0300008c;">
            <div class="flex justify-around items-center gap-6">
                <forSale />
                <input type="text" class="bg-white flex-1 w-2 p-2 rounded" placeholder="أدخل الموقع">
                <selectTest />
            </div>
            <div class="flex justify-around items-center gap-6">
                <space />
                <price />
                
            </div>
            <nuxt-link to="" class="mx-auto text-center"><button
                        class="bg-green-600 px-16 py-2 text-white font-bold mx-auto text-center rounded">ابحث</button></nuxt-link>
        </div>
    </div>
    <div class="h-[500px]"></div>

</template>
<style scoped>
.pages-header {
    direction: rtl;
    background-image: url('/assets/images/test.jpg');
    background-size: cover;
    background-position: center;
}

input:focus::placeholder {
    opacity: 0;
}
</style>