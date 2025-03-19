import { createRouter, createWebHistory } from "vue-router";
import SettingsView from "@/view/SettingsView.vue";
import GameView from "@/view/GameView.vue";
import LeaderboardView from "@/view/LeaderboardView.vue";

const routes = [
  {
    path: "/",
    component: SettingsView,
  },
  {
    path: "/game",
    component: GameView,
  },
  {
    path: "/leaderboard",
    component: LeaderboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
