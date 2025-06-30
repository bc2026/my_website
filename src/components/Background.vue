<template>
  <div class="background-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <!-- Simplified blur layers for better performance -->
    <div class="base-blur-layer"></div>
    <div class="glass-layer" :style="glassStyle"></div>
    
    <!-- Perlin Noise Background Canvas -->
    <canvas ref="canvasRef" class="noise-canvas"></canvas>
    
    <!-- Simplified overlay -->
    <div class="blur-overlay" :style="blurStyle"></div>
    
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

// Mouse tracking with throttling
const mouseX = ref(0);
const mouseY = ref(0);
const mouseActive = ref(false);
let lastMouseUpdate = 0;
const mouseThrottle = 16; // ~60fps limit for mouse updates

// Performance optimization flags
const isLowPowerMode = ref(false);
const frameSkipCounter = ref(0);

// Performance monitoring
const performanceMonitor = ref({
  enabled: true,
  frameCount: 0,
  lastTime: 0,
  avgFrameTime: 16.67, // Target 60fps
  samples: [],
  maxSamples: 60
});

// Pre-calculate pixel data array for better performance
let imageData = null;
let data = null;
let width = 0;
let height = 0;

// Detect if user is on a mobile device or low-power device
const detectLowPowerMode = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  return isMobile || isLowEnd;
};

// Reactive styles based on mouse position (simplified)
const glassStyle = computed(() => {
  if (isLowPowerMode.value) {
    return {
      background: 'rgba(255,255,255,0.1)',
      transform: 'none'
    };
  }
  
  return {
    background: `
      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%),
      radial-gradient(ellipse at ${mouseX.value}px ${mouseY.value}px, rgba(255,255,255,0.15) 0%, transparent 200px)
    `,
    transform: mouseActive.value ? `translate(${(mouseX.value - window.innerWidth/2) * 0.01}px, ${(mouseY.value - window.innerHeight/2) * 0.01}px)` : 'none',
    transition: mouseActive.value ? 'none' : 'transform 0.3s ease-out'
  };
});

const blurStyle = computed(() => {
  if (isLowPowerMode.value) return { background: 'transparent' };
  
  return {
    background: `radial-gradient(ellipse at ${mouseX.value}px ${mouseY.value}px, rgba(200,200,200,0.1) 0%, transparent 300px)`,
  };
});

const rippleStyle = computed(() => ({
  left: `${mouseX.value - 100}px`,
  top: `${mouseY.value - 100}px`,
  opacity: mouseActive.value ? (isLowPowerMode.value ? 0.3 : 0.6) : 0,
  transform: mouseActive.value ? 'scale(1)' : 'scale(0.5)',
}));

// Throttled mouse event handlers
const handleMouseMove = (e) => {
  const now = Date.now();
  if (now - lastMouseUpdate < mouseThrottle) return;
  
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  mouseActive.value = true;
  lastMouseUpdate = now;
};

const handleMouseLeave = () => {
  mouseActive.value = false;
};

