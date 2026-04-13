<script setup>
import { ref, onMounted, computed } from 'vue'
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
const isTransitioning = ref(false)

// Compute dynamic width based on role length
const dynamicGlassStyle = computed(() => {
  const roleLength = currentRole.value.length
  let dynamicWidth = Math.max(500, Math.min(700, roleLength * 18 + 350))
  
  return {
    maxWidth: `${dynamicWidth}px`,
    transform: isTransitioning.value ? 'scale(1.02)' : 'scale(1)',
    borderColor: isTransitioning.value ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
    background: isTransitioning.value 
      ? `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(0, 0, 0, 0.22)`
      : `linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%), rgba(0, 0, 0, 0.18)`,
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  }
})

const show = ref(false)
const showHi = ref(false)
const showRole = ref(false)
const showDynamicRole = ref(false)
const showGitHub = ref(false)
const showLinkedIn = ref(false)
const showResume = ref(false)
const showArrow = ref(false)

onMounted(() => {
  show.value = true
  setTimeout(() => (showHi.value = true), 800)
  setTimeout(() => (showRole.value = true), 1900)
  setTimeout(() => (showDynamicRole.value = true), 2800)
  setTimeout(() => (showGitHub.value = true), 3400)
  setTimeout(() => (showLinkedIn.value = true), 3800)
  setTimeout(() => (showResume.value = true), 4200)
  setTimeout(() => (showArrow.value = true), 4800)

  setInterval(() => {
    isTransitioning.value = true
    showDynamicRole.value = false
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length
      currentRole.value = roles[roleIndex]
      showDynamicRole.value = true
      // Reset transition state after role appears
      setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }, 600)
  }, 5000)
})


</script>

<template>
  <div class="nameplate-container">
    <div class="glass-backdrop" :style="dynamicGlassStyle">
      <div class="nameplate-content">
        <Transition name="slide-fade" appear>
          <h1 v-if="showHi" class="nameplate-text">Hi, I'm Bhagawat Chapagain.</h1>
        </Transition>

        <Transition name="slide-fade" appear>
          <h1 v-if="showRole" class="nameplate-text">a 20-year-old</h1>
        </Transition>

        <Transition name="slide-fade-scale" appear>
          <h1 v-if="showDynamicRole" class="nameplate-text glow">
            <span class="dynamic-role">{{ currentRole }}</span>
          </h1>
        </Transition>

        <div v-if="showGitHub || showLinkedIn || showResume" class="link-row">
          <Transition name="slide-fade-stagger" appear>
            <p v-if="showGitHub" class="nameplate-link">
              <a href="https://github.com/bc2026" target="_blank" rel="noopener">GitHub</a>
            </p>
          </Transition>

          <Transition name="slide-fade-stagger" appear>
            <p v-if="showLinkedIn" class="nameplate-link" style="transition-delay: 0.1s;">
              <a href="https://linkedin.com/in/bc2026" target="_blank" rel="noopener">LinkedIn</a>
            </p>
          </Transition>

          <Transition name="slide-fade-stagger" appear>
            <p v-if="showResume" class="nameplate-link" style="transition-delay: 0.2s;">
              <a href="https://gitfront.io/r/bc2026/RNdNZKQyHzhE/Resumes/raw/2025/SWE_Resume_Summer_2025_Bentley.pdf" target="_blank" rel="noopener">Resume</a>
            </p>
          </Transition>
        </div>
      </div>
    </div>

    <Transition name="bounce-fade" appear>
      <div v-if="showArrow" class="bounce-container absolute-arrow">
        <Presence>
          <BounceAnimation>
            <img src="/arrow_down.png" width="12" height="12" />
          </BounceAnimation>
        </Presence>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.nameplate-container {
  padding: 1rem;
  text-align: center;
  max-width: 100vw;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}

.glass-backdrop {
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%),
    rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 2.5rem 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  position: relative;
  /* Enhanced inner highlight for glass effect with darker base */
  background-image: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
    linear-gradient(225deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%);
  /* Add subtle outer glow for definition */
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.2));
  /* Smooth transitions for all animatable properties */
  transition: 
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.3s ease,
    border-color 0.3s ease,
    filter 0.3s ease;
}

.nameplate-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.nameplate-text {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: white;
  word-break: break-word;
}

.dynamic-role {
  font-style: italic;
  color: white;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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
}

.nameplate-link a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: inline-block;
}

.nameplate-link a:hover {
  transform: translateY(-2px);
  background: rgba(64, 224, 208, 0.1);
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

/* Enhanced slide-fade animation */
.slide-fade-enter-active {
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-fade-leave-active {
  transition: all 0.9s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Enhanced slide-fade with scale for dynamic role */
.slide-fade-scale-enter-active {
  transition: all 1.0s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-fade-scale-leave-active {
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-fade-scale-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.slide-fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(1.05);
}

/* Staggered animation for links */
.slide-fade-stagger-enter-active {
  transition: all 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-fade-stagger-leave-active {
  transition: all 0.8s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.slide-fade-stagger-enter-from {
  opacity: 0;
  transform: translateY(25px) scale(0.9);
}
.slide-fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(1.1);
}

/* Bounce-fade animation for arrow */
.bounce-fade-enter-active {
  transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.bounce-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.bounce-fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(30px) scale(0.8);
}
.bounce-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(1.2);
}

/* Enhanced mobile responsive design */
@media (max-width: 320px) {
  /* Very small screens (iPhone SE, etc.) */
  .nameplate-container {
    padding: 0.5rem;
  }
  
  .nameplate-text {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .nameplate-link {
    font-size: 0.9rem;
  }

  .glass-backdrop {
    padding: 1.5rem 1rem;
    margin: 0 auto;
    border-radius: 16px;
    max-width: calc(100vw - 1rem);
    width: calc(100vw - 1rem);
  }

  .link-row {
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
  }

  .nameplate-link a {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .absolute-arrow {
    bottom: 0.5rem;
  }
}

@media (max-width: 480px) {
  /* Small mobile screens */
  .nameplate-container {
    padding: 0.75rem;
  }
  
  .nameplate-text {
    font-size: 1.4rem;
    margin: 0.75rem 0;
  }

  .nameplate-link {
    font-size: 1rem;
  }

  .glass-backdrop {
    padding: 1.75rem 1.25rem;
    margin: 0 auto;
    border-radius: 18px;
    max-width: calc(100vw - 1.5rem);
    width: calc(100vw - 1.5rem);
  }

  .link-row {
    gap: 0.5rem;
  }

  .nameplate-link a {
    padding: 0.4rem 0.8rem;
  }

  .absolute-arrow {
    bottom: 0.75rem;
  }
}

@media (max-width: 600px) {
  /* Medium mobile screens */
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

  .glass-backdrop {
    padding: 2rem 1.5rem;
    margin: 0 auto;
    border-radius: 20px;
    max-width: calc(100vw - 2rem);
    width: calc(100vw - 2rem);
  }
}

@media (max-width: 768px) {
  /* Large mobile screens and small tablets */
  .nameplate-text {
    font-size: 1.6rem;
  }

  .nameplate-link {
    font-size: 1.1rem;
  }

  .glass-backdrop {
    padding: 2.25rem 1.75rem;
    margin: 0 auto;
    max-width: calc(100vw - 2.5rem);
    width: calc(100vw - 2.5rem);
  }
}

/* Landscape mobile optimizations */
@media (max-width: 768px) and (orientation: landscape) {
  .nameplate-text {
    font-size: 1.3rem;
    margin: 0.4rem 0;
  }

  .glass-backdrop {
    padding: 1.5rem 2rem;
    margin: 0 auto;
    max-width: 90vw;
    width: 90vw;
  }

  .link-row {
    margin-top: 0.5rem;
  }

  .absolute-arrow {
    bottom: 0.5rem;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .nameplate-link a {
    min-height: 44px; /* Minimum touch target size */
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    touch-action: manipulation;
  }

  .nameplate-link a:hover {
    /* Remove hover effects on touch devices */
    transform: none;
    background: transparent;
  }

  .nameplate-link a:active {
    /* Add active state for touch feedback */
    transform: scale(0.98);
    background: rgba(64, 224, 208, 0.15);
  }
}

/* High DPI mobile displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .nameplate-text {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .glass-backdrop {
    border-width: 1px; /* Thinner borders on high DPI */
  }
}

/* Tablet portrait */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .nameplate-text {
    font-size: 1.8rem;
  }

  .nameplate-link {
    font-size: 1.2rem;
  }

  .glass-backdrop {
    padding: 2.5rem 2rem;
    max-width: 600px;
  }
}

/* Tablet landscape */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .nameplate-text {
    font-size: 1.6rem;
  }

  .glass-backdrop {
    padding: 2rem;
    max-width: 700px;
  }
}
</style>