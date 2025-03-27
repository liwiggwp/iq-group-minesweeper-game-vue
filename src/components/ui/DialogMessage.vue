<template>
  <div v-if="visible" class="dialog-container">
    <div class="dialog-box">
      <button class="close-button" @click="onClose()">&times;</button>
      <img v-if="isWin" src="@/assets/win.png" class="dialog-image" />
      <img v-else src="@/assets/lose.png" class="dialog-image" />
      <h2 class="dialog-title">{{ message }}</h2>
      <button class="ok-button" @click="onClose()">Понятно</button>
    </div>
  </div>
</template>

<script>
export default {
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
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
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
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 20px;
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
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  line-height: 1;
}

.close-button:hover {
  color: #212529;
}

.ok-button {
  background-color: #161616;
  color: white;
  border: 2px solid #161616;
  border-radius: 4px;
  margin: 10px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.ok-button:hover {
  background-color: white;
  color: #161616;
}
</style>