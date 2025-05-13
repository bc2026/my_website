<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)
const showGitHub = ref(false)
const showLinkedIn = ref(false)
const showResume = ref(false)
const showMore = ref(false)

onMounted(() => {
  console.log('NamePlate mounted')
  show.value = true

  setTimeout(() => (showGitHub.value = true), 500)
  setTimeout(() => (showLinkedIn.value = true), 1000)
  setTimeout(() => (showResume.value = true), 1500)
  setTimeout(() => (showMore.value = true), 2000)
})
</script>

<template>
  <div class="nameplate-container">
    <Transition name="fade" appear>
      <h1 v-if="show" class="nameplate-text">Hi, I'm Bhagawat Chapagain</h1>
    </Transition>

    <Transition name="fade" appear>
      <p v-if="showGitHub" class="nameplate-link">
        <a href="https://github.com/bc2026" target="_blank" rel="noopener">GitHub</a>
      </p>
    </Transition>

    <Transition name="fade" appear>
      <p v-if="showLinkedIn" class="nameplate-link">
        <a href="https://linkedin.com/in/bc2026" target="_blank" rel="noopener">LinkedIn</a>
      </p>
    </Transition>

    <Transition name="fade" appear>
      <p v-if="showResume" class="nameplate-link">
        <a href="https://your-resume-link.pdf" target="_blank" rel="noopener">Resume</a>
      </p>
    </Transition>

    <Transition name="fade" appear>
      <p v-if="showMore" class="scroll-prompt">Scroll to see more...</p>
    </Transition>
  </div>
</template>
<style scoped>
.nameplate-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* This is crucial! */
  text-align: center;
}

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
  margin: 1rem 0;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.nameplate-link {
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: turquoise;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.scroll-prompt {
  margin-top: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}
</style>