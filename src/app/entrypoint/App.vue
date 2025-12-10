<script setup lang="ts">
import { onMounted } from 'vue'

import { useUserStore } from '@/entities/user'
import { MainHeader } from '@/widgets/header'

const { loadUser } = useUserStore()

onMounted(() => {
  loadUser()
})
</script>

<template>
  <MainHeader />
  <RouterView />
</template>
