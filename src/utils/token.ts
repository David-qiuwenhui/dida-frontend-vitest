// 获取 token
export function getToken(): string {
  return localStorage.getItem("token") || "";
}

// 检查是否有 token
export function checkHaveToken(): Boolean {
  return Boolean(getToken());
}

// 设置 token
export function setToken(token: string) {
  localStorage.setItem("token", token);
}

// 清除 token
export function cleanToken() {
  localStorage.removeItem("token");
}
