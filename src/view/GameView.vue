<template>
  <LayoutContainer>
    <template #sidebar-left>
      <CustomButton @click="$router.push('/')" width="60%">
        Вернуться к настройкам
      </CustomButton>
      <CustomButton @click="restartGame()" width="60%">
        Перезапустить игру
      </CustomButton>
    </template>

    <template #default>
      <GameTimer ref="gameTimer" :initStart="true" @update:time="updateTimer" />
    </template>

    <template #sidebar-right>
      <GameMineCounter :counterMines="counterMines" />
    </template>

    <template #board>
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
      <DialogMessage
        :visible="dialogVisible"
        :message="dialogMessage"
        @close="dialogVisible = false"
        :isWin="isWin"
        :timer="timer"
      />
    </template>
  </LayoutContainer>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";
import colors from "@/utils/numberColors";
import DialogMessage from "@/components/ui/DialogMessage.vue";
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import GameTimer from "@/components/game/GameTimer.vue";
import GameMineCounter from "@/components/game/GameMineCounter.vue";

export default {
  components: {
    CustomButton,
    DialogMessage,
    LayoutContainer,
    GameTimer,
    GameMineCounter,
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
      timer: 0,
      firstClick: false,
      difficultySettings: {
        easy: { rows: 8, cols: 8, mines: 10 },
        medium: { rows: 16, cols: 16, mines: 40 },
        hard: { rows: 16, cols: 32, mines: 100 },
      },
    };
  },
  methods: {
    createEmptyBoard(rows, cols) {
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          isMine: false,
          isOpen: false,
          isFlag: null,
          countMines: 0,
        }))
      );
    },
    initBoard() {
      const rows = parseInt(this.$route.query.rows) || null;
      const cols = parseInt(this.$route.query.cols) || null;
      const mines = parseInt(this.$route.query.mines) || null;

      if (rows && cols && mines) {
        this.counterMines = mines;
        this.board = this.createEmptyBoard(rows, cols);
      } else {
        const difficulty = this.$route.query.difficulty || "easy";
        const { rows, cols, mines } = this.difficultySettings[difficulty];
        this.counterMines = mines;
        this.isGameover = false;
        this.board = this.createEmptyBoard(rows, cols);
      }
      this.firstClick = false;
    },
    initMines(mines, firstRow, firstCol) {
      let minesPlaced = 0;

      while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * this.board.length);
        const col = Math.floor(Math.random() * this.board[0].length);
        if (
          !this.board[row][col].isMine &&
          (row !== firstRow || col !== firstCol)
        ) {
          this.board[row][col].isMine = true;
          minesPlaced++;
        }
      }
    },
    openCell(row, col) {
      if (
        this.isGameover ||
        this.board[row][col].isOpen ||
        this.board[row][col].isFlag === "flag"
      )
        return;
      if (!this.firstClick) {
        this.initMines(this.counterMines, row, col);
        this.countNeighbourMines();
        this.firstClick = true;
      }

      const cell = this.board[row][col];
      cell.isOpen = true;

      if (cell.isMine) {
        this.stopGame(false, "Вы проиграли!");
        return;
      }

      if (cell.countMines === 0) {
        this.openNeighbourCells(row, col);
      }
      this.isWinGame();
    },
    flagCell(row, col) {
      if (!this.firstClick || this.isGameover) return;

      const cell = this.board[row][col];
      if (cell.isOpen) return;

      if (!cell.isFlag) {
        if (this.counterMines > 0) {
          cell.isFlag = "flag";
          this.counterMines--;
        } else {
          cell.isFlag = "question";
        }
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
          if (cell.isFlag !== "flag") {
            allFlagMines = false;
          }
          if (!cell.isMine && !cell.isOpen) {
            allOpenCell = false;
          }
        }
      }

      if ((allFlagMines && this.counterMines === 0) || allOpenCell) {
        this.stopGame(true, "Поздравляем! Вы победили!");
      }
    },
    stopGame(isWin, message) {
      this.isGameover = true;
      this.dialogMessage = message;
      this.isWin = isWin;
      this.dialogVisible = true;
      this.$refs.gameTimer.stopTimer();
    },
    updateTimer(seconds) {
      this.timer = seconds;
    },
    restartGame() {
      this.initBoard();
      this.$refs.gameTimer.resetTimer();
      this.$refs.gameTimer.startTimer();
    },
  },
  created() {
    this.initBoard();
  },
};
</script>

<style scoped>
.board {
  display: inline-grid;
  gap: 1px;
  overflow-x: auto;
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

@media (max-width: 768px) {
  .board {
    transform: scale(0.95);
  }
}
@media (max-width: 600px) {
  .board {
    transform: scale(0.85);
  }
}

@media (max-width: 500px) {
  .board {
    transform: scale(0.75);
  }
}

@media (max-width: 400px) {
  .board {
    transform: scale(0.65);
  }
}

@media (max-width: 350px) {
  .board {
    transform: scale(0.55);
  }
}

@media (max-width: 320px) {
  .board {
    transform: scale(0.5);
  }
}
</style>