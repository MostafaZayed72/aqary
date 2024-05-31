<template>
    <UPopover :popper="{ arrow: true }" class="bg-white">
        <UButton color="white" :label="open" trailing-icon="i-heroicons-chevron-down-20-solid"
            class="py-2 px-4  font-bold flex gap-2 md:gap-10 lg:gap-20 bg-white" />

        <template #panel>
            <div class="px-8 my-4">
                <h1 class="font-bold  text-center mb-4">نوع العرض</h1>
                <div class=" flex justify-around w-[100px] md:w-[200px] lg:w-[400px]  rounded" style="border: 1px solid;">
                    <h1 class="cursor-pointer font-bold py-2 sell w-1/2 rounded  text-center "
                        :class="open == 'للبيع' ? 'text-green-500 bg-green-100' : ''" @click="sell()">للبيع
                    </h1>
                    <h1 class="cursor-pointer font-bold py-2 rent w-1/2 rounded  text-center"
                        :class="open == 'للإيجار' ? 'text-green-500 bg-green-100' : ''" @click="rent()">للإيجار</h1>
                </div>

            </div>
            <chips v-if="rentShow" class="pb-8" />
        </template>
    </UPopover>
</template>
<script setup lang="ts">
const open = ref("للبيع");
const rentShow = ref();

const sell = () => {
    open.value = "للبيع";
    rentShow.value = false;
    const elements = document.getElementsByClassName('sell');
    if (elements.length > 0) {
        const element = elements[0];
        element.classList.add('text-green-500', 'bg-green-100');
    }
    const rentElements = document.getElementsByClassName('rent');
    if (rentElements.length > 0) {
        for (let i = 0; i < rentElements.length; i++) {
            rentElements[i].classList.remove('text-green-500', 'bg-green-100');
        }
    }
}

const rent = () => {
    open.value = "للإيجار";
    rentShow.value = true;

    const elements = document.getElementsByClassName('rent');
    if (elements.length > 0) {
        const element = elements[0];
        element.classList.add('text-green-500', 'bg-green-100');
    }
    const sellElements = document.getElementsByClassName('sell');
    if (sellElements.length > 0) {
        for (let i = 0; i < sellElements.length; i++) {
            sellElements[i].classList.remove('text-green-500', 'bg-green-100');
        }
    }
}
</script>
