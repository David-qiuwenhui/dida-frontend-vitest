import { vi, beforeEach } from "vitest";
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
} from "vue-router-mock";
import { config } from "@vue/test-utils";
// 解决 indexeddb 报错问题
import "fake-indexeddb/auto";

/**
 * 初始化配置 Vue Router 模拟
 */
function setupRouterMock() {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
  });

  beforeEach(() => {
    // 实际调用 reset: (spy) => spy.mockClear(),
    router.reset();
    injectRouterMock(router);
  });

  config.plugins.VueWrapper.install(VueRouterMock);
}

setupRouterMock();
