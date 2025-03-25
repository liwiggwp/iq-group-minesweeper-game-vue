<template>
  <div>
    <div>
      <div class="settings-container">
        <h1>Выбор уровня сложности</h1>
        <div class="difficulty">
          <CustomButton @click="startGame('easy')" width="100%"
            >Простой (8x8, 10 мин)</CustomButton
          >
          <CustomButton @click="startGame('medium')" width="100%"
            >Средний (16x16, 40 мин)</CustomButton
          >
          <CustomButton @click="startGame('hard')" width="100%"
            >Сложный (32x16, 100 мин)</CustomButton
          >
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
}
</style>