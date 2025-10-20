// 消息组件
export function messageInfo(message: string) {
  console.log(message);
}

// 错误消息组件
export function messageError(message: string) {
  console.error(message);
}

// 重定向到登录页
export function messageRedirectToSignIn(callback?: () => void) {
  callback && callback();
  messageError("登录过期，请重新登录");
}
