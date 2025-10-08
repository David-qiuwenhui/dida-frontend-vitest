import { CommandGoToHome } from "./CommandGoToHome";
import { CommandGoToSettingsTheme } from "./CommandGotoSettingsTheme";

/**
 * 定义命令数据类型
 */
export interface Command {
  name: string;
  execute: () => void;
}

/**
 * 命令列表
 */
let commands: Command[] = [];

export function useCommand() {
  /**
   * 初始化命令
   */
  function initCommands() {
    commands.push(new CommandGoToHome());
    commands.push(new CommandGoToSettingsTheme());
  }

  /**
   * 重置命令
   */
  function resetCommand() {
    commands = [];
  }

  /**
   * 添加命令
   */
  function addCommand(command: Command) {
    commands.push(command);
  }

  return {
    commands,
    initCommands,
    resetCommand,
    addCommand,
  };
}
