import { it, expect, describe, vi } from "vitest";
import {
  GITHUB_URL,
  goToLoginHandler,
  openGithub,
  useGoto,
} from "../../composable";
import { useSetup, useSetupRouter } from "@/tests/helpers";
import { RouteNames } from "@/router/constant";
import { routes } from "@/router";

describe("The Header", () => {
  it("should be go to home page", () => {
    const { router } = useSetup(() => {
      const { goToHome } = useGoto();
      goToHome();
    });

    expect(router.push).toBeCalledWith({ name: RouteNames.HOME });
  });

  it("should be go to setting page", () => {
    const { router } = useSetup(() => {
      const { goToSetting } = useGoto();
      goToSetting();
    });

    expect(router.push).toBeCalledWith({ name: RouteNames.SETTINGS });
  });

  it("should be go to github page", () => {
    const windowViFn = vi.fn();
    window.open = windowViFn;
    openGithub();

    expect(windowViFn).toBeCalledWith(GITHUB_URL);
  });

  // 行为验证
  it("should be go to login page", async () => {
    const router = useSetupRouter();

    await goToLoginHandler();

    expect(router.replace).toBeCalledWith({
      name: RouteNames.LOGIN,
    });
  });

  // 状态验证
  it("should be go to login page", async () => {
    const router = useSetupRouter({ routes });

    await goToLoginHandler();

    expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN);
  });
});
