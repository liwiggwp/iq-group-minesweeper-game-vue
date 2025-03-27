<template>
  <h2>Время:</h2>
  <div class="timer">
    {{ timeFormat }}
  </div>
</template>

<script>
export default {
  props: {
    seconds: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    timeFormat() {
      const minutes = Math.floor(this.seconds / 60);
      const seconds = this.seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
};
</script>

<style scoped>
.timer {
  font-size: 50px;
}
h2 {
  margin: 0;
}
</style>