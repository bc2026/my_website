<template>
  <Motion
    tag="div"
    :initial="{ y: 0 }"
    :animate="{ y: [0, -15, 0] }"
    :transition="{
      duration: 1.2,
      repeat: Infinity,
      repeatType: 'loop',
      easing: 'ease-in-out'
    }"
    class="bounce-box"
  >
    <slot />
  </Motion>
</template>

<script setup>
import { Motion } from '@motionone/vue'
</script>

<style scoped>
.bounce-box {
  display: inline-block;
  padding: 2rem;
  border-radius: 1rem;
  color: #000;
  font-weight: bold;
}
</style>
