import { it, expect, describe, vi, beforeEach } from "vitest";
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
} from "vue-router-mock";
import { useGoto } from "./theHeader";
import { config, mount } from "@vue/test-utils";

const router = createRouterMock({
  spy: {
    create: (fn) => vi.fn(fn),
    reset: (spy) => spy.mockClear(),
  },
});
config.plugins.VueWrapper.install(VueRouterMock);

describe("The Header", () => {
  beforeEach(() => {
    // 实际调用 reset: (spy) => spy.mockClear(),
    router.reset();
    injectRouterMock(router);
  });
  it("should be go to home page", () => {
    const Comp = {
      render() {},
      setup() {
        const { goToHome } = useGoto();
        goToHome();
      },
    };
    const wrapper = mount(Comp);

    expect(wrapper.router.push).toBeCalledWith({ name: "Home" });
  });

  it.todo("should be go to setting page", () => {
    const Comp = {
      render() {},
      setup() {
        const { goToSetting } = useGoto();
        goToSetting();
      },
    };
    const wrapper = mount(Comp);

    // FIXME: 此处应该报错，因为实际没有进行reset
    expect(wrapper.router.push).toBeCalledWith({ name: "Home" });
    // expect(wrapper.router.push).toBeCalledWith({ name: "Settings" });
  });
});
