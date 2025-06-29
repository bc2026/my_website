<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Panel1 from './components/Panel1.vue'
import PerlinNoiseBackground from './components/Background.vue'
// import ResumeItems from './components/ResumeItems.vue'
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
  <div id="app">
    <PerlinNoiseBackground />
    <!-- Your other application content here -->
    <main class="relative z-10 p-8 text-white">
      <h1 class="text-3xl font-bold">Welcome to my App!</h1>
      <p>This is where your main application content goes, over the animated background.</p>
    </main>


  <div class="frame-scroll">
    
    <!-- Background glow -->
    <div :style="bgStyle"></div>
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

.frame-scroll > div[style] {
  position: fixed !important; /* important to stay behind scroll content */
  z-index: -1;
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
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
