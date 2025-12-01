<script setup lang="ts"></script>

<template>
  <header>
    <div>
      <nav class="flex gap-5">
        <RouterLink :to="{ name: 'home' }" class="text-blue-500">Вернуться на главную</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="text-blue-500">Пройти регистрацию</RouterLink>
        <RouterLink :to="{ name: 'login' }" class="text-blue-500">Ввести свой логин</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
