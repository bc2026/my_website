<template>
  <div class="relative w-full h-screen overflow-hidden bg-gray-900 font-inter">
    <!-- Perlin Noise Background Component -->
    <canvas ref="canvasRef" class="absolute inset-0 z-0"></canvas>

    <!-- Content over the background -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
      <h1 class="text-5xl md:text-7xl font-bold mb-4 text-center text-shadow-lg animate-fade-in">
        Animated Perlin Noise Background (Vue.js)
      </h1>
      <p class="text-lg md:text-xl text-center max-w-2xl animate-fade-in delay-200">
        A dynamic and mesmerizing background generated using the Perlin noise algorithm in Vue.js.
        Watch the subtle, evolving patterns!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Perlin Noise Algorithm Implementation
// This class generates 2D Perlin noise.
class PerlinNoise {
  constructor() {
    // Permutation table - a shuffled array used for hashing
    this.p = new Array(512);
    // Gradients for 2D noise
    this.grad2 = [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [1, 0], [0, -1], [-1, 0]];
    this.initPermutations();
  }

  // Initializes the permutation table
  initPermutations() {
    const p = new Array(256);
    for (let i = 0; i < 256; i++) {
      p[i] = i;
    }

    // Shuffle the array (Fisher-Yates shuffle)
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }

    // Duplicate the array to avoid modulo operations in the noise function
    for (let i = 0; i < 256; i++) {
      this.p[i] = this.p[i + 256] = p[i];
    }
  }

  // Linear interpolation function
  lerp(a, b, t) {
    return a + t * (b - a);
  }

  // Fade function (6t^5 - 15t^4 + 10t^3) - smoother interpolation
  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  // Dot product of gradient and distance vectors
  dot2(grad, x, y) {
    return grad[0] * x + grad[1] * y;
  }

  // Main Perlin noise function for 2D
  noise(x, y) {
    // Find unit square cell coordinates
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;

    // Relative coordinates of the point within the cell
    x -= Math.floor(x);
    y -= Math.floor(y);

    // Fade curves for x and y
    let u = this.fade(x);
    let v = this.fade(y);

    // Hash coordinates of the 4 corners
    let A = this.p[X] + Y;
    let AA = this.p[A];
    let AB = this.p[A + 1];
    let B = this.p[X + 1] + Y;
    let BA = this.p[B];
    let BB = this.p[B + 1];

    // Calculate dot products for the 4 corners and interpolate
    // This is where the magic happens:
    // - Dot product of gradient vector (from `grad2` array based on hash)
    //   and distance vector (from corner to the point `(x, y)`)
    // - Interpolation first horizontally, then vertically.
    return this.lerp(
      this.lerp(
        this.dot2(this.grad2[AA & 7], x, y),
        this.dot2(this.grad2[BA & 7], x - 1, y),
        u
      ),
      this.lerp(
        this.dot2(this.grad2[AB & 7], x, y - 1),
        this.dot2(this.grad2[BB & 7], x - 1, y - 1),
        u
      ),
      v
    );
  }
}

// Vue refs for DOM element and reactive state
const canvasRef = ref(null);
const perlin = ref(null); // Reactive reference to PerlinNoise instance
const animationFrameId = ref(null); // Reactive reference for animation frame ID
const animationOffset = ref(0); // Reactive reference for animation offset

// Function to draw the noise onto the canvas
const drawNoise = () => {
  const canvas = canvasRef.value;
  if (!canvas || !perlin.value) return; // Use .value to access the ref's content

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  // Adjust scale for desired noise granularity
  const scale = 0.05; // Smaller scale = smoother, larger scale = more detail
  const offsetSpeed = 0.0005; // How fast the noise moves
  animationOffset.value += offsetSpeed; // Increment the offset

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Get noise value, normalize from -1 to 1 to 0 to 1
      // Add the animation offset to the X coordinate for movement
      const value = (perlin.value.noise(x * scale + animationOffset.value, y * scale) + 1) / 2;

      // Map noise value to color
      let r = 0;
      let g = 0;
      let b = 0;

      // Blue/Purple gradient
      r = Math.floor(value * 50);
      g = Math.floor(value * 100);
      b = Math.floor(value * 200 + 50);

      data[(y * width + x) * 4 + 0] = r;     // Red
      data[(y * width + x) * 4 + 1] = g;     // Green
      data[(y * width + x) * 4 + 2] = b;     // Blue
      data[(y * width + x) * 4 + 3] = 255;   // Alpha
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Request the next animation frame
  animationFrameId.value = requestAnimationFrame(drawNoise);
};

// Function to set canvas dimensions and restart animation
const setCanvasDimensions = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Stop current animation loop before redrawing dimensions and restarting
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  animationOffset.value = 0; // Reset offset on resize for consistent start
  drawNoise(); // Start animation loop after resize
};

// Lifecycle hook: Component mounted
onMounted(() => {
  perlin.value = new PerlinNoise(); // Initialize PerlinNoise instance once
  setCanvasDimensions(); // Initial draw and start animation

  window.addEventListener('resize', setCanvasDimensions);
});

// Lifecycle hook: Component unmounted
onUnmounted(() => {
  window.removeEventListener('resize', setCanvasDimensions);
  // Cancel any pending animation frame when the component unmounts
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<style scoped>
/* Scoped styles for the Vue component */
.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Tailwind-like animation for content */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in.delay-200 {
  animation-delay: 0.2s;
}

.text-shadow-lg {
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}
</style>
