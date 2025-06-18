<script setup>
import { ref, onMounted } from 'vue'
import { Presence } from '@motionone/vue'
import BounceAnimation from './BounceAnimation.vue'
import VueGlow from 'vue-glow';

const roles = [
  'Student',
  'Software Engineer',
  'Machine Learning Researcher',
  'Full Stack Developer',
  'AI Enthusiast',
  'Data Scientist',  
]

const currentRole = ref(roles[0])
let roleIndex = 0

const show = ref(false)
const showHi = ref(false)
const showRole = ref(false)
const showGitHub = ref(false)
const showLinkedIn = ref(false)
const showResume = ref(false)
const showArrow = ref(false)
const showDynamicRole = ref(true)

onMounted(() => {
  show.value = true
  setTimeout(() => (showHi.value = true), 1000)
  setTimeout(() => (showRole.value = true), 3000)
  setTimeout(() => (showGitHub.value = true), 3500)
  setTimeout(() => (showLinkedIn.value = true), 4000)
  setTimeout(() => (showResume.value = true), 4500)
  setTimeout(() => (showArrow.value = true), 5000)

  setInterval(() => {
    showDynamicRole.value = false
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length
      currentRole.value = roles[roleIndex]
      showDynamicRole.value = true
    }, 3000)
  }, 3000)
})
</script>

<template>
  <div class="nameplate-container">
    <div class="nameplate-content">
      <Transition name="fade" appear>
        <h1 v-if="showHi" class="nameplate-text">Hi, I'm Bhagawat Chapagain.</h1>
      </Transition>

      <Transition name="fade" appear>
        <h1 v-if="showRole" class="nameplate-text">a 20-year-old</h1>
      </Transition>

      <Transition name="fade" appear>
  <h1 v-if="showRole" class="nameplate-text glow">
    <span class="dynamic-role">{{ currentRole }}</span>
  </h1>
</Transition>

      <div v-if="showGitHub || showLinkedIn || showResume" class="link-row">
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
            <a href="https://gitfront.io/r/bc2026/RNdNZKQyHzhE/Resumes/raw/2025/SWE_Resume_Summer_2025_Bentley.pdf" target="_blank" rel="noopener">Resume</a>
          </p>
        </Transition>
      </div>
    </div>

    <div v-if="showArrow" class="bounce-container absolute-arrow">
      <Presence>
        <BounceAnimation>
          <img src="/arrow_down.png" width="12" height="12" />
        </BounceAnimation>
      </Presence>
    </div>
  </div>
</template>

<style scoped>
.nameplate-container {
  padding: 1rem;
  text-align: center;
  max-width: 100vw;
  overflow-x: hidden;
}

.nameplate-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
}

.nameplate-text {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  word-break: break-word;
}

.dynamic-role {
  font-style: italic;
  color: white;
  transition: opacity 0.5s ease;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.link-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nameplate-link {
  font-size: 1.25rem;
  color: turquoise;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.bounce-container {
  margin-top: 2rem;
}

.absolute-arrow {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
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

@media (max-width: 600px) {
  .nameplate-text {
    font-size: 1.5rem;
  }

  .nameplate-link {
    font-size: 1rem;
  }

  .absolute-arrow {
    bottom: 1rem;
  }

  .link-row {
    gap: 0.75rem;
  }
}

</style>