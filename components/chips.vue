<template>
  <div class="flex flex-col justify-center gap-2">
    <v-chip
      v-for="(chip, index) in chips"
      :key="index"
      class="flex justify-center"
      :class="{ 'bg-green-500 text-white': selectedChip === index, 'bg-white text-black': selectedChip !== index }"
      @click="selectChip(index)"
    >
      {{ chip.label }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const chips = ref([
  { label: 'سنوياً' },
  { label: 'شهرياً' },
  { label: 'أسبوعياً' },
  { label: 'يومياً' },
  { label: 'الجميع' }
]);

// تعيين الفهرس المبدئي للعنصر الذي يحمل الاسم "الجميع" أو الفهرس المحفوظ في localStorage
const savedIndex = localStorage.getItem('selectedChipIndex');
const selectedChip = ref<number | null>(savedIndex !== null ? parseInt(savedIndex) : chips.value.findIndex(chip => chip.label === 'الجميع'));

const selectChip = (index: number) => {
  selectedChip.value = index;
  localStorage.setItem('selectedChipIndex', index.toString());
};

// استرجاع الفهرس المحفوظ عند تحميل المكون
onMounted(() => {
  const savedIndex = localStorage.getItem('selectedChipIndex');
  if (savedIndex !== null) {
    selectedChip.value = parseInt(savedIndex);
  }
});
</script>

<style scoped>
.bg-green-500 {
  background-color: green;
}
.text-white {
  color: white;
}
.bg-white {
  background-color: white;
}
.text-black {
  color: black;
}
</style>
