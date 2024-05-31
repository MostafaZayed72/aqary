<template>
    <UPopover :popper="{ arrow: true }" class="bg-white">
        <UButton color="white" :label="open" trailing-icon="i-heroicons-chevron-down-20-solid"
            class="py-2 px-4  font-bold flex  gap-2 md:gap-20 lg:gap-40 bg-white " />
        <template #panel>
            <div class="px-1 md:px-8 my-4 flex gap-2 md:gap-6 ">
                <UPopover :popper="{ arrow: true }">
    <UButton color="white" :label="lowest" trailing-icon="i-heroicons-chevron-down-20-solid"
      class="py-2 px-4  font-bold flex gap-2 md:gap-10" />

    <template #panel>
      <div class="px-2 my-4">
        <div class="flex flex-col justify-center gap-2 font-bold ">
          <v-chip v-for="(chip, index) in chips" :key="index" class="font-bold flex justify-center"
            :class="{ 'bg-green-500 text-white': selectedChip === index, 'bg-white text-black': selectedChip !== index }"
            @click="selectChip(index)">
            {{ chip.label }}
          </v-chip>
        </div>


      </div>

    </template>
  </UPopover>
  <UPopover :popper="{ arrow: true }">
    <UButton color="white" :label="max" trailing-icon="i-heroicons-chevron-down-20-solid"
      class="py-2 px-4  font-bold flex gap-2 md:gap-10 " />

    <template #panel>
      <div class="px-2 my-4 ">
        <div class="flex flex-col justify-center gap-2 font-bold ">
          <v-chip v-for="(chip, index) in chipss" :key="index" class="font-bold flex justify-center"
            :class="{ 'bg-green-500 text-white text-center': selectedChips === index, 'bg-white text-black': selectedChips !== index }"
            @click="selectChips(index)">
            {{ chip.label }}
          </v-chip>
        </div>
      </div>

    </template>
  </UPopover>
                
            </div>
            <chips v-if="rentShow" class="pb-8" />
        </template>
    </UPopover>
</template>
<script setup lang="ts">
const open = ref("السعر (ريال)");
const rentShow = ref();


const lowest = ref("أقل سعر");
const max = ref("أكبر سعر");


const chips = ref([
  { label: '200,000' },
  { label: '225,000' },
  { label: '250,000' },
  { label: '275,000' }

]);
const chipss = ref([

  { label: '400,000' },
  { label: '450,000' },
  { label: '500,000' },
  { label: '550,000' }
]);

// تعيين الفهرس المبدئي للعنصر الذي يحمل الاسم "Default"
const selectedChip = ref<number | null>(chips.value.findIndex(chip => chip.label === 'شقة'));
const selectedChips = ref<number | null>(chipss.value.findIndex(chip => chip.label === 'شقة'));

const selectChip = (index: number) => {
  selectedChip.value = index;
  lowest.value = chips.value[index].label;
  open.value = lowest.value + " - " + max.value 
};
const selectChips = (index: number) => {
  selectedChips.value = index;
  max.value = chipss.value[index].label;
  open.value = lowest.value + " - " + max.value 

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