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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.top-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: start;
}
.sidebar-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  max-width: 400px;
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
  margin-left: 40px;
  max-width: 400px;
}
.board-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .top-row {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sidebar-left {
    order: 1;
    width: 100%;
    text-align: center;
  }
  .content {
    order: 2;
    width: 100%;
    text-align: center;
  }
  .sidebar-right {
    order: 3;
    width: 100%;
    text-align: center;
  }
  .board-container {
    margin-top: 10px;
  }
}
</style>