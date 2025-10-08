import type { Command } from "./index";
import { useGoto } from "@/composable";

/**
 * 前往主页命令
 */
export class CommandGoToHome implements Command {
  goToHome: () => void;
  name = "前往主页";

  constructor() {
    // 当 command 的逻辑依赖于 vue setup 的话, 必须在构造函数中获取
    // 比如这里依赖于 useGoto 而  useGoto 依赖于 useRouter .
    // useRouter 必须在 setup 中调用
    const { goToHome } = useGoto();
    this.goToHome = goToHome;
  }

  execute() {
    this.goToHome();
  }
}
