import { getDiscreteApi } from "@/composable/useNaiveDiscreteApi";

export const startLoading = () => {
  getDiscreteApi().loadingBar.start();
};

export const finishLoading = () => {
  getDiscreteApi().loadingBar.finish();
};
