<script setup lang="ts">
interface Props {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const model = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="model" :type="props.type" :disabled="props.disabled" />
</template>
