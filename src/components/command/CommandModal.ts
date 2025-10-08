import { onMounted, onUnmounted, ref } from "vue";
import { useIsMac } from "@/composable";

// 命令弹窗是否显示
const showCommandModal = ref(false);

/**
 * 命令弹窗相关的组合式函数
 */
export function useCommandModal() {
  /**
   * 打开命令弹窗
   */
  function openCommandModal() {
    showCommandModal.value = true;
  }

  /**
   * 关闭命令弹窗
   */
  function closeCommandModal() {
    showCommandModal.value = false;
  }

  /**
   * 注册键盘快捷键
   * 在MacOS中按下Command + K会打开命令弹窗，在Windows中按下Ctrl + K会打开命令弹窗
   */
  function registerKeyboardShortcut() {
    const isMac = useIsMac();

    // 监听键盘事件
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "k" && (isMac.value ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        openCommandModal();
      }
    };

    // 注册键盘快捷键事件
    onMounted(() => {
      window.addEventListener("keydown", keydownHandler);
    });

    // 注销键盘快捷键事件
    onUnmounted(() => {
      window.removeEventListener("keydown", keydownHandler);
    });
  }

  return {
    showCommandModal,
    openCommandModal,
    closeCommandModal,
    registerKeyboardShortcut,
  };
}
