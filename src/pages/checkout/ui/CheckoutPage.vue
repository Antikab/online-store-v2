<script setup lang="ts">
import { routesName } from '@/shared/config'
import { Breadcrumbs } from '@/shared/ui'

const breadcrumbs = [
  { label: 'Home', to: { name: routesName.home } },
  { label: 'Cart', to: { name: routesName.cart } },
  { label: 'Checkout' },
]
</script>

<template>
  <section class="mx-auto min-h-[60vh] w-full max-w-[1240px] px-4 py-8 sm:px-6">
    <Breadcrumbs :items="breadcrumbs" />
    <h1 class="mt-12 text-3xl font-semibold text-gray">Checkout</h1>
    <p class="mt-3 text-gray/70">Checkout page placeholder</p>
  </section>
</template>
