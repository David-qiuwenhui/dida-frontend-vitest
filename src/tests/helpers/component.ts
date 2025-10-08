import { mount } from "@vue/test-utils";

export function useSetup(setup: () => void) {
  // 空渲染函数：用于测试组件逻辑而不涉及UI渲染
  const Comp = {
    render() {},
    setup,
  };

  // 挂载组件，触发 setup 函数
  const wrapper = mount(Comp);

  return {
    wrapper,
    router: wrapper.router,
  };
}
