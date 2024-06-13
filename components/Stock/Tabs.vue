<template>
    <v-card class="text-center nav rounded-lg mt-10">
        <v-tabs v-model="tab" bg-color="blue-darken-1">
            <v-tab class="mx-auto" value="one"><h1 class="font-bold text-xl">{{ $t('Company Profile') }}</h1></v-tab>
            <v-tab class="mx-auto" value="two"><h1 class="font-bold text-xl">{{ $t('News') }}</h1></v-tab>
            <v-tab class="mx-auto" value="three"><h1 class="font-bold text-xl">try</h1></v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="one">
                    <StockProfile />
                </v-window-item>

                <v-window-item value="two">
                    <StockNews />

                </v-window-item>

                <v-window-item value="three">
                    <h1 class="text-xl font-bold">I graduated from the Faculty of Nursing, Alexandria University, in 2018 <br>
                        I started studying programming in August 2023 <br>
                        I learned HTML/CSS/JavaScript/TypeScript/Vue.js/Nuxt.js
                    </h1>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        tab: null,
    }),
}
</script>

<style>
.v-tab--selected {
    color: #0cadb3;
}
</style>