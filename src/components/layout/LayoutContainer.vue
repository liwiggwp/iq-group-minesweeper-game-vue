<template>
  <div class="container">
    <div class="sidebar-left">
      <slot name="sidebar-left"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="sidebar-right">
      <slot name="sidebar-right"></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: flex-start;
  margin-top: 20px;
}
.sidebar-left {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}
.sidebar-right {
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>