<template>
  <div>
    <h1>Игра</h1>
    <button @click="$router.push('/')">Вернуться к настройкам</button>
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      board: [],
      difficultySettings: {
        easy: { rows: 8, cols: 8 },
        medium: { rows: 16, cols: 16 },
        hard: { rows: 16, cols: 32 },
      },
    };
  },
  methods: {
    initBoard() {
      const difficulty = this.$route.query.difficulty || "easy";
      const { rows, cols } = this.difficultySettings[difficulty];
      this.board = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({}))
      );
    },
  },
  created() {
    this.initBoard();
  },
};
</script>

<style>
.board {
  display: grid;
  gap: 2px;
  margin-top: 20px;
  justify-content: center;
}
.row {
  display: flex;
  gap: 2px;
}
.cell {
  width: 30px;
  height: 30px;
  background-color: #ccc;
  border: 1px solid #999;
}
</style>