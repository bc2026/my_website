<template>
  <a :href="link" target="_blank" rel="noopener noreferrer">
    <figure
      ref="figureRef"
      class="tilted-card-figure"
      :style="{ height: containerHeight, width: containerWidth }"
      @mousemove="handleMouse"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="tilted-card-mobile-alert">
        Hover effect best on desktop!
      </div>

      <div class="tilted-card-inner" :style="innerDivStyle">
        <div class="tilted-card-img-container" :style="{ height: containerHeight, width: containerWidth }">
          <slot></slot> <!-- SVG icon will be passed here -->
        </div>
      </div>

      <figcaption v-if="showTooltip" class="tilted-card-caption" :style="captionStyle">
        {{ captionText }}
      </figcaption>
    </figure>
  </a>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSpring } from '@vueuse/motion';

// --- Component Properties (Props) ---
// Defines the props this component accepts from its parent.
const props = defineProps({
  link: { type: String, default: '#' },
  captionText: { type: String, default: '' },
  containerHeight: { type: String, default: '250px' },
  containerWidth: { type: String, default: '250px' },
  scaleOnHover: { type: Number, default: 1.1 },
  rotateAmplitude: { type: Number, default: 12 },
  showTooltip: { type: Boolean, default: true },
});

// --- Template Refs ---
const figureRef = ref(null);
const lastY = ref(0);

// --- Spring Animation Configuration ---
const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

// --- Reactive State for Motion Properties ---
// These values are "springs" that will smoothly animate to their target values.
const rotateX = useSpring(0, springValues);
const rotateY = useSpring(0, springValues);
const scale = useSpring(1, springValues);
const opacity = useSpring(0);
const rotateFigcaption = useSpring(0, {
  stiffness: 350,
  damping: 30,
  mass: 1,
});
const tooltipX = ref(0);
const tooltipY = ref(0);

// --- Event Handlers ---
function handleMouse(e) {
  if (!figureRef.value) return;

  const rect = figureRef.value.getBoundingClientRect();
  const offsetX = e.clientX - rect.left - rect.width / 2;
  const offsetY = e.clientY - rect.top - rect.height / 2;

  const rotationX = (offsetY / (rect.height / 2)) * -props.rotateAmplitude;
  const rotationY = (offsetX / (rect.width / 2)) * props.rotateAmplitude;

  // Set spring target values, the animation will happen automatically
  rotateX.value = rotationX;
  rotateY.value = rotationY;

  tooltipX.value = e.clientX - rect.left;
  tooltipY.value = e.clientY - rect.top;

  const velocityY = offsetY - lastY.value;
  rotateFigcaption.value = -velocityY * 0.6;
  lastY.value = offsetY;
}

function handleMouseEnter() {
  scale.value = props.scaleOnHover;
  opacity.value = 1;
}

function handleMouseLeave() {
  opacity.value = 0;
  scale.value = 1;
  rotateX.value = 0;
  rotateY.value = 0;
  rotateFigcaption.value = 0;
}

// --- Computed Styles ---
// These computed properties generate style objects for the template.
// They are reactive and will update automatically when the spring values change.
const innerDivStyle = computed(() => ({
  transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale(${scale.value})`,
  willChange: 'transform',
}));

const captionStyle = computed(() => ({
  opacity: opacity.value,
  transform: `translate(${tooltipX.value}px, ${tooltipY.value}px) rotate(${rotateFigcaption.value}deg)`,
}));
</script>

<style scoped>
/* Styles are "scoped" to this component, so they won't leak out. */
.tilted-card-figure {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  cursor: pointer;
}

.tilted-card-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: #1f2937;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tilted-card-inner:hover {
  box-shadow: 0 10px 50px -5px rgba(79, 70, 229, 0.5), 0 0px 30px -10px rgba(0,0,0,0.5);
}

.tilted-card-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tilted-card-caption {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem 1rem;
  background-color: rgba(17, 24, 39, 0.8);
  color: white;
  border-radius: 9999px;
  pointer-events: none;
  white-space: nowrap;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
  will-change: transform, opacity;
}

.tilted-card-mobile-alert {
  display: none;
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
  z-index: 20;
}

@media (hover: none) {
  .tilted-card-mobile-alert {
    display: block;
  }
}
</style>
