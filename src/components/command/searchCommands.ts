import Fuse from "fuse.js";
import { ref } from "vue";
import type { Command } from "@/composable/command";
import { useCommand } from "@/composable/command";

/**
 * 过滤后的命令列表
 */
const filteredCommands = ref<Command[]>([]);
const fuse = new Fuse([] as Command[], {
  keys: ["name"],
});

/**
 * 搜索命令
 */
export function useSearchCommands() {
  const { commands } = useCommand();

  /**
   * 搜索命令
   * @param input 搜索输入
   */
  function searchCommands(input: string) {
    if (!input) {
      resetSearchCommands();
      return;
    }

    fuse.setCollection(commands);
    filteredCommands.value = fuse.search(input).map((i) => i.item);
  }

  /**
   * 重置搜索命令
   */
  function resetSearchCommands() {
    filteredCommands.value = commands;
  }

  return {
    filteredCommands,
    searchCommands,
    resetSearchCommands,
  };
}
