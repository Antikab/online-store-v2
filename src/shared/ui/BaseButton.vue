<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <button
    :disabled="props.disabled"
    class="select-none disabled:opacity-50 disabled:pointer-events-none"
  >
    <slot />
  </button>
</template>
