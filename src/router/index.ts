import type { RouteRecordRaw, Router } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { SettingsRoute } from "./settings";
import Task from "@/pages/Task.vue";
import Login from "@/pages/Login.vue";

import { RouteNames } from "./constant";
import { finishLoading, startLoading } from "./loading";
import { checkHaveToken } from "@/utils";
import { messageRedirectToSignIn } from "@/composable";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/task", name: RouteNames.HOME },
  {
    path: "/task",
    component: Task,
    name: RouteNames.TASK,
    meta: {
      requireAuth: true,
    },
  },
  SettingsRoute,
  {
    path: "/login",
    component: Login,
    name: RouteNames.LOGIN,
    meta: {
      requireAuth: false,
    },
  },
];

export const setupRouterGuard = (router: Router) => {
  router.beforeEach(() => {
    startLoading();
  });
  router.afterEach(() => {
    finishLoading();
  });

  // TODO: 判断该路由是否需要登录权限
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
      // 需要权限验证, 检查是否有token
      if (checkHaveToken()) {
        next();
      } else {
        // 没有token, 重定向到登录页
        const redirectToLogin = () => {
          next({ name: RouteNames.LOGIN });
        };
        messageRedirectToSignIn(redirectToLogin);
      }
    } else {
      // 不需要权限验证, 直接放行
      next();
    }

    // if (to.matched.some((record) => record.meta.requiresAuth)) {
    //   if (checkHaveToken()) {
    //     next();
    //   } else {
    //     messageRedirectToSignIn();
    //   }
    // } else {
    //   next();
    // }
  });
};

let router: Router;
export const setupRouter = async (app: App) => {
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
};

export const setRouteInstance = (routerInstance: Router) => {
  router = routerInstance;
};

export const getRouterInstance = () => {
  return router;
};
