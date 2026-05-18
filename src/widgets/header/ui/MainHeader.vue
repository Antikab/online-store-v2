<script setup lang="ts">
import { computed } from 'vue'
import { type RouteLocationRaw, useRoute } from 'vue-router'

import { useUserStore } from '@/entities/user'
import logoEuphoriaUrl from '@/shared/assets/logo-euphoria.svg'
import { routesName } from '@/shared/config'
import type { HeaderActiveIcon } from '@/shared/config/router/routeMeta.types'

const route = useRoute()
const userStore = useUserStore()

type ShopNavLink = {
  label: string
  to: RouteLocationRaw
  activeRouteNames: readonly string[]
  category?: string | null
}

const shopNavLinks = [
  {
    label: 'Shop',
    to: { name: routesName.catalog },
    activeRouteNames: [routesName.home, routesName.catalog],
    category: null,
  },
  {
    label: 'Men',
    to: { name: routesName.catalogMen },
    activeRouteNames: [routesName.catalogMen],
  },
  {
    label: 'Women',
    to: { name: routesName.catalogWomen },
    activeRouteNames: [routesName.catalogWomen],
  },
  {
    label: 'Combos',
    to: { name: routesName.catalog, query: { category: 'combos' } },
    activeRouteNames: [routesName.catalog],
    category: 'combos',
  },
  {
    label: 'Joggers',
    to: { name: routesName.catalog, query: { category: 'joggers' } },
    activeRouteNames: [routesName.catalog],
    category: 'joggers',
  },
] as const satisfies readonly ShopNavLink[]

const isAuthHeader = computed(() => route.meta.headerVariant === 'auth')
const shouldShowShopNav = computed(() => route.meta.headerVariant === 'shop')
const accountRoute = computed(() => ({
  name: userStore.isAuthed ? routesName.accountOrders : routesName.login,
}))

const isRouteActive = (link: ShopNavLink) => {
  const category = route.query.category
  const isCatalogPage = route.name === routesName.catalog

  if (link.category === null) {
    const isHomePage = route.name === routesName.home
    const isCatalogWithoutCategory = isCatalogPage && category == null

    return isHomePage || isCatalogWithoutCategory
  }

  if (link.category) {
    return isCatalogPage && category === link.category
  }

  return link.activeRouteNames.includes(String(route.name))
}

const isIconActive = (icon: HeaderActiveIcon) => route.meta.activeIcon === icon
</script>

<template>
  <header class="border-b border-[#bebcbd]/55 bg-white">
    <div
      class="mx-auto flex min-h-20 w-full max-w-[1240px] items-center gap-5 px-4 py-4 sm:min-h-[108px] sm:px-6 lg:gap-9"
    >
      <RouterLink
        :to="{ name: routesName.home }"
        class="group flex h-[45px] w-[92px] shrink-0 items-center"
        aria-label="Euphoria home"
      >
        <img
          :src="logoEuphoriaUrl"
          alt="Euphoria"
          class="block h-[45px] w-[92px] object-contain"
          width="92"
          height="45"
        />
      </RouterLink>

      <nav
        v-if="shouldShowShopNav"
        class="hidden items-center gap-8 text-sm font-medium text-gray/80 lg:flex"
        aria-label="Main navigation"
      >
        <RouterLink
          v-for="link in shopNavLinks"
          :key="link.label"
          :to="link.to"
          class="transition hover:text-gray"
          :class="{ 'font-semibold text-gray': isRouteActive(link) }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="ml-auto flex items-center gap-3 sm:gap-5">
        <label
          class="relative hidden h-11 w-[220px] items-center sm:flex lg:w-[267px]"
          aria-label="Search"
        >
          <svg
            class="pointer-events-none absolute left-5 h-4 w-4 text-[#807d7e]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Search"
            class="h-full w-full rounded-lg bg-[#f6f6f6] pl-12 pr-4 text-sm font-medium text-gray outline-none transition placeholder:text-[#807d7e] focus:ring-2 focus:ring-purple/30"
          />
        </label>

        <div v-if="isAuthHeader" class="hidden items-center gap-7 lg:flex">
          <button
            type="button"
            class="flex items-center gap-4 text-lg font-medium text-gray transition hover:text-purple"
          >
            English (united States)
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
            </svg>
          </button>

          <RouterLink
            :to="{ name: routesName.login }"
            class="inline-flex h-[54px] min-w-[150px] items-center justify-center rounded-lg border border-gray px-8 text-lg font-medium text-purple transition hover:border-purple"
            :class="{ 'border-purple bg-purple text-white': route.name === routesName.login }"
          >
            Login
          </RouterLink>

          <RouterLink
            :to="{ name: routesName.register }"
            class="inline-flex h-[54px] min-w-[150px] items-center justify-center rounded-lg border border-gray px-8 text-lg font-medium text-purple transition hover:border-purple"
            :class="{ 'border-purple bg-purple text-white': route.name === routesName.register }"
          >
            Sign Up
          </RouterLink>
        </div>

        <nav v-else class="flex items-center gap-2 sm:gap-3" aria-label="User navigation">
          <RouterLink
            :to="{ name: routesName.wishlist }"
            class="header-icon-button"
            :class="{ 'header-icon-button--active': isIconActive('wishlist') }"
            aria-label="Wishlist"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>

          <RouterLink
            :to="accountRoute"
            class="header-icon-button"
            :class="{ 'header-icon-button--active': isIconActive('account') }"
            aria-label="Account"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>

          <RouterLink
            :to="{ name: routesName.cart }"
            class="header-icon-button"
            :class="{ 'header-icon-button--active': isIconActive('cart') }"
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6h15l-1.5 8.5H7.5L6 6Zm0 0 1 12h11M6 6H3m6 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>
