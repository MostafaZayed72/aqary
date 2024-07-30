<template>
  <div class="flex">
    <img class="relative" src="/assets/images/register/Ellipse23.png" alt="">
    <img class="absolute right-[750px] top-60" src="/assets/images/register/Frame.png" alt="">

    <div class="flex flex-col items-end ml-32 mt-52">
      <h1 class="font-bold text-3xl">سجل حساب جديد</h1>
      <h1 class="text-gray-500 mb-2">الإسم</h1>
      <InputText v-model="userName" class="w-[350px]" style="border: 1px solid #45c8ff; border-radius: 15px; direction: rtl;" />
      <h1 class="text-gray-500 mb-2 mt-4">رقم الهاتف</h1>
      <InputText v-model="mobile" class="w-[350px]" style="border: 1px solid #45c8ff; border-radius: 15px;" />
      <h1 class="text-gray-500 mb-2 mt-4">البريد الإلكتروني</h1>
      <InputText v-model="signupEmail" class="w-[350px]" style="border: 1px solid #45c8ff; border-radius: 15px;" />
      <h1 class="text-gray-500 mb-2 mt-4">كلمة المرور</h1>
      <InputText v-model="signupPassword" type="password" class="w-[350px]" style="border: 1px solid #45c8ff; border-radius: 15px;" />

      <h1 @click="signUp"
          class="mt-8 text-center bg-gray-300 mx-auto w-100 py-2 font-bold text-gray-500 text-xl hover:bg-gray-400 delayed hover:text-white cursor-pointer"
          style="border-radius: 15px;">تسجيل حساب</h1>
      <div class="mt-4 flex justify-center mx-auto gap-2 font-bold">
        <NuxtLink to="/login" class="text-blue-500">تسجيل الدخول</NuxtLink>
        <h1 class="text-gray-500">لديك حساب بالفعل؟</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userName = ref('');
const mobile = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const responseMessage = ref('');

const signUp = async () => {
  try {
    const response = await fetch('https://finrep.net/api/User/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        Mobile: mobile.value,
        email: signupEmail.value,
        password: signupPassword.value,
        confirmPassword: signupPassword.value,
      }),
    });

    if (response.ok) {
      responseMessage.value = 'تم إنشاء الحساب بنجاح وتم إرسال بريد إلكتروني للتحقق.';
    } else {
      const errorMessage = await response.json();

      if (errorMessage.errors) {
        if (errorMessage.errors.ConfirmPassword) {
          responseMessage.value = errorMessage.errors.ConfirmPassword[0];
        } else if (errorMessage.errors.Password) {
          responseMessage.value = errorMessage.errors.Password[0];
        } else if (errorMessage.errors.Email) {
          responseMessage.value = errorMessage.errors.Email[0];
        } else if (errorMessage.errors.Mobile) {
          responseMessage.value = errorMessage.errors.Mobile[0];
        } else if (errorMessage.errors.UserName) {
          responseMessage.value = errorMessage.errors.UserName[0];
        } else {
          responseMessage.value = errorMessage.msg || 'حدث خطأ غير متوقع';
        }
      } else {
        responseMessage.value = errorMessage.msg || 'حدث خطأ غير متوقع';
      }
    }
  } catch (error) {
    responseMessage.value = error.message || 'المستخدم موجود بالفعل';
  } finally {
    alert(responseMessage.value); // عرض الرسالة في جميع الحالات
  }
};
</script>
