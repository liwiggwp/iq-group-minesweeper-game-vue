<template>
  <div class="container">
    <div class="sidebar-left">
      <CustomButton @click="$router.push('/')" width="100"
        >Вернуться к настройкам</CustomButton
      >
      <CustomButton @click="restartGame()" width="100"
        >Перезапустить игру</CustomButton
      >
    </div>
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          @click="openCell(rowIndex, colIndex)"
          @contextmenu.prevent="flagCell(rowIndex, colIndex)"
          :style="{
            backgroundColor: cell.isOpen ? '#fff' : '#ccc',
            color: colors[cell.countMines],
          }"
        >
          {{ cell.isOpen && cell.countMines > 0 ? cell.countMines : "" }}
          <img
            v-if="cell.isMine && cell.isOpen"
            src="@/assets/mine.png"
            class="mine-image"
          />
          <img
            v-if="cell.isFlag === 'flag' && !cell.isOpen"
            src="@/assets/flag.png"
            class="flag-image"
          />
          <img
            v-if="cell.isFlag === 'question' && !cell.isOpen"
            src="@/assets/question.png"
            class="question-image"
          />
        </div>
      </div>
    </div>
    <div class="sidebar-right">
      <p>Осталось мин: {{ counterMines }}</p>
    </div>
    <DialogMessage
      :visible="dialogVisible"
      :message="dialogMessage"
      @close="dialogVisible = false"
      :isWin="isWin"
    />
  </div>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";
import colors from "@/utils/numberColors";
import DialogMessage from "@/components/ui/DialogMessage.vue";

export default {
  components: {
    CustomButton,
    DialogMessage,
  },
  data() {
    return {
      board: [],
      counterMines: 0,
      isGameover: false,
      colors,
      dialogVisible: false,
      dialogMessage: "",
      isWin: false,
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
      this.counterMines = mines;
      this.isGameover = false;
      this.board = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          isMine: false,
          isOpen: false,
          isFlag: null,
        }))
      );
      this.initMines(rows, cols, mines);
      this.countNeighbourMines();
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
      if (this.isGameover) return;
      const cell = this.board[row][col];
      if (cell.isOpen || cell.isFlag === "flag") return;
      cell.isOpen = true;

      if (cell.isMine) {
        this.isGameover = true;
        this.dialogMessage = "Вы проиграли!";
        this.isWin = false;
        this.dialogVisible = true;
        return;
      }

      if (cell.countMines === 0) {
        this.openNeighbourCells(row, col);
      }
      this.isWinGame();
    },
    flagCell(row, col) {
      if (this.isGameOver) return;

      const cell = this.board[row][col];
      if (cell.isOpen) return;

      if (!cell.isFlag) {
        cell.isFlag = "flag";
        this.counterMines--;
      } else if (cell.isFlag === "flag") {
        cell.isFlag = "question";
        this.counterMines++;
      } else if (cell.isFlag === "question") {
        cell.isFlag = null;
      }
      this.isWinGame();
    },
    isCellBoard(row, col) {
      return (
        row >= 0 &&
        col >= 0 &&
        row < this.board.length &&
        col < this.board[0].length
      );
    },
    countNeighbourMines() {
      for (let row = 0; row < this.board.length; row++) {
        for (let col = 0; col < this.board[row].length; col++) {
          if (this.board[row][col].isMine) continue;

          let countMines = 0;

          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              if (this.isCellBoard(i, j) && this.board[i][j].isMine) {
                countMines++;
              }
            }
          }

          this.board[row][col].countMines = countMines;
        }
      }
    },
    openNeighbourCells(row, col) {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (this.isCellBoard(i, j) && (i !== row || j !== col)) {
            const neighbour = this.board[i][j];
            if (!neighbour.isOpen && !neighbour.isMine) {
              this.openCell(i, j);
            }
          }
        }
      }
    },
    isWinGame() {
      let allFlagMines = true;
      let allOpenCell = true;

      for (let row of this.board) {
        for (let cell of row) {
          if (cell.isMine && cell.isFlag !== "flag") {
            allFlagMines = false;
          }
          if (!cell.isMine && !cell.isOpen) {
            allOpenCell = false;
          }
        }
      }

      if ((allFlagMines && this.counterMines === 0) || allOpenCell) {
        this.isGameover = true;
        this.dialogMessage = "Поздравляем! Вы победили!";
        this.isWin = true;
        this.dialogVisible = true;
      }
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
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: flex-start;
  margin-top: 20px;
}
.sidebar-left {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}
.sidebar-right {
  display: flex;
  flex-direction: column;
}
.board {
  display: grid;
  gap: 1px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
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
.question-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
p {
  margin: 0;
}
</style>