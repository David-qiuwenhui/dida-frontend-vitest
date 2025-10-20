import { it, expect, describe, vi, beforeEach } from "vitest";
import { createRouterMock, RouterMock } from "vue-router-mock";
import { routes, setupRouterGuard } from "..";
import { RouteNames } from "../constant";
import { cleanToken, setToken } from "@/utils";

const setupRouter = () => {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    routes: routes,
    // 允许使用真正的导航守卫
    useRealNavigation: true,
  });

  // 配置路由守卫
  setupRouterGuard(router);

  return router;
};

describe("The Router", () => {
  let router: RouterMock;
  beforeEach(() => {
    cleanToken();
    router = setupRouter();
  });

  describe("need requires auth", () => {
    it("should be requires auth", async () => {
      setToken("test-token");

      await router.push({
        name: RouteNames.TASK,
      });

      expect(router.currentRoute.value.name).toBe(RouteNames.TASK);
    });

    it("should be jump to login when user have not login token", async () => {
      await router.push({
        name: RouteNames.TASK,
      });

      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });
  });

  it("should be jump to login page when do not requires auto", async () => {
    await router.push({
      name: RouteNames.LOGIN,
    });

    expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN);
  });
});
