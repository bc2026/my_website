<script setup>
defineProps({
  motif: { type: String, required: true },
  accent: { type: String, required: true },
})
</script>

<template>
  <!-- Video: waveform + playhead timeline -->
  <svg
    v-if="motif === 'video'"
    class="motif-svg"
    viewBox="0 0 400 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="0" y="36" width="400" height="1" :stroke="accent" stroke-opacity="0.3" />
    <path
      d="M0 40 Q20 20 40 40 T80 40 T120 25 T160 40 T200 55 T240 40 T280 30 T320 40 T360 50 T400 40"
      :stroke="accent"
      stroke-width="1.5"
      stroke-opacity="0.6"
      fill="none"
    />
    <rect x="120" y="12" width="160" height="56" rx="4" :stroke="accent" stroke-opacity="0.2" fill="none" />
    <polygon points="188,32 188,52 206,42" :fill="accent" fill-opacity="0.5" />
    <line x1="200" y1="12" x2="200" y2="68" :stroke="accent" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="3 3" />
  </svg>

  <!-- Civic: ballot card + check -->
  <svg
    v-else-if="motif === 'civic'"
    class="motif-svg"
    viewBox="0 0 400 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="60" y="10" width="120" height="60" rx="6" :stroke="accent" stroke-opacity="0.35" fill="none" />
    <line x1="80" y1="28" x2="160" y2="28" :stroke="accent" stroke-opacity="0.25" stroke-width="1" />
    <line x1="80" y1="40" x2="140" y2="40" :stroke="accent" stroke-opacity="0.2" stroke-width="1" />
    <line x1="80" y1="52" x2="150" y2="52" :stroke="accent" stroke-opacity="0.2" stroke-width="1" />
    <circle cx="76" cy="40" r="8" :stroke="accent" stroke-opacity="0.5" fill="none" />
    <polyline points="72,40 75,43 81,37" :stroke="accent" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <rect x="220" y="20" width="120" height="40" rx="4" :stroke="accent" stroke-opacity="0.3" fill="none" />
    <text x="240" y="46" :fill="accent" fill-opacity="0.5" font-family="monospace" font-size="11">NJ · 2026</text>
  </svg>

  <!-- Research: oscilloscope-style voltage trace -->
  <svg
    v-else-if="motif === 'research'"
    class="motif-svg"
    viewBox="0 0 400 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="0" y="0" width="400" height="80" :stroke="accent" stroke-opacity="0.1" fill="none" />
    <line x1="0" y1="20" x2="400" y2="20" :stroke="accent" stroke-opacity="0.1" />
    <line x1="0" y1="40" x2="400" y2="40" :stroke="accent" stroke-opacity="0.15" />
    <line x1="0" y1="60" x2="400" y2="60" :stroke="accent" stroke-opacity="0.1" />
    <path
      d="M0 55 L40 55 L40 25 L80 25 L80 55 L120 55 L120 30 L160 30 L160 55 L200 55 L200 20 L240 20 L240 55 L280 55 L280 35 L320 35 L320 55 L360 55 L360 28 L400 28"
      :stroke="accent"
      stroke-width="1.5"
      stroke-opacity="0.7"
      fill="none"
    />
    <circle cx="40" cy="25" r="3" :fill="accent" fill-opacity="0.6" />
    <circle cx="200" cy="20" r="3" :fill="accent" fill-opacity="0.6" />
    <circle cx="360" cy="28" r="3" :fill="accent" fill-opacity="0.6" />
  </svg>
</template>

<style scoped>
.motif-svg {
  width: 100%;
  max-width: 400px;
  height: auto;
  opacity: 0.9;
}
</style>
