/**
 * 延迟等待函数
 * @param ms 延迟时间，默认 1000 毫秒
 */
export function delay(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}
