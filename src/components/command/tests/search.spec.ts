import { it, expect, describe, vi } from "vitest";
import { useSearch } from "../search";

// 模拟搜索任务
vi.mock("../searchTasks", () => ({
  useSearchTasks: () => ({
    searchTasks: () => {},
  }),
}));

describe("useSearch", () => {
  it("should be loading is true when search is start", async () => {
    vi.useFakeTimers();
    const { loading, search } = useSearch();
    search.value = "mock";
    await vi.advanceTimersToNextTimerAsync();

    expect(loading.value).toBe(true);
  });

  it("should be loading is false when search is end", async () => {
    vi.useFakeTimers();
    const { loading, search } = useSearch();
    search.value = "mock";
    await vi.runAllTimersAsync();

    expect(loading.value).toBe(false);
  });
});
