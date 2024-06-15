<template>
    <v-card class="text-center nav rounded-lg mt-10">
        <v-tabs v-model="tab" bg-color="blue-darken-1">
            <v-tab class="mx-auto" value="one"><h1 class="font-bold text-xl">{{ $t('Company Profile') }}</h1></v-tab>
            <v-tab class="mx-auto" value="two"><h1 class="font-bold text-xl">{{ $t('Numbers of the last session') }}</h1></v-tab>
            <v-tab class="mx-auto" value="three"><h1 class="font-bold text-xl">{{ $t('News') }}</h1></v-tab>
            <v-tab class="mx-auto" value="four"><h1 class="font-bold text-xl">{{ $t('Financial Analysis') }}</h1></v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="one">
                    <StockProfile />
                </v-window-item>

                <v-window-item value="two">
<StockNumbers />
                </v-window-item>

                <v-window-item value="three">
                    <StockNews />

                </v-window-item>
                <v-window-item value="four">
                    <StockData />

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