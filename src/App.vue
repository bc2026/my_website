<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import NamePlate from './components/NamePlate.vue'
import ResumeItems from './components/ResumeItems.vue'
// import { Analytics } from "@vercel/analytics/react"
// import GlowingCursor from './components/GlowingCursor.vue'

const x = ref(0)
const y = ref(0)

const bgStyle = computed(() => ({
  background: `radial-gradient(circle at ${x.value}px ${y.value}px, rgba(0,255,255,0.1), transparent 150px)`,
  transition: 'background 0.05s',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
}))

function move(e) {
  x.value = e.clientX
  y.value = e.clientY
}

onMounted(() => window.addEventListener('mousemove', move))
onUnmounted(() => window.removeEventListener('mousemove', move))
</script>

<template>
  <div>
    <!-- Background glow -->
    <div :style="bgStyle"></div>
    <!-- Analytics -->
    <Analytics/>
    <!-- Main content -->
    <!-- <GlowingCursor /> -->
    <NamePlate />
    <ResumeItems />
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  background-color: #000;
  color: white;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
