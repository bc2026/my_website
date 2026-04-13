<template>
  <main class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Project Video</h1>
        <p class="mt-2 text-muted-foreground">
          Watch the embedded video presentation below.
        </p>
      </header>

      <div class="rounded-lg border bg-card shadow-sm overflow-hidden">
        <div class="aspect-video w-full">
          <iframe
            src="https://video.oakstone.dev.ebix.com/embed/1be68b3f-3772-4375-ab23-08e44cf896d1?panels=*&from=portal"
            title="Embedded video"
            class="h-full w-full border-0"
            allow="fullscreen"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <footer class="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {{ year }} Project Site. All rights reserved.</p>
      </footer>
    </div>
  </main>
</template>

<script setup>
const year = new Date().getFullYear()
</script>