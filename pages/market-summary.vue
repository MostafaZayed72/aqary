<template>
  <div>
   <stocks />
   <div class="flex flex-col md:flex-row  md:gap-4">
    <HomeTopFive />
    <HomeFewestFive />
   </div>
    <HomeTable />
        <!-- <HomeTopCompanies /> -->
         <HomeNews class="mt-10"/>

  </div>
</template>

<script setup>
useHead({
  title: 'Home Page'
})

</script>