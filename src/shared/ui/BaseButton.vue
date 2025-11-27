<script setup lang="ts">
interface Props {
  textButton?: string
}
defineProps<Props>()
</script>

<template>
  <button class="select-none">
    {{ textButton }}
  </button>
</template>
