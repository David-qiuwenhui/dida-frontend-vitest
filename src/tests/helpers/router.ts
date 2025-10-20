import { setRouteInstance, setupRouterGuard } from "@/router";
import { vi } from "vitest";
import { createRouterMock, RouterMockOptions } from "vue-router-mock";

export const useSetupRouter = (options?: RouterMockOptions) => {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...options,
  });

  // 配置路由守卫
  setupRouterGuard(router);

  // 设置路由实例
  setRouteInstance(router);

  return router;
};
