<script setup lang="ts">
defineProps<{
  gender?: 'men' | 'women'
}>()
</script>

<template>
  <section class="min-h-[60vh] px-8 py-10">
    <h1 class="text-3xl font-semibold text-gray">
      {{ gender === 'men' ? 'Men Catalog' : gender === 'women' ? 'Women Catalog' : 'Catalog' }}
    </h1>
    <p class="mt-3 text-gray/70">Catalog page placeholder</p>
  </section>
</template>
