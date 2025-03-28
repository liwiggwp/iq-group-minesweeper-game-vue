<template>
  <div v-if="visible" class="dialog-container">
    <div class="dialog-box">
      <button class="close-button" @click="onClose()">&times;</button>
      <img v-if="isWin" src="@/assets/win.png" class="dialog-image" />
      <img v-else src="@/assets/lose.png" class="dialog-image" />
      <h2 class="dialog-title">{{ message }}</h2>
      <p v-if="isWin">Ваше время: {{ timer }} сек.</p>
      <input
        v-if="isWin"
        v-model="playerName"
        type="text"
        class="player-name-input"
        placeholder="Введите ваше имя"
      />
      <CustomButton variant="outlined" width="50%" @click="saveResult()">
        Закрыть
      </CustomButton>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";

export default {
  components: {
    CustomButton,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isWin: {
      type: Boolean,
      required: true,
    },
    timer: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      playerName: "",
    };
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    saveResult() {
      if (this.isWin && this.playerName) {
        const newRecord = { player: this.playerName, time: this.timer };
        this.$store.commit("ADD_LEADER", newRecord);
      }
      this.onClose();
    },
  },
};
</script>

<style scoped>
.dialog-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-box {
  background: white;
  width: 400px;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  position: relative;
}

.dialog-title {
  margin: 0;
  font-size: 30px;
}
.dialog-image {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
  color: #444;
}
.close-button:hover {
  color: #272727;
}
.player-name-input {
  align-items: center;
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>