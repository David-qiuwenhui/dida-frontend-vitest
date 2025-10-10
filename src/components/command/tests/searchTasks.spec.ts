import { it, expect, describe, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
// 然后导入被模拟的模块
import { useSearchTasks } from "../searchTasks";
import {
  completeSmartProject,
  TasksSelectorType,
  useListProjectsStore,
  useTasksStore,
} from "@/storeNew";
import { generateTasks } from "@/tests/fixture";
import { generateListProject } from "@/tests/fixture/listProject";

// 先模拟所有依赖
// vi.mock("../searchTasks", () => ({
//   useSearchTasks: vi.fn().mockReturnValue({
//     searchTasks: vi.fn(),
//     filteredTasks: { value: [{ item: { id: "1", title: "mock task" } }] },
//     resetSearchTasks: vi.fn(),
//   }),
// }));

describe("search tasks", () => {
  beforeEach(() => {
    // 重置搜索任务
    const { resetSearchTasks } = useSearchTasks();
    resetSearchTasks();

    // 创建测试pinia实例
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    });
    setActivePinia(pinia);

    // 模拟任务store的数据搜索结果
    const tasksStore = useTasksStore();
    vi.mocked(tasksStore.findAllTasksNotRemoved).mockImplementation(async () =>
      generateTasks()
    );

    const listProjectsStore = useListProjectsStore();
    vi.mocked(listProjectsStore.findProject).mockImplementation(() => {
      return generateListProject();
    });

    // 重置所有模拟
    vi.clearAllMocks();
  });

  it("should be search a tasks by title", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();
    // 调用方法
    await searchTasks("单元测试");

    expect(filteredTasks.value.length).toBe(1);
    const item = filteredTasks.value[0].item;
    expect(item.title).toBe("编写单元测试用例");
    expect(item).toHaveProperty("title", "编写单元测试用例");
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("desc");
  });

  it("should be search a tasks by desc", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();
    // 调用方法
    await searchTasks("分析用户需求");

    expect(filteredTasks.value.length).toBe(1);
  });

  it("should not be found when the task does not exist", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();
    // 调用方法
    await searchTasks("abc");
    expect(filteredTasks.value.length).toBe(0);
  });

  it("should be task 's project is listProject when status is active", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();
    // 调用方法
    await searchTasks("完成项目需求分析");
    expect(filteredTasks.value[0].item?.done).toBe(false);
    expect(filteredTasks.value[0].item?.from?.type).toBe(
      TasksSelectorType.listProject
    );
  });

  it("should be task 's project is listProject when status is completed", async () => {
    const { searchTasks, filteredTasks } = useSearchTasks();
    // 调用方法
    await searchTasks("编写单元测试用例");

    expect(filteredTasks.value[0].item?.done).toBe(true);
    expect(filteredTasks.value[0].item?.from?.type).toBe(
      TasksSelectorType.smartProject
    );
    expect(filteredTasks.value[0].item?.from?.name).toBe(
      completeSmartProject.name
    );
  });

  it("should be reset tasks", async () => {
    const { searchTasks, resetSearchTasks, filteredTasks } = useSearchTasks();
    await searchTasks("完成项目需求分析");
    expect(filteredTasks.value.length).toBe(1);

    resetSearchTasks();
    expect(filteredTasks.value.length).toBe(0);
  });
});
