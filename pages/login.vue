<template>
    <div class="flex ">
      <img class="relative" src="/assets/images/register/Ellipse23.png" alt="">
      <img class="absolute right-[750px] top-60" src="/assets/images/register/Frame.png" alt="">
  
      <div class="flex flex-col items-end ml-32 mt-52">
        <h1 class="font-bold text-3xl">تسجيل الدخول الآن</h1>
        
        <h1 class="text-gray-500 mb-2 mt-4">البريد الإلكتروني</h1>
        <InputText class="w-[350px] " style="border: 1px solid #45c8ff; border-radius: 15px;" />
        <h1 class="text-gray-500 mb-2 mt-4">كلمة المرور</h1>
        <InputText class="w-[350px] " style="border: 1px solid #45c8ff; border-radius: 15px;x" />
  
        <h1
  class="mt-8 text-center mx-auto w-100 py-2 font-bold text-xl cursor-pointer text-white"
  style="border-radius: 15px; background: linear-gradient(to right, #a2d5f2, #45c8ff);">
  تسجيل الدخول
</h1>

        <div class="mt-8 flex justify-center mx-auto gap-8 font-bold" style="direction: rtl;">
          <div class="flex flex-col">
            <h1 class="text-gray-500">ليس لديك حساب؟</h1>
            <NuxtLink to="/login" class="text-blue-500">تسجيل حساب جديد</NuxtLink>
  
</div>

  <img src="/assets/images/register/Rectangle.png" alt="">
          <div class="flex flex-col">
            <h1 class="text-gray-500">نسيت كلمة المرور؟</h1>
            <NuxtLink to="/login" class="text-blue-500">تغيير كلمة المرور</NuxtLink></div>
           
  
  
        </div>
      </div>
    </div>
  </template>