<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="section-container footer-inner">
      <p class="footer-copy">
        <span class="mono">© {{ year }}</span> Bhagawat Chapagain
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  margin-top: var(--section-gap);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.footer-copy {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.mono {
  font-family: var(--font-mono);
}
</style>
