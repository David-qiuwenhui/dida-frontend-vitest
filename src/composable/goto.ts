import { getRouterInstance } from "@/router";
import { RouteNames } from "@/router/constant";
import { useRouter } from "vue-router";

/**
 * 路由跳转函数
 * @returns 跳转函数
 */
export function useGoto() {
  const router = useRouter();

  function goToHome() {
    router.push({
      name: RouteNames.HOME,
      // path: "/",
    });
  }

  function goToSetting() {
    router.push({
      name: RouteNames.SETTINGS,
    });
  }

  function goToLogin() {
    router.push({
      name: RouteNames.LOGIN,
    });
  }

  return {
    goToHome,
    goToSetting,
    goToLogin,
  };
}

/**
 * 打开github页面
 */
export const GITHUB_URL = "https://github.com/cuixueshe/dida";
export function openGithub() {
  window.open(GITHUB_URL);
}

export const goToLoginHandler = () => {
  const router = getRouterInstance();
  return router.replace({
    name: RouteNames.LOGIN,
  });
};
