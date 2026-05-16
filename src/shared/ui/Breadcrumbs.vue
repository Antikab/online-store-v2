<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router'

type BreadcrumbItem = {
  label: string
  to?: RouteLocationRaw
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav v-if="items.length" class="text-lg font-medium text-[#807d7e]" aria-label="Breadcrumbs">
    <ol class="flex flex-wrap items-center gap-3">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="flex items-center gap-3"
      >
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="transition hover:text-gray"
        >
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          :class="index === items.length - 1 ? 'text-gray' : 'text-[#807d7e]'"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>

        <svg
          v-if="index < items.length - 1"
          class="h-4 w-4 text-[#bebcbd]"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m7.5 4 6 6-6 6"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </li>
    </ol>
  </nav>
</template>
