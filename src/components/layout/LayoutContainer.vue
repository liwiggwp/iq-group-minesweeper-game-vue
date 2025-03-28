<template>
  <div class="container">
    <div class="top-row">
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

    <div class="board-container">
      <slot name="board"></slot>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.top-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
.sidebar-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sidebar-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.board-container {
  display: flex;
  justify-content: center;
}
</style>