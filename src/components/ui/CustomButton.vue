<template>
  <button
    class="custom-button"
    :style="{ backgroundColor: color, width: width }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#018aca",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
};
</script>

<style>
.custom-button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.custom-button:hover {
  transform: scale(1.05);
}

.custom-button:active {
  transform: scale(0.95);
}
</style>
