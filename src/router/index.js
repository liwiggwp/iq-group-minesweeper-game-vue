import { createRouter, createWebHistory } from "vue-router";
import SettingsView from "@/view/SettingsView.vue";
import GameView from "@/view/GameView.vue";
import LeaderboardView from "@/view/LeaderboardView.vue";
import MainLayout from "@/components/layout/MainLayout.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
