<template>
  <div>
    <h1>Настройки</h1>
    <button @click="$router.push('/game')">Начать игру</button>
    <button @click="$router.push('/leaderboard')">Таблица лидеров</button>
  </div>
</template>

<script>
export default {
  name: "SettingsView",
};
</script>
