<template>
  <h2>Время:</h2>
  <div class="timer">
    {{ formattedTime }}
  </div>
</template>

<script>
import { formatTime } from "@/utils/timeFormatter.js";

export default {
  props: {
    initStart: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      seconds: 0,
      timerInterval: null,
    };
  },
  computed: {
    formattedTime() {
      return formatTime(this.seconds);
    },
  },
  methods: {
    startTimer() {
      if (this.timerInterval) return;
      this.timerInterval = setInterval(() => {
        this.seconds++;
        this.$emit("update:time", this.seconds);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    },
    resetTimer() {
      this.stopTimer();
      this.seconds = 0;
    },
  },
  mounted() {
    if (this.initStart) {
      this.startTimer();
    }
  },
  beforeUnmount() {
    this.stopTimer();
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