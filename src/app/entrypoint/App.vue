<!-- app/providers/App.vue -->
<script setup lang="ts"></script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex flex-col">
        <RouterLink :to="{ name: 'home' }" class="text-blue-500">Вернуться на главную</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="text-blue-500">Пройти регистрацию</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
