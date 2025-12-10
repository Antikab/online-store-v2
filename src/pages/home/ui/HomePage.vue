<!-- src/pages/home/ui/HomePage.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'

import { clearAuthHash } from '@/shared/lib'

onMounted(() => {
  clearAuthHash()
})
</script>

<template>
  <div>стартовая страница</div>
</template>
