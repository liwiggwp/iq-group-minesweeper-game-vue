<template>
  <div>
    <h1>Игра</h1>
    <button @click="$router.push('/')">Вернуться к настройкам</button>
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell">
          <img
            v-if="cell.isMine"
            src="@/assets/mine.png"
            class="mine-image"
          />
        </div>
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
        easy: { rows: 8, cols: 8, mines: 10 },
        medium: { rows: 16, cols: 16, mines: 40 },
        hard: { rows: 16, cols: 32, mines: 100 },
      },
    };
  },
  methods: {
    initBoard() {
      const difficulty = this.$route.query.difficulty || "easy";
      const { rows, cols, mines } = this.difficultySettings[difficulty];
      this.board = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ isMine: false }))
      );
      this.initMines(rows, cols, mines);
    },
    initMines(rows, cols, mines) {
      let minesPlaced = 0;

      while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!this.board[row][col].isMine) {
          this.board[row][col].isMine = true;
          minesPlaced++;
        }
      }
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
.mine-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>