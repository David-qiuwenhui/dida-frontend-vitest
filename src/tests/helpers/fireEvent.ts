/**
 * 模拟键盘事件
 * 参考 @testing-library/user-event 库的实现
 * http://testing-library.com/docs/dom-testing-library/api-events/#fireevent
 */
export const fireEvent = {
  /**
   * 模拟按下键盘事件
   * @param eventInitDict 键盘事件初始化参数
   */
  keydown(eventInitDict?: KeyboardEventInit) {
    window.dispatchEvent(new KeyboardEvent("keydown", eventInitDict));
  },
};
