import { it, expect, describe, beforeEach } from "vitest";
import { RouterMock } from "vue-router-mock";
import { routes } from "..";
import { RouteNames } from "../constant";
import { cleanToken, setToken } from "@/utils";
import { useSetupRouter } from "@/tests/helpers";

describe("The Router", () => {
  let router: RouterMock;
  beforeEach(() => {
    cleanToken();
    router = useSetupRouter({
      // 配置路由
      routes: routes,
      // 允许使用真正的导航守卫
      useRealNavigation: true,
    });
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