const drawNoise = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  // Performance monitoring
  const now = performance.now();
  if (performanceMonitor.value.lastTime > 0) {
    const frameTime = now - performanceMonitor.value.lastTime;
    performanceMonitor.value.samples.push(frameTime);
    
    if (performanceMonitor.value.samples.length > performanceMonitor.value.maxSamples) {
      performanceMonitor.value.samples.shift();
    }
    
    // Check average performance every 60 frames
    if (performanceMonitor.value.samples.length === performanceMonitor.value.maxSamples) {
      const avgFrameTime = performanceMonitor.value.samples.reduce((a, b) => a + b) / performanceMonitor.value.maxSamples;
      
      // If average frame time > 25ms (less than 40fps), enable low power mode
      if (avgFrameTime > 25 && !isLowPowerMode.value) {
        console.log('Performance detected: Enabling low-power mode');
        isLowPowerMode.value = true;
      }
    }
  }
  performanceMonitor.value.lastTime = now;

  // Skip frames on low-power devices for better performance
  if (isLowPowerMode.value) {
    frameSkipCounter.value++;
    if (frameSkipCounter.value % 3 !== 0) {
      animationFrameId.value = requestAnimationFrame(drawNoise);
      return;
    }
  }

  const ctx = canvas.getContext('2d');
  
  // Only recreate imageData if canvas size changed
  if (!imageData || canvas.width !== width || canvas.height !== height) {
    width = canvas.width;
    height = canvas.height;
    imageData = ctx.createImageData(width, height);
    data = imageData.data;
  }

  // Slower animation for better performance
  animationTime.value += isLowPowerMode.value ? 0.004 : 0.006;
  
  const time = animationTime.value;
  const primarySpeed = 0.0003;
  const secondarySpeed = 0.0002;
  
  // Reduced mouse influence for better performance
  const mouseInfluence = mouseActive.value ? 0.00005 : 0;
  const mouseOffsetX = mouseActive.value ? (mouseX.value - width/2) * mouseInfluence : 0;
  const mouseOffsetY = mouseActive.value ? (mouseY.value - height/2) * mouseInfluence : 0;
  
  // Simplified offsets
  const offsetX1 = Math.sin(time * 0.08) * 30 + time * primarySpeed + mouseOffsetX;
  const offsetY1 = Math.cos(time * 0.1) * 20 + time * primarySpeed * 0.7 + mouseOffsetY;
  const offsetX2 = Math.cos(time * 0.12) * 25 + time * secondarySpeed + mouseOffsetX * 0.5;
  const offsetY2 = Math.sin(time * 0.15) * 15 + time * secondarySpeed * 0.8 + mouseOffsetY * 0.5;

  // Larger block size for better performance
  const blockSize = isLowPowerMode.value ? 6 : 4;
  
  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      // Simplified distance calculation
      const distanceFromMouse = mouseActive.value ? 
        Math.sqrt((x - mouseX.value) ** 2 + (y - mouseY.value) ** 2) : 1000;
      const mouseEffect = Math.max(0, 1 - distanceFromMouse / 300);
      
      // Reduced to 2 noise layers for better performance
      const scale1 = 0.006 + mouseEffect * 0.001;
      const noise1 = noise2D(
        x * scale1 + offsetX1,
        y * scale1 + offsetY1
      );
      
      const scale2 = 0.015 + mouseEffect * 0.003;
      const noise2 = noise2D(
        x * scale2 + offsetX2,
        y * scale2 + offsetY2
      );
      
      // Simplified noise combination
      const combinedNoise = noise1 * 0.6 + noise2 * 0.4;
      const value = Math.max(0, Math.min(1, (combinedNoise + 1) * 0.5));
      
      // Simplified intensity calculation
      const baseIntensity = value * 120 + 40;
      const intensity = Math.floor(baseIntensity + mouseEffect * 30);
      const alpha = Math.floor(value * 100 + 60 + mouseEffect * 40);

      // Fill block
      for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
        for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
          const pixelIndex = ((y + dy) * width + (x + dx)) * 4;
          data[pixelIndex + 0] = intensity;
          data[pixelIndex + 1] = intensity;
          data[pixelIndex + 2] = intensity - 15;
          data[pixelIndex + 3] = alpha;
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

  // Use lower resolution on mobile devices
  const pixelRatio = isLowPowerMode.value ? 1 : (window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * pixelRatio;
  canvas.height = rect.height * pixelRatio;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  
  // Reset cached data when resizing
  imageData = null;
  data = null;
  
  drawNoise();
};

onMounted(() => {
  isLowPowerMode.value = detectLowPowerMode();
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Add visibility change listener to pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
    } else if (!document.hidden) {
      drawNoise();
    }
  });
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

/* Simplified and optimized blur layers */
.base-blur-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: 
    radial-gradient(ellipse at 25% 25%, rgba(240,240,240,0.6) 0%, transparent 60%),
    radial-gradient(ellipse at 75% 75%, rgba(245,245,245,0.4) 0%, transparent 50%);
  backdrop-filter: blur(8px);
  will-change: auto; /* Remove expensive will-change */
}

.glass-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.2);
  will-change: transform; /* Only animate transform */
}

.noise-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.3;
  filter: blur(3px);
  mix-blend-mode: soft-light;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  backdrop-filter: blur(4px);
}

.cursor-ripple {
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 4;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  mix-blend-mode: overlay;
  filter: blur(2px);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .base-blur-layer {
    backdrop-filter: blur(4px);
  }
  
  .glass-layer {
    backdrop-filter: blur(3px);
  }
  
  .blur-overlay {
    backdrop-filter: blur(2px);
  }
  
  .noise-canvas {
    opacity: 0.2;
    filter: blur(2px);
  }
}

/* Reduce effects on low-end devices */
@media (max-width: 480px) {
  .base-blur-layer {
    backdrop-filter: blur(2px);
    background: rgba(240,240,240,0.3);
  }
  
  .glass-layer {
    backdrop-filter: blur(1px);
  }
  
  .blur-overlay {
    backdrop-filter: none;
  }
  
  .cursor-ripple {
    display: none; /* Hide on small screens */
  }
}

/* High refresh rate displays */
@media (min-resolution: 120dpi) {
  .noise-canvas {
    image-rendering: optimizeSpeed;
  }
}
</style>
