<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const token = ref('');
const message = ref('Loading...');

const fetchData = async () => {
  try {
    // جلب التوكن من LocalStorage
    token.value = localStorage.getItem('token');

    // تحقق من أن التوكن موجود
    if (!token.value) {
      throw new Error('Token not found in localStorage');
    }

    // إعداد مثيل axios مع التوكن
    const instance = axios.create({
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    });

    // إجراء الطلب إلى الـ endpoint المحدد
    const response = await instance.get('https://development.somee.com/api/StockMarket/TestSecurity', {
      params: { symbol: '2222.SR' },
    });

    // تحديث الرسالة بناءً على الاستجابة
    message.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    message.value = 'Failed to load data';
  }
};

onMounted(fetchData);
</script>
