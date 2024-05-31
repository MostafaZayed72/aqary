<template>
    <div class="text-center" style="direction: rtl;">
        <v-menu style="direction: rtl;">
            <template v-slot:activator="{ props }">
                <Icon name="iconamoon:menu-burger-horizontal-bold" class="text-2xl" v-bind="props" />
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title>المدونة</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>الشركات العقارية</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>المشاريع الجديدة</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>الإعلانات المفضلة</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>الإعدادات</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>تحميل التطبيق</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
export default {
    data: () => ({
        items: [
            { title: 'المدونة' },
            { title: 'الشركات العقارية' },
            { title: 'المشاريع الجديدة' },
            { title: 'الإعلانات المفضلة' },
            { title: 'الإعدادات' },
            { title: 'تحميل التطبيق' }
        ],
    }),
}
</script>