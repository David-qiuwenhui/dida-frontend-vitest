import { it, expect, describe, vi, beforeEach } from "vitest";
import { useSearch } from "../search";

// 模拟搜索任务
const searchTasks = vi.fn();
const resetSearchTasks = vi.fn();
vi.mock("../searchTasks", () => ({
  useSearchTasks: () => ({
    searchTasks,
    resetSearchTasks,
  }),
}));

//  模拟搜索命令
const searchCommands = vi.fn();
const resetSearchCommands = vi.fn();
vi.mock("../searchCommands", () => ({
  useSearchCommands: () => ({
    searchCommands,
    resetSearchCommands,
  }),
}));

describe("useSearch", () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    // 恢复数据
    const { resetSearch } = useSearch();
    resetSearch();

    await vi.runAllTimersAsync();
    // 还原测试间谍
    vi.clearAllMocks();
    // searchTasks.mockClear();
    // resetSearchTasks.mockClear();
    // searchCommands.mockClear();
    // resetSearchCommands.mockClear();
  });

  // 测试ui状态
  it("should be loading is true when search is start", async () => {
    const { loading, search } = useSearch();
    search.value = "mock";
    await vi.advanceTimersToNextTimerAsync();

    expect(loading.value).toBe(true);
  });

  it("should be loading is false when search is end", async () => {
    const { loading, search, searching } = useSearch();
    search.value = "mock";
    await vi.runAllTimersAsync();

    expect(searching.value).toBe(true);
    expect(loading.value).toBe(false);
  });

  // 测试搜索任务
  it("should search tasks", async () => {
    const { search } = useSearch();
    search.value = "mock";
    await vi.runAllTimersAsync();

    expect(searchTasks).toBeCalledWith("mock");
  });

  // 测试搜索命令
  it("should search commands", async () => {
    const { search, isSearchCommand } = useSearch();
    search.value = ">mock";
    await vi.runAllTimersAsync();

    expect(isSearchCommand.value).toBe(true);
    expect(searchCommands).toBeCalledWith("mock");
  });

  it("should search commands after remove white space", async () => {
    const { search, isSearchCommand } = useSearch();
    search.value = ">mock    ";
    await vi.runAllTimersAsync();

    expect(isSearchCommand.value).toBe(true);
    expect(searchCommands).toBeCalledWith("mock");
  });

  // 测试重置搜索任务
  it("should reset search tasks when search is empty", async () => {
    const { search, loading, searching } = useSearch();
    search.value = "mock";
    await vi.runAllTimersAsync();

    search.value = "";
    await vi.runAllTimersAsync();

    expect(loading.value).toBe(false);
    expect(searching.value).toBe(false);
    expect(resetSearchTasks).toBeCalled();
    expect(resetSearchCommands).toBeCalled();

    // 正确的调试方式
    console.log(
      "resetSearchTasks 调用次数:",
      resetSearchTasks.mock.calls.length
    );
    console.log("resetSearchTasks 调用参数:", resetSearchTasks.mock.calls);
  });
});
