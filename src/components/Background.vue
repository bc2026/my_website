<template>
  <div class="background-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <!-- Multiple blur layers for enhanced fuzziness -->
    <div class="base-blur-layer"></div>
    <div class="secondary-blur-layer"></div>
    
    <!-- Glass layer between background and noise -->
    <div class="glass-layer" :style="glassStyle"></div>
    
    <!-- Perlin Noise Background Canvas -->
    <canvas ref="canvasRef" class="noise-canvas"></canvas>
    
    <!-- Additional blur overlays for enhanced fuzzy effect -->
    <div class="blur-overlay" :style="blurStyle"></div>
    <div class="soft-blur-overlay"></div>
    
    <!-- Interactive cursor ripple -->
    <div class="cursor-ripple" :style="rippleStyle"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { createNoise2D } from 'simplex-noise';

const canvasRef = ref(null);
const noise2D = createNoise2D();
const animationFrameId = ref(null);
const animationTime = ref(0);

// Mouse tracking
const mouseX = ref(0);
const mouseY = ref(0);
const mouseActive = ref(false);

// Pre-calculate pixel data array for better performance
let imageData = null;
let data = null;
let width = 0;
let height = 0;

// Reactive styles based on mouse position
const glassStyle = computed(() => ({
  background: `
    linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.1) 100%),
    radial-gradient(ellipse at ${mouseX.value}px ${mouseY.value}px, rgba(255,255,255,0.25) 0%, transparent 200px),
    radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)
  `,
  transform: mouseActive.value ? `translate(${(mouseX.value - window.innerWidth/2) * 0.02}px, ${(mouseY.value - window.innerHeight/2) * 0.02}px)` : 'none',
  transition: mouseActive.value ? 'none' : 'transform 0.3s ease-out'
}));

const blurStyle = computed(() => ({
  background: `radial-gradient(ellipse at ${mouseX.value}px ${mouseY.value}px, rgba(200,200,200,0.2) 0%, rgba(200,200,200,0.1) 50%, transparent 70%)`,
}));

const rippleStyle = computed(() => ({
  left: `${mouseX.value - 100}px`,
  top: `${mouseY.value - 100}px`,
  opacity: mouseActive.value ? 0.6 : 0,
  transform: mouseActive.value ? 'scale(1)' : 'scale(0.5)',
}));

// Mouse event handlers
const handleMouseMove = (e) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  mouseActive.value = true;
};

const handleMouseLeave = () => {
  mouseActive.value = false;
};

