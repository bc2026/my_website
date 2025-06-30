<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Panel1 from './components/Panel1.vue'
import PerlinNoiseBackground from './components/Background.vue'
// import ResumeItems from './components/ResumeItems.vue'
// import { Analytics } from "@vercel/analytics/react"
// import GlowingCursor from './components/GlowingCursor.vue'

const mouseX = ref(0)
const mouseY = ref(0)
const glowElement = ref(null)

function move(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  
  if (glowElement.value) {
    // Use transform for GPU acceleration - much faster than background changes
    glowElement.value.style.transform = `translate(${mouseX.value - 150}px, ${mouseY.value - 150}px)`
  }
}

onMounted(() => {
  window.addEventListener('mousemove', move, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', move)
})
</script>

<template>
  <div id="app">
    <PerlinNoiseBackground />
    
    <div class="frame-scroll">
      
      <!-- Background glow -->
      <div ref="glowElement" class="cursor-glow"></div>
      <!-- GlowingCursor -->
      <!-- <GlowingCursor /> -->
      <!-- Analytics -->
      <!-- <Analytics/> -->
      

      <div class="content">
        <div class="wrapper">
        <!-- Frame 1 -->
        <section class="panel panel1">
                    <Panel1 />
        </section>
        </div>

        <div class="wrapper">
        <!-- Frame 2 -->
        <section class="panel panel2">
              <h3 style="text-align: center">Projects</h3>
        <!-- Frame 2 End -->
         </section>
        </div>

      </div>
      

    </div>
  </div>

</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  height: 100%;
  width: 100%;
}

.frame-scroll {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  z-index: -1;
  background: radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
  will-change: transform;
  transform: translate(-150px, -150px);
}

.content {
  width: 100%;
}

.panel {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: white;
  font-family: 'Montreal', 'MontrealRegular', 'montreal ts-regular', 'Montreal TS Regular', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  scroll-snap-align: start;
}

.panel1 {
  background-color: hwb(#FAF9F6)
}
.panel2 { background: rgba(99, 52, 47, 0.4); }
.panel3 { background: rgba(18, 68, 39, 0.4); }

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
