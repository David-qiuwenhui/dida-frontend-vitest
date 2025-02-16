import { useRouter } from "vue-router";

export function useGoto() {
  const router = useRouter();

  function goToHome() {
    router.push({
      name: "Home",
      // path: "/",
    });
  }

  function goToSetting() {
    router.push({
      name: "Settings",
    });
  }

  function goToGithub() {
    window.open("https://github.com/cuixueshe/dida");
  }

  return {
    goToHome,
    goToSetting,
    goToGithub,
  };
}
