import { computed } from "vue";

/**
 * 判断是否是MacOS
 */
export const useIsMac = () =>
  computed(() => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) || false);

export const useIsWindows = () =>
  computed(() => /(Win)/i.test(navigator.platform) || false);
