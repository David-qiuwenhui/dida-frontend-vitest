import { it, expect, describe } from "vitest";
import { useGoto } from "./theHeader";
import { useSetup } from "@/tests/helpers";

describe("The Header", () => {
  it("should be go to home page", () => {
    const { router } = useSetup(() => {
      const { goToHome } = useGoto();
      goToHome();
    });

    expect(router.push).toBeCalledWith({ name: "Home" });
  });

  it("should be go to setting page", () => {
    const { router } = useSetup(() => {
      const { goToSetting } = useGoto();
      goToSetting();
    });

    expect(router.push).toBeCalledWith({ name: "Settings" });
  });
});
