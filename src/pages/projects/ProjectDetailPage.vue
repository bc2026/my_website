<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectBySlug } from '@/data/projectDetails'
import ProjectMotif from '@/components/projects/ProjectMotif.vue'

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug))

const themeStyle = computed(() => {
  if (!project.value) return {}
  const t = project.value.theme
  return {
    '--project-accent': t.accent,
    '--project-accent-dim': t.accentDim,
    '--project-accent-glow': t.accentGlow,
  }
})
</script>

<template>
  <div v-if="project" class="project-page" :style="themeStyle">
    <div class="theme-glow" aria-hidden="true" />

    <header class="page-header">
      <router-link to="/#projects" class="back-link">← Back to projects</router-link>

      <div class="hero-banner">
        <ProjectMotif
          :motif="project.theme.motif"
          :accent="project.theme.accent"
          class="hero-motif"
        />
        <div class="hero-text">
          <p class="theme-subtitle">{{ project.theme.subtitle }}</p>
          <div class="title-row">
            <span class="tag theme-tag">{{ project.tag }}</span>
            <span v-if="project.language" class="language">{{ project.language }}</span>
          </div>
          <h1 class="page-title">{{ project.title }}</h1>
        </div>
      </div>

      <div v-if="project.theme.stack" class="stack-row">
        <span v-for="tech in project.theme.stack" :key="tech" class="stack-pill">{{ tech }}</span>
      </div>

      <div v-if="project.theme.stages" class="stages-row">
        <div v-for="stage in project.theme.stages" :key="stage.label" class="stage-card">
          <span class="stage-num">{{ stage.label }}</span>
          <span class="stage-desc">{{ stage.description }}</span>
        </div>
      </div>

      <div v-if="project.github || project.liveUrl" class="page-links">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener"
          class="btn btn-themed"
        >Live site</a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener"
          class="btn"
        >GitHub</a>
      </div>
    </header>

    <div class="content">
      <section class="detail-section">
        <h2 class="section-heading">Statement of Purpose</h2>
        <p class="section-body">{{ project.statementOfPurpose }}</p>
      </section>

      <section class="detail-section">
        <h2 class="section-heading">Objective</h2>
        <p class="section-body">{{ project.objective }}</p>
      </section>

      <section class="detail-section">
        <h2 class="section-heading">Overview of Work Done</h2>
        <ul class="overview-list">
          <li v-for="(item, i) in project.overview" :key="i">{{ item }}</li>
        </ul>
      </section>

      <section v-if="project.demo" class="detail-section">
        <h2 class="section-heading">Demo</h2>
        <div class="video-container">
          <iframe
            :src="project.demo.src"
            :title="project.demo.title"
            class="video-iframe"
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <router-link to="/#projects" class="back-link">← Back to projects</router-link>
    <h1>Project not found</h1>
  </div>
</template>

<style scoped>
.project-page {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--nav-height) + 2rem) 1.25rem 4rem;
  max-width: 720px;
  margin: 0 auto;
}

.theme-glow {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(800px, 100vw);
  height: 320px;
  background: radial-gradient(ellipse at 50% 0%, var(--project-accent-glow) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.page-header,
.content {
  position: relative;
  z-index: 1;
}

.not-found {
  min-height: 100vh;
  padding: calc(var(--nav-height) + 2rem) 1.25rem 4rem;
  max-width: 720px;
  margin: 0 auto;
}

.back-link {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.back-link:hover {
  color: var(--project-accent, var(--accent));
}

.hero-banner {
  margin-bottom: 1.5rem;
}

.hero-motif {
  margin-bottom: 1.25rem;
  opacity: 0.85;
}

.theme-subtitle {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--project-accent);
  margin-bottom: 0.625rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.theme-tag {
  background: var(--project-accent-dim);
  color: var(--project-accent);
  border-color: color-mix(in srgb, var(--project-accent) 30%, transparent);
}

.language {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 1.5rem;
}

.stack-pill {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: var(--project-accent-dim);
  color: var(--project-accent);
  border: 1px solid color-mix(in srgb, var(--project-accent) 20%, transparent);
}

.stages-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 480px) {
  .stages-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stage-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 2px solid var(--project-accent);
  border-radius: var(--radius);
}

.stage-num {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--project-accent);
}

.stage-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.page-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.btn-themed {
  background: var(--project-accent-dim);
  border-color: color-mix(in srgb, var(--project-accent) 35%, transparent);
  color: var(--project-accent);
}

.btn-themed:hover {
  background: color-mix(in srgb, var(--project-accent) 20%, transparent);
  border-color: var(--project-accent);
  color: var(--project-accent);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.detail-section {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  padding-left: 0.75rem;
  border-left: 2px solid transparent;
  transition: border-color 0.2s;
}

.detail-section:hover {
  border-left-color: var(--project-accent);
}

.section-heading {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--project-accent);
  margin-bottom: 0.875rem;
}

.section-body {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.75;
}

.overview-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.overview-list li {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.7;
  padding-left: 1.25rem;
  position: relative;
}

.overview-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--project-accent);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.video-container {
  border: 1px solid color-mix(in srgb, var(--project-accent) 25%, var(--border));
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 0 40px var(--project-accent-glow);
}

.video-iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
}

.not-found h1 {
  font-size: 1.5rem;
  color: var(--text);
  margin-top: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .detail-section {
    transition: none;
  }
}
</style>
