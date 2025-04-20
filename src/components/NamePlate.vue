<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  console.log('NamePlate mounted')
  requestAnimationFrame(() => {
    show.value = true
  })
})
</script>

<template>
  <Transition name="fade" appear>
    <h1 v-if="show" class="nameplate-text">Hi, I'm Bhagawat Chapagain</h1>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1000ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.nameplate-text {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}
</style>