const drawNoise = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Only recreate imageData if canvas size changed
  if (!imageData || canvas.width !== width || canvas.height !== height) {
    width = canvas.width;
    height = canvas.height;
    imageData = ctx.createImageData(width, height);
    data = imageData.data;
  }

  // Animated parameters for dynamic movement
  animationTime.value += 0.008;
  
  // Multiple animation speeds and directions - all reduced
  const time = animationTime.value;
  const primarySpeed = 0.0005;
  const secondarySpeed = 0.0003;
  
  // Mouse influence on noise
  const mouseInfluence = mouseActive.value ? 0.0001 : 0;
  const mouseOffsetX = mouseActive.value ? (mouseX.value - width/2) * mouseInfluence : 0;
  const mouseOffsetY = mouseActive.value ? (mouseY.value - height/2) * mouseInfluence : 0;
  
  // Oscillating offsets for more organic movement - slower oscillations
  const offsetX1 = Math.sin(time * 0.1) * 50 + time * primarySpeed + mouseOffsetX;
  const offsetY1 = Math.cos(time * 0.12) * 30 + time * primarySpeed * 0.7 + mouseOffsetY;
  const offsetX2 = Math.cos(time * 0.15) * 40 + time * secondarySpeed + mouseOffsetX * 0.5;
  const offsetY2 = Math.sin(time * 0.18) * 25 + time * secondarySpeed * 0.8 + mouseOffsetY * 0.5;

  // Use medium pixel blocks for visible but smooth patterns
  const blockSize = 3;
  
  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      // Calculate distance from mouse for interactive effects
      const distanceFromMouse = mouseActive.value ? 
        Math.sqrt((x - mouseX.value) ** 2 + (y - mouseY.value) ** 2) : 1000;
      const mouseEffect = Math.max(0, 1 - distanceFromMouse / 400); // Larger effect radius for fuzziness
      
      // Layer 1: Large scale base patterns - more visible
      const scale1 = 0.008 + mouseEffect * 0.002; // More detailed base patterns
      const noise1 = noise2D(
        x * scale1 + offsetX1,
        y * scale1 + offsetY1
      );
      
      // Layer 2: Medium detail patterns
      const scale2 = 0.018 + mouseEffect * 0.005; // Increased for more visible detail
      const noise2 = noise2D(
        x * scale2 + offsetX2,
        y * scale2 + offsetY2
      );
      
      // Layer 3: Fine detail layer - more prominent
      const scale3 = 0.035 + mouseEffect * 0.008; // Higher detail for obvious patterns
      const noise3 = noise2D(
        x * scale3 + time * 0.0008,
        y * scale3 + time * 0.001
      );
      
      // Combine multiple noise layers for more obvious animation
      const combinedNoise = (
        noise1 * 0.5 +      // Primary layer - reduced weight
        noise2 * 0.35 +     // Detail layer - increased weight
        noise3 * 0.15       // Fine detail layer - increased weight
      );
      
      // Normalize and enhance the combined value
      const value = Math.max(0, Math.min(1, (combinedNoise + 1) * 0.5));
      
      // Create more obvious, contrasted noise patterns
      const baseIntensity = value * value * 160 + 20; // Higher contrast with squaring
      const intensity = Math.floor(baseIntensity + mouseEffect * 40); // More dramatic brightening near mouse
      const alpha = Math.floor(value * 140 + 80 + mouseEffect * 50); // Higher opacity for more visible patterns

      // Fill block for better performance
      for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
        for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
          const pixelIndex = ((y + dy) * width + (x + dx)) * 4;
          data[pixelIndex + 0] = intensity; // Red
          data[pixelIndex + 1] = intensity; // Green  
          data[pixelIndex + 2] = intensity - 20; // Blue (warmer tone)
          data[pixelIndex + 3] = alpha; // Alpha
        }
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  animationFrameId.value = requestAnimationFrame(drawNoise);
};

const setCanvasDimensions = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  
  // Reset cached data when resizing
  imageData = null;
  data = null;
  
  drawNoise();
};

onMounted(() => {
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
});

onUnmounted(() => {
  window.removeEventListener('resize', setCanvasDimensions);
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  background: #ffffff;
  /* Remove default cursor highlighting */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.base-blur-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: 
    radial-gradient(ellipse at 25% 25%, rgba(240,240,240,0.8) 0%, transparent 60%),
    radial-gradient(ellipse at 75% 75%, rgba(245,245,245,0.6) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(250,250,250,0.4) 0%, transparent 70%);
  backdrop-filter: blur(12px);
  filter: blur(8px);
}

.secondary-blur-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0.5;
  background: 
    radial-gradient(circle at 20% 60%, rgba(248,248,248,0.5) 0%, transparent 40%),
    radial-gradient(circle at 80% 40%, rgba(252,252,252,0.3) 0%, transparent 50%);
  backdrop-filter: blur(10px);
  filter: blur(6px);
}

.glass-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: 
    linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%, rgba(255,255,255,0.12) 100%),
    radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.12) 0%, transparent 50%);
  backdrop-filter: blur(8px);
  filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.3);
}

.noise-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.25;
  filter: blur(6px);
  mix-blend-mode: soft-light;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  backdrop-filter: blur(8px);
}

.soft-blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3.5;
  background: 
    radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 80%),
    linear-gradient(45deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(8px);
  filter: blur(5px);
}

.cursor-ripple {
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 4;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  mix-blend-mode: overlay;
  filter: blur(3px);
}
</style>
