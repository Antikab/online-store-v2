<script setup lang="ts">
const footerColumns = [
  {
    title: 'Need Help',
    links: ['Contact Us', 'Track Order', 'Returns & Refunds', "FAQ's", 'Career'],
  },
  {
    title: 'Company',
    links: ['About Us', 'euphoria Blog', 'euphoriastan', 'Collaboration', 'Media'],
  },
  {
    title: 'More Info',
    links: ['Term and Conditions', 'Privacy Policy', 'Shipping Policy', 'Sitemap'],
  },
] as const

const socialLinks = ['f', 'ig', 't', 'in'] as const
</script>

<template>
  <footer class="bg-gray text-white">
    <div class="mx-auto w-full max-w-[1220px] px-6 py-14 sm:py-18">
      <div class="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_2fr] lg:gap-14">
        <section v-for="column in footerColumns" :key="column.title">
          <h2 class="text-2xl font-bold leading-tight">{{ column.title }}</h2>

          <ul class="mt-8 space-y-5 text-base font-medium text-white/85">
            <li v-for="link in column.links" :key="link">
              <button type="button" class="text-left transition hover:text-white">
                {{ link }}
              </button>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold leading-tight">Location</h2>

          <address
            class="mt-8 space-y-6 text-base font-medium not-italic leading-relaxed text-white/85"
          >
            <p>support@euphoria.in</p>
            <p>Eklingpura Chouraha, Ahmedabad Main Road</p>
            <p>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</p>
          </address>
        </section>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
        <div class="flex gap-3">
          <button
            v-for="social in socialLinks"
            :key="social"
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-gray transition hover:bg-white/85"
            :aria-label="`Social link ${social}`"
          >
            {{ social }}
          </button>
        </div>

        <section>
          <h2 class="text-2xl font-bold leading-tight">Download The App</h2>

          <div class="mt-7 flex flex-wrap gap-7">
            <button type="button" class="app-badge">
              <span class="app-badge__icon app-badge__icon--play" aria-hidden="true" />
              <span>
                <span class="block text-[10px] leading-none text-white/70">android app on</span>
                <span class="block text-lg leading-tight">Google Play</span>
              </span>
            </button>

            <button type="button" class="app-badge">
              <span class="app-badge__icon app-badge__icon--phone" aria-hidden="true" />
              <span>
                <span class="block text-[10px] leading-none text-white/70">Available on the</span>
                <span class="block text-lg leading-tight">App Store</span>
              </span>
            </button>
          </div>
        </section>
      </div>

      <section class="mt-12 border-y border-white/15 py-7">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left text-2xl font-bold transition hover:text-white/85"
        >
          Popular Categories
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </section>

      <p class="pt-9 text-center text-sm font-bold text-white/90">
        Copyright (c) 2026 Euphoria Folks Pvt Ltd. All rights reserved.
      </p>
    </div>
  </footer>
</template>
