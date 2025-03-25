<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.png" class="logo-image" />
      Кото-сапер
    </div>
    <nav>
      <button class="nav-button" @click="$router.push('/leaderboard')">
        Таблица лидеров
      </button>
    </nav>
  </header>
</template>

<style>
body {
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #161616;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.logo-image {
  width: 55px;
  height: 55px;
  object-fit: contain;
}

.nav-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  margin: 10px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-button:hover {
  background-color: white;
  color: #161616;
}

.nav-button:active {
  background-color: #161616;
  color: white;
}
</style>
