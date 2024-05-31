<template>
  <div class="md:flex justify-between items-center mx-4 hidden"
    :class="$colorMode.preference == 'light' ? 'bg-cool-300' : ''" style="direction: rtl;">
    <div class="flex gap-2 md:gap-8">
      <div class="flex items-center cursor-pointer gap-1 hover:text-green-400 ">
        <Icon name="material-symbols:settings-rounded" class="text-xl" />
        <h1 class="font-bold">الإعدادات</h1>
      </div>
      <div class="flex items-center cursor-pointer gap-1 hover:text-green-400 ">
        <Icon name="material-symbols:app-promo-sharp" class="text-xl" />
        <h1 class="font-bold">تحميل التطبيق</h1>
      </div>
    </div>


    <div class="flex gap-2 md:gap-8">
      <div class="flex items-center cursor-pointer gap-1 hover:text-green-400 ">
        <Icon name="material-symbols:favorite" class="text-xl" />
        <h1 class="font-bold">الإعلانات المفضلة</h1>
      </div>
      <div class="flex items-center cursor-pointer  hover:text-green-400 ">
        <Icon name="material-symbols:person" class="text-xl" />
        <Icon name="material-symbols:arrow-drop-down" class="text-xl" />
       
      </div>
    </div>


  </div>
  <hr class="hidden md:block" />

  <nav class="shadow-lg h-20 flex justify-around items-center " style="direction: rtl;">
    <!-- START LOGO AND LINKS -->
    
    <!-- <div class="md:hidden cursor-pointer"><Icon name="iconamoon:menu-burger-horizontal-bold" class="text-2xl"/></div> -->
 <MenuBurger />
    <div class="flex items-center gap-10 mx-6">
      <NuxtLink
        class="font-bold text-3xl   text-green-500 hover:text-green-400 hover:scale-105 delayed flex items-center"
        to="/">
        عقاري
        <Icon name="material-symbols:garage-home" />
      </NuxtLink>
      <ColorMode class="hidden md:block" />



    </div>
    <ColorMode class="md:hidden" />
    <!-- END LOGO AND LINKS-->
    <!-- START OTHER OPTIONS -->
    <div class="md:flex items-center gap-4 hidden">
      <ul class="font-bold text-xl flex items-center gap-4 mt-2 cursor-pointer ">
        <li class="bg-gray-300 px-2 py-2 rounded hover:bg-green-400 text-black delayed">
          <NuxtLink to="NewShipment"> المدونة</NuxtLink>
        </li>
        <li class="bg-gray-300 px-2 py-2 rounded hover:bg-green-400 text-black delayed">
          <NuxtLink to="/ShipmentsTrack">الشركات العقارية</NuxtLink>
        </li>
        <li class="bg-gray-300 px-2 py-2 rounded hover:bg-green-400 text-black delayed">
          المشاريع الجديدة </li>
      </ul>
    </div>

    <!-- END OTHER OPTIONS -->
  </nav>
</template>

<style>
.delayed {
  transition: 0.3s ease-in-out;
}
</style>
