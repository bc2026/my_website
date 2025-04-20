<template>
    <div class="cursor" :style="cursorStyle"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue'

  const x = ref(0)
  const y = ref(0)
  
  const cursorStyle = computed(() => ({
    transform: `translate3d(${x.value}px, ${y.value}px, 0)`,
  }))
  
  function update(e) {
    x.value = e.clientX
    y.value = e.clientY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  </script>
  
  <style scoped>
  .cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    background: rgba(0, 255, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    box-shadow: 0 0 15px 5px rgba(0, 255, 255, 0.8);
    transition: transform 0.05s linear;
  }
  </style>
  