<script setup>
const socials = [
  { label: 'GitHub', href: 'https://github.com/bc2026' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/bc2026' },
  {
    label: 'Resume',
    href: '/resume.pdf',
  },
]
</script>

<template>
  <section class="hero">
    <div class="section-container hero-inner">
      <p class="hero-eyebrow">Software Engineer</p>
      <h1 class="hero-title">Bhagawat Chapagain</h1>

      <div class="hero-links">
        <a
          v-for="link in socials"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="btn btn-primary"
        >{{ link.label }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: calc(var(--nav-height) + 4rem);
  padding-bottom: 2rem;
}

.hero-inner {
  max-width: 720px;
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.hero-title {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--text);
  margin-bottom: 2rem;
}

.hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
