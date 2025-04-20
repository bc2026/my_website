<script setup>
import { ref, onMounted } from 'vue'

const showGitHub = ref(false)
const showLinkedIn = ref(false)
const showResume = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => (showGitHub.value = true), 1500)
    setTimeout(() => (showLinkedIn.value = true), 2000)
    setTimeout(() => (showResume.value = true), 2500)
  })
})
</script>

<template>
    <div class="nameplate-container">
      <Transition name="fade" appear>
        <h1 v-if="showGitHub" class="nameplate-text" style="text-align: left;">
          <a href="https://github.com/bc2026" target="_blank" rel="noopener">GitHub</a>
        </h1>
      </Transition>
  
      <Transition name="fade" appear>
        <h1 v-if="showLinkedIn" class="nameplate-text" style="text-align: left;">
          <a href="https://www.linkedin.com/in/bc2026/" target="_blank" rel="noopener">LinkedIn</a>
        </h1>
      </Transition>
  
      <Transition name="fade" appear>
        <h1 v-if="showResume" class="nameplate-text" style="text-align: left;">
          <a href="https://gitfront.io/r/bc2026/RNdNZKQyHzhE/Resumes/raw/Resume__Franklin_.pdf" target="_blank" rel="noopener">Resume</a>
        </h1>
      </Transition>
    </div>
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
  margin-top: 2rem;
}
</style>
