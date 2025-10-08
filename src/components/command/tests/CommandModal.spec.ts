import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCommandModal } from "@/components/command/CommandModal";
import { useSetup, fireEvent } from "@/tests/helpers";
import * as useIsMac from "@/composable/useIsMac";
import { computed } from "vue";

/**
 * 模拟方式一
 * 模拟 @/composable 模块，重写 useIsMac 函数返回 true
 */
// import { computed } from "vue";
// vi.mock("@/composable", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...(actual || {}),
//     useIsMac() {
//       return computed(() => true); // 模拟返回 Mac 系统环境
//     },
//   };
// });

describe("useCommandModal", () => {
  // 状态恢复
  beforeEach(() => {
    // 每个测试用例执行前，将命令弹窗状态设置为关闭
    const { showCommandModal } = useCommandModal();
    showCommandModal.value = false;
  });

  it("should be open command modal", () => {
    const { openCommandModal, showCommandModal } = useCommandModal();
    openCommandModal();

    expect(showCommandModal.value).toBe(true);
  });

  it("should be close command modal", () => {
    const { closeCommandModal, showCommandModal } = useCommandModal();
    closeCommandModal();

    expect(showCommandModal.value).toBe(false);
  });

  it("should be open command modal when press command + k on mac", () => {
    // 模拟 useIsMac 函数返回 true
    vi.spyOn(useIsMac, "useIsMac").mockReturnValue(computed(() => true));
    // vi.spyOn(useIsMac, "useIsMac").mockImplementation(() =>
    //   computed(() => true)
    // );

    const { registerKeyboardShortcut, showCommandModal } = useCommandModal();
    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut();
    });
    // 模拟按下Command + K
    fireEvent.keydown({ key: "k", metaKey: true });

    expect(showCommandModal.value).toBe(true);
    wrapper.unmount();
  });

  it("should be open command modal when press ctrl + k on windows", () => {
    // 模拟 useIsMac 函数返回 false
    vi.spyOn(useIsMac, "useIsMac").mockReturnValue(computed(() => false));
    // vi.spyOn(useIsMac, "useIsMac").mockImplementation(() =>
    //   computed(() => true)
    // );

    const { registerKeyboardShortcut, showCommandModal } = useCommandModal();
    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut();
    });
    // 模拟按下Ctrl + K
    fireEvent.keydown({ key: "k", ctrlKey: true });

    expect(showCommandModal.value).toBe(true);
    wrapper.unmount();
  });
});
