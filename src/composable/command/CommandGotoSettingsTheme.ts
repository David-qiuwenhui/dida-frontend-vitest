import type { Command } from "./index";
import { useGoto } from "@/composable";

/**
 * 切换主题命令
 */
export class CommandGoToSettingsTheme implements Command {
  goToSettingsTheme: () => void;
  name = "切换皮肤";

  constructor() {
    const { goToSetting } = useGoto();
    this.goToSettingsTheme = goToSetting;
  }

  execute() {
    this.goToSettingsTheme();
  }
}
