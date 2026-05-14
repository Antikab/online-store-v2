<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="min-h-[60vh] px-8 py-10">
    <h1 class="text-3xl font-semibold text-gray">Product Detail</h1>
    <p class="mt-3 text-gray/70">Product slug: {{ route.params.slug }}</p>
  </main>
</template>
