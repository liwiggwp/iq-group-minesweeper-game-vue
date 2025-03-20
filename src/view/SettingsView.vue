<template>
  <div>
    <h1>Настройки</h1>
    <button @click="$router.push('/leaderboard')">Таблица лидеров</button>

    <div class="settings-container">
      <h1>Выбор уровня сложности</h1>
      <div class="difficulty">
        <button @click="startGame('easy')">Простой (8x8, 10 мин)</button>
        <button @click="startGame('medium')">Средний (16x16, 40 мин)</button>
        <button @click="startGame('hard')">Сложный (32x16, 100 мин)</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame(difficulty) {
      this.$router.push({ path: "/game", query: { difficulty } });
    },
  },
};
</script>

<style>
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.difficulty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.difficulty button {
  width: 100%;
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>