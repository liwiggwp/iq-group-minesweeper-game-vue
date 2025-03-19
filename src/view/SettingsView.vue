<template>
  <div>
    <h1>Настройки</h1>
    <button @click="$router.push('/leaderboard')">Таблица лидеров</button>
    <h1>Выбор уровня сложности</h1>
    <div class="difficulty">
      <button @click="selectDifficulty('easy')">Простой (8x8, 10 мин)</button>
      <button @click="selectDifficulty('medium')">
        Средний (16x16, 40 мин)
      </button>
      <button @click="selectDifficulty('hard')">
        Сложный (32x16, 100 мин)
      </button>
    </div>
    <p v-if="selectedDifficulty">
      Выбрано {{ difficultyText[selectedDifficulty] }}
    </p>
    <button @click="$router.push('/game')">Начать игру</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDifficulty: null,
      difficultyText: {
        easy: "Простой (8x8, 10 мин)",
        medium: "Средний (16x16, 40 мин)",
        hard: "Сложный (32x16, 100 мин)",
      },
    };
  },
  methods: {
    selectDifficulty(difficulty) {
      this.selectedDifficulty = difficulty;
    },
  
  },
};
</script>

<style>
.difficulty{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  margin-top: 20px;
}

.difficulty button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>