<script setup lang="ts">
import { SignOutButton } from '@/features/auth'
import { routesName } from '@/shared/config'
import { Breadcrumbs, type BreadcrumbItem } from '@/shared/ui'

const breadcrumbs = [
  { label: 'Home', to: { name: routesName.home } },
  { label: 'My Account' },
  { label: 'My Orders' },
] as const satisfies readonly BreadcrumbItem[]
</script>

<template>
  <section class="mx-auto min-h-[60vh] w-full max-w-[1240px] px-4 py-8 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <h1 class="mt-12 text-3xl font-semibold text-gray">My Orders</h1>
    <p class="mt-3 text-gray/70">Orders page placeholder</p>
    <SignOutButton class="mt-6" />
  </section>
</template>
