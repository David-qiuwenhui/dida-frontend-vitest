import { it, expect, describe, vi, beforeEach } from "vitest";
import { useRouter } from "vue-router";
import { useGoto } from "..";

// mock vue-router
vi.mock("vue-router");
const pushFn = vi.fn();
vi.mocked(useRouter as () => { push: Function }).mockImplementation(() => {
  return {
    push: pushFn,
  };
});

describe("The Header", () => {
  // 清空 pushFn 的 mock 缓存
  beforeEach(() => {
    pushFn.mockClear();
  });

  it("should be go to home page", () => {
    const { goToHome } = useGoto();
    goToHome();

    expect(pushFn).toBeCalledWith({ name: "Home" });
  });

  it("should be go to setting page", () => {
    const { goToSetting } = useGoto();
    goToSetting();

    expect(pushFn).lastCalledWith({ name: "Settings" });
  });
});
