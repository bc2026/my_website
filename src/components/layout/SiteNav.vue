<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '#projects', label: 'Projects' },
]

const socials = [
  { href: 'https://github.com/bc2026', label: 'GitHub' },
  { href: 'https://linkedin.com/in/bc2026', label: 'LinkedIn' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="nav-inner section-container">
      <a href="#" class="logo" @click="closeMenu">
        <span class="logo-prompt">~/</span>bc
      </a>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <template v-for="link in links" :key="link.href || link.to">
          <RouterLink
            v-if="link.to"
            :to="link.to"
            class="nav-link"
            @click="closeMenu"
          >{{ link.label }}</RouterLink>
          <a
            v-else
            :href="link.href"
            class="nav-link"
            @click="closeMenu"
          >{{ link.label }}</a>
        </template>
        <a
          v-for="s in socials"
          :key="s.href"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="nav-link nav-social"
          @click="closeMenu"
        >{{ s.label }}</a>
      </nav>

      <button
        class="menu-btn"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="menu-bar" />
        <span class="menu-bar" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  transition: background 0.2s, border-color 0.2s;
}

.nav.scrolled {
  background: rgba(10, 14, 20, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
}

.logo-prompt {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.nav-link:hover {
  color: var(--text);
}

.nav-social {
  color: var(--accent);
}

.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
}

@media (max-width: 640px) {
  .menu-btn {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: rgba(10, 14, 20, 0.97);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 1.25rem 1rem;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link {
    padding: 0.625rem 0;
    border-bottom: 1px solid var(--border);
  }

  .nav-link:last-child {
    border-bottom: none;
  }
}
</style>
