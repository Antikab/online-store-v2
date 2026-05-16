<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { MainFooter } from '@/widgets/footer'
import { MainHeader } from '@/widgets/header'

const route = useRoute()

const hasFooter = computed(() => route.meta.footer !== false)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-gray">
    <MainHeader />

    <main class="flex-1">
      <RouterView />
    </main>

    <MainFooter v-if="hasFooter" />
  </div>
</template>
