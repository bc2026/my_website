<script setup>
import { projects } from '@/data/projects'
import { getProjectTheme } from '@/data/projectDetails'

function cardStyle(slug) {
  const theme = slug ? getProjectTheme(slug) : null
  if (!theme) return {}
  return {
    '--card-accent': theme.accent,
    '--card-accent-dim': theme.accentDim,
  }
}
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="section-container">
      <p class="section-label">Projects</p>
      <h2 class="section-title">Work</h2>

      <div class="project-grid">
        <article
          v-for="project in projects"
          :key="project.title"
          class="project-card"
          :class="{ themed: project.slug }"
          :style="cardStyle(project.slug)"
        >
          <div class="card-top">
            <span class="tag" :class="{ 'theme-tag': project.slug }">{{ project.tag }}</span>
            <span v-if="project.language" class="language">{{ project.language }}</span>
          </div>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <component
            :is="project.external ? 'a' : 'router-link'"
            :href="project.external ? project.href : undefined"
            :to="project.external ? undefined : project.href"
            :target="project.external ? '_blank' : undefined"
            :rel="project.external ? 'noopener' : undefined"
            class="project-link"
          >
            {{ project.external
              ? (project.href.includes('github.com') ? 'View on GitHub →' : 'View project →')
              : 'View project →' }}
          </component>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 3rem 0 var(--section-gap);
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card.themed {
  border-top: 2px solid var(--card-accent);
}

.project-card.themed:hover {
  border-color: var(--card-accent);
  border-top-color: var(--card-accent);
  box-shadow: 0 4px 24px color-mix(in srgb, var(--card-accent) 12%, transparent);
}

.theme-tag {
  background: var(--card-accent-dim);
  color: var(--card-accent);
  border-color: color-mix(in srgb, var(--card-accent) 25%, transparent);
}

.project-card.themed .project-link {
  color: var(--card-accent);
}

.project-card.themed .project-link:hover {
  color: color-mix(in srgb, var(--card-accent) 80%, white);
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: border-color 0.15s, background 0.15s;
}

.project-card:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.language {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.project-title {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: var(--text);
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
}

.project-link {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--accent);
  text-decoration: none;
  margin-top: auto;
}

.project-link:hover {
  color: #5eeaa6;
}
</style>
