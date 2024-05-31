<template>
  <nav
    class="shadow-lg h-20 flex justify-around items-center sticky top-0 z-10"
    style="direction: rtl;"
  >
    <!-- START LOGO AND LINKS -->
    <div
      class="flex items-center gap-10 mx-6"

    >
      <NuxtLink
        class="font-bold text-2xl md:text-3xl lg:text-5xl text-green-500 hover:text-green-400 hover:scale-105 delayed"
        to="/"
      >
        عقاري</NuxtLink
      >
      <ul
        class="font-bold text-xl lg:flex items-center gap-4 mt-2 cursor-pointer hidden"
      >
        <li
          class="bg-gray-300 px-2 py-2 rounded hover:bg-gray-400 text-black delayed"
        >
          <NuxtLink to="NewShipment"> الرئيسية</NuxtLink>
        </li>
        <li
          class="bg-gray-300 px-2 py-2 rounded hover:bg-gray-400 text-black delayed"
        >
          <NuxtLink to="/ShipmentsTrack">من نحن</NuxtLink>
        </li>
        <li
          class="bg-gray-300 px-2 py-2 rounded hover:bg-gray-400 text-black delayed"
        >
          تواصل معنا
        </li>
      </ul>
    </div>
    <!-- END LOGO AND LINKS-->
    <!-- START OTHER OPTIONS -->
    <div
      class="flex items-center gap-4"
    >
      <ColorMode />
    </div>
    <!-- END OTHER OPTIONS -->
  </nav>
</template>

<style>
.delayed {
  transition: 0.3s ease-in-out;
}
</style>
