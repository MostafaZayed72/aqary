<template>
    <button class="scroll-to-top" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // تجعل التمرير ناعمًا
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .scroll-to-top {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background-color: #4fd1c5;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .scroll-to-top:hover {
    background-color: #38b2ac;
  }
  </style>
  