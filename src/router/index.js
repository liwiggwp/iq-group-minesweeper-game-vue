import { createRouter, createWebHistory } from "vue-router";
import SettingsView from "@/view/SettingsView.vue";
import GameView from "@/view/GameView.vue";
import LeaderboardView from "@/view/LeaderboardView.vue";
import MainLayout from "@/components/layout/MainLayout.vue";
import Error404View from "@/view/Error404View.vue"; 

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: SettingsView },
      { path: "/game", component: GameView },
      { path: "/leaderboard", component: LeaderboardView },
    ],
  },
  {
    path: "/:pathMatch(.*)*", 
    component: Error404View,
  },
];

const router = createRouter({
  history: createWebHistory(`/iq-group-minesweeper-game-vue/`),
  routes,
});

export default router;
