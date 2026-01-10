<script setup lang="ts">
interface Props {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
})
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="select-none disabled:opacity-50 disabled:pointer-events-none"
  >
    <slot />
  </button>
</template>
