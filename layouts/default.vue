<template>
  <div >
      <div class="navbar-container ">
          <LandingNavbar class="fixed top-10 z-30"/>
      </div>
      <slot />
      <landingFooter class="mt-10"/>

  </div>
</template>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: center; /* To center horizontally */
  position: fixed; /* Fixing the position of the container */
  width: 100%; /* Ensuring it takes the full width of the screen */
  top: 10px; /* Adjust this value as needed */
  z-index: 30; /* To keep the z-index high */
}
</style>
