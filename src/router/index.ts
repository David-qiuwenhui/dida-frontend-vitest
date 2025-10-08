import type { RouteRecordRaw, Router } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { SettingsRoute } from "./settings";
import Task from "@/pages/Task.vue";
import { getDiscreteApi } from "@/composable/useNaiveDiscreteApi";
import { RouteNames } from "./constant";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/task", name: RouteNames.HOME },
  { path: "/task", component: Task, name: RouteNames.TASK },
  SettingsRoute,
];

const setupRouterGuard = (router: Router) => {
  router.beforeEach(() => {
    getDiscreteApi().loadingBar.start();
  });
  router.afterEach(() => {
    getDiscreteApi().loadingBar.finish();
  });
};

export const setupRouter = async (app: App) => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
};
