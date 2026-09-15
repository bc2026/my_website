<script setup>
import SiteNav from '@/components/layout/SiteNav.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import ProjectSection from '@/components/projects/ProjectSection.vue'
</script>

<template>
  <div class="home">
    <SiteNav />
    <main>
      <HeroSection />
      <ProjectSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
