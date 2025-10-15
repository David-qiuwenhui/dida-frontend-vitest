import { beforeEach, it, expect, describe, vi } from "vitest";
import { TaskStatus, useTasksStore } from "../tasks";
import { createPinia, setActivePinia } from "pinia";
import { fetchCreateTask } from "@/api";
import { generateListProject, generateSmartProject } from "@/tests/fixture";
import { useTasksSelectorStore } from "../tasksSelector";

vi.mock("@/api");
vi.mocked(fetchCreateTask).mockImplementation(async (title: string) => {
  return {
    title,
    content: "分析用户需求并制定开发计划，包括功能规格说明和技术方案",
    status: TaskStatus.ACTIVE,
    projectId: "project_work_001",
    position: 1,
    _id: "task_001",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T14:20:00.000Z",
  };
});

describe("useTasksStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // init pinia
    setActivePinia(createPinia());

    // 清空数据状态
    vi.clearAllMocks();
    // vi.mocked(fetchCreateTask).mockClear();
  });

  describe("addTask", () => {
    it("should be add a task", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      const SEARCH_TITLE = "test task";
      const task = await tasksStore.addTask(SEARCH_TITLE);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchCreateTask).toBeCalledWith(
        SEARCH_TITLE,
        tasksSelectorStore.currentSelector.id
      );
      // 2. 验证数据状态
      expect(tasksStore.tasks[0]).toStrictEqual(task);
      expect(tasksStore.currentActiveTask).toStrictEqual(task);
      // 3. 验证返回值
      expect(task!.title).toBe(SEARCH_TITLE);
    });

    it("should be add task to be first position", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      const SEARCH_TITLE = "test task";
      const SEARCH_TITLE_NEW = "test task new";
      const task = await tasksStore.addTask(SEARCH_TITLE);
      const task2 = await tasksStore.addTask(SEARCH_TITLE_NEW);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchCreateTask).toHaveBeenCalledTimes(2);
      // 2. 验证数据状态
      expect(tasksStore.tasks[0]).toStrictEqual(task2);
      expect(tasksStore.currentActiveTask).toStrictEqual(task2);
      // 3. 验证返回值
      expect(task!.title).toBe(SEARCH_TITLE);
      expect(task2!.title).toBe(SEARCH_TITLE_NEW);
    });

    it("should be not add a task when currentSelector is undefined", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = undefined;

      const SEARCH_TITLE = "test task";
      const task = await tasksStore.addTask(SEARCH_TITLE);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchCreateTask).not.toBeCalled();
      // 2. 验证数据状态
      expect(tasksStore.tasks.length).toBe(0);
      expect(tasksStore.currentActiveTask).toBeUndefined();
      // 3. 验证返回值
      expect(task).toBeUndefined();
    });

    it("should be not add a task when the type of currentSelector is ", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateSmartProject();

      const SEARCH_TITLE = "test task";
      const task = await tasksStore.addTask(SEARCH_TITLE);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchCreateTask).not.toBeCalled();
      // 2. 验证数据状态
      expect(tasksStore.tasks.length).toBe(0);
      expect(tasksStore.currentActiveTask).toBeUndefined();
      // 3. 验证返回值
      expect(task).toBeUndefined();
    });
  });
});
