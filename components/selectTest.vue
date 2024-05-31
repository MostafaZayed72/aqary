<template>
  <UPopover :popper="{ arrow: true }">
    <UButton color="white" :label="open" trailing-icon="i-heroicons-chevron-down-20-solid"
      class="py-2 px-4  font-bold flex gap-2 md:gap-10 lg:gap-20" />

    <template #panel>
      <div class="px-8 my-4">
        <div class="flex flex-col justify-center gap-2 font-bold">
          <v-chip v-for="(chip, index) in chips" :key="index" class="font-bold"
            :class="{ 'bg-green-500 text-white': selectedChip === index, 'bg-white text-black': selectedChip !== index }"
            @click="selectChip(index)">
            {{ chip.label }}
          </v-chip>
        </div>


      </div>

    </template>
  </UPopover>

</template>
<script setup lang="ts">
const open = ref("شقة");


const chips = ref([

  { label: 'أرض' },
  { label: 'فيلا' },
  { label: 'استراحة' },
  { label: 'فندق' },
  { label: 'شقة' }
]);

// تعيين الفهرس المبدئي للعنصر الذي يحمل الاسم "Default"
const selectedChip = ref<number | null>(chips.value.findIndex(chip => chip.label === 'شقة'));

const selectChip = (index: number) => {
  selectedChip.value = index;
  open.value = chips.value[index].label;
};
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