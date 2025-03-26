<template>
  <div>
    <h1>Игра</h1>
    <CustomButton @click="$router.push('/')" width="100"
      >Вернуться к настройкам</CustomButton
    >
    <CustomButton @click="restartGame()" width="100"
      >Перезапустить игру</CustomButton
    >
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          @click="openCell(rowIndex, colIndex)"
          @contextmenu.prevent="flagCell(rowIndex, colIndex)"
          :style="{
            backgroundColor: cell.isOpen ? '#444' : '#ccc',
          }"
        >
          <img
            v-if="cell.isMine && cell.isOpen"
            src="@/assets/mine.png"
            class="mine-image"
          />
          <img
            v-if="cell.isFlag && !cell.isOpen"
            src="@/assets/flag.png"
            class="flag-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";

export default {
  components: {
    CustomButton,
  },
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
        Array.from({ length: cols }, () => ({
          isMine: false,
          isOpen: false,
          isFlag: false,
        }))
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
    openCell(row, col) {
      const cell = this.board[row][col];
      if (cell.isOpen || cell.isFlag) return;
      cell.isOpen = true;
    },
    flagCell(row, col) {
      const cell = this.board[row][col];
      if (cell.isOpen) return;
      cell.isFlag = !cell.isFlag;
    },
    restartGame() {
      this.initBoard();
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
  gap: 1px;
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
  border: 1px solid #999;
}
.mine-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.flag-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>