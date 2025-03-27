<template>
  <button
    class="custom-button"
    :class="variant"
    :style="{ width: width }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    variant: {
      type: String,
      default: "contained",
    },
  },
};
</script>

<style>
.custom-button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.custom-button.contained {
  background-color: #161616;
  color: white;
  border: none;
}
.custom-button.contained:hover {
  transform: scale(1.05);
}
.custom-button.contained:active {
  transform: scale(0.95);
}

.custom-button.outlined {
  background-color: transparent;
  color: #161616;
  border: 2px solid #161616;
}
.custom-button.outlined:hover {
  background-color: #161616;
  color: white;
}
</style>