import { watchDebounced } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useSearchCommands } from "./searchCommands";
import { useSearchTasks } from "./searchTasks";
import { delay } from "@/utils";

// 搜索输入
const search = ref("");
// 搜索加载状态
const loading = ref(false);
const searching = ref(false);

// 搜索组件是否已初始化
let isInitialized = false;

/**
 * 搜索组件方法
 */
export function useSearch() {
  const { resetSearchCommands, searchCommands } = useSearchCommands();
  const { resetSearchTasks, searchTasks } = useSearchTasks();

  // 初始化搜索组件
  function init() {
    if (isInitialized) {
      return;
    }

    isInitialized = true;
    // 监听搜索输入变化，当输入不为空时触发搜索
    watchDebounced(
      () => search.value,
      async (newValue) => {
        if (newValue) {
          loading.value = true;
          await handleSearch(newValue);
          loading.value = false;
          searching.value = true;
        }
      },
      { debounce: 500 }
    );

    // 监听搜索输入变化，当输入为空时重置搜索结果
    watch(
      () => search.value,
      (newValue) => {
        if (newValue === "") {
          resetSearch();
          resetSearchCommands();
          resetSearchTasks();
        }
      }
    );
  }

  // 检查搜索输入是否为命令类型
  const isSearchCommand = computed(() => {
    return search.value.startsWith(">");
  });

  // 重置搜索组件
  function resetSearch() {
    search.value = "";
    loading.value = false;
    searching.value = false;
  }

  // 处理搜索输入
  async function handleSearch(input: string) {
    if (isSearchCommand.value) {
      // 命令类型搜索
      searchCommands(input.trimEnd().slice(1));
    } else {
      // 值类型搜索
      await delay();
      await searchTasks(input);
    }
  }

  // 初始化搜索组件
  init();

  return {
    loading,
    searching,
    search,
    isSearchCommand,
    resetSearch,
  };
}
