<template>
  <LayoutContainer>
    <template #sidebar-left>
      <img src="@/assets/main.png" class="main-image" />
      <table>
        <thead>
          <tr>
            <th>Игрок</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(leader, index) in leaders" :key="index">
            <td>{{ leader.player }}</td>
            <td>{{ formatTime(leader.time) }}</td>
          </tr>
        </tbody>
      </table>
      <h3>Топ 3 лидера</h3>
    </template>

    <template #default>
      <h1>Выбор уровня сложности</h1>
      <div class="difficulty">
        <CustomButton @click="startGame('easy')" width="100%">
          Простой (8x8, 10 мин)
        </CustomButton>
        <CustomButton @click="startGame('medium')" width="100%">
          Средний (16x16, 40 мин)
        </CustomButton>
        <CustomButton @click="startGame('hard')" width="100%">
          Сложный (32x16, 100 мин)
        </CustomButton>
      </div>
      <DialogMessage
        :visible="dialogVisible"
        :message="dialogMessage"
        :isWin="false"
        :timer="0"
        @close="dialogVisible = false"
      />
    </template>

    <template #sidebar-right>
      <h2>Кастомный режим</h2>
      <form @submit.prevent="startCustomGame" class="custom-mode">
        <div class="input-group">
          <p>Строки</p>
          <input
            id="rows"
            type="number"
            v-model.number="customRows"
            min="5"
            max="50"
            required
          />
        </div>
        <div class="input-group">
          <p>Столбцы</p>
          <input
            id="cols"
            type="number"
            v-model.number="customCols"
            min="5"
            max="50"
            required
          />
        </div>
        <div class="input-group">
          <p>Мины</p>
          <input
            id="mines"
            type="number"
            v-model.number="customMines"
            min="1"
            required
          />
        </div>
        <CustomButton type="submit" width="50%">Начать игру</CustomButton>
      </form>
    </template>
  </LayoutContainer>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";
import LayoutContainer from "@/components/layout/LayoutContainer.vue";
import DialogMessage from "@/components/ui/DialogMessage.vue";
import { formatTime } from "@/utils/timeFormatter.js";

export default {
  components: {
    CustomButton,
    LayoutContainer,
    DialogMessage,
  },
  data() {
    return {
      customRows: 10,
      customCols: 10,
      customMines: 10,
      dialogVisible: false,
      dialogMessage: "",
      leaders: [],
    };
  },
  mounted() {
    this.leaders = this.$store.getters.TOPLEADERS.slice(0, 3);
  },
  methods: {
    startGame(difficulty) {
      this.$router.push({ path: "/game", query: { difficulty } });
    },
    startCustomGame() {
      if (this.customMines >= this.customRows * this.customCols) {
        this.dialogMessage =
          "Количество мин должно быть меньше, чем количество ячеек!";
        this.dialogVisible = true;
        return;
      }
      this.$router.push({
        path: "/game",
        query: {
          rows: this.customRows,
          cols: this.customCols,
          mines: this.customMines,
        },
      });
    },
    formatTime,
  },
};
</script>

<style scoped>
.difficulty {
  display: flex;
  flex-direction: column;
}
.custom-mode {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
}
input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
h2 {
  align-self: flex-start;
  margin-top: 0;
}
p {
  align-self: flex-start;
  font-size: 14px;
  margin-bottom: 5px;
}
.main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 0;
  padding: 0;
}

table {
  width: 80%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: center;
}

th,
td {
  border: 1px solid #999;
  padding: 5px;
}
</style>