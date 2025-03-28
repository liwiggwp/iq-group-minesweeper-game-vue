<template>
  <div class="mine-counter">
    <div class="mine-icon-container">
      <img src="@/assets/mine.png" class="mine-icon" />
    </div>
    <div class="mine-text">
      <p>Осталось мин:</p>
      <p>{{ counterMines }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    counterMines: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.mine-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #161616, #a3a3a3);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 20px;
}
.mine-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}
.mine-icon {
  width: 60px;
  height: 60px;
}
.mine-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
}
p{
  margin: 0;
}
</style>