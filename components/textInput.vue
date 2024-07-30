
<template>
    <div class="card flex justify-center">
        <InputText class="w-[400px]" v-model="value" :invalid="value === null"  />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
