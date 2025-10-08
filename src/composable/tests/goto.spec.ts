import { it, expect, describe, vi } from "vitest";
import { GITHUB_URL, openGithub, useGoto } from "../../composable";

import { useSetup } from "@/tests/helpers";
import { RouteNames } from "@/router/constant";

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
});
