import { beforeEach, it, expect, describe, vi } from "vitest";
import { Task, TaskStatus, useTasksStore } from "../tasks";
import { createPinia, setActivePinia } from "pinia";
import {
  fetchAllTasks,
  fetchCompleteTask,
  fetchCreateTask,
  fetchMoveTaskToProject,
  fetchRemoveTask,
  fetchRestoreTask,
} from "@/api";
import { generateListProject, generateSmartProject } from "@/tests/fixture";
import { useTasksSelectorStore } from "../tasksSelector";

let id = 0;
let position = 0;
const createResponseTask = (title: string) => {
  return {
    title,
    content: "分析用户需求并制定开发计划，包括功能规格说明和技术方案",
    status: TaskStatus.ACTIVE,
    projectId: "project_work_001",
    position: position++,
    _id: `task_${id++}`,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T14:20:00.000Z",
  };
};

vi.mock("@/api");
vi.mocked(fetchCreateTask).mockImplementation(async (title: string) => {
  return createResponseTask(title);
});
vi.mocked(fetchAllTasks).mockResolvedValue([]);

describe("useTasksStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // init pinia
    setActivePinia(createPinia());

    // 清空数据状态
    id = 0;
    position = 0;
    vi.clearAllMocks();
    // vi.mocked(fetchCreateTask).mockClear();
  });

  describe("add task", () => {
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

  it("should be remove task", async () => {
    const tasksStore = useTasksStore();
    const tasksSelectorStore = useTasksSelectorStore();
    tasksSelectorStore.currentSelector = generateListProject();

    const SEARCH_TITLE = "test task";
    const task = await tasksStore.addTask(SEARCH_TITLE);

    await tasksStore.removeTask(task!);
    await vi.runAllTimersAsync();

    // 1. 验证行为
    expect(fetchRemoveTask).toBeCalledWith(task!.id);
    // 2. 验证数据状态
    expect(tasksStore.tasks).toHaveLength(0);
    expect(tasksStore.currentActiveTask).toBeUndefined();
  });

  it("should be complete task", async () => {
    const tasksStore = useTasksStore();
    const tasksSelectorStore = useTasksSelectorStore();
    tasksSelectorStore.currentSelector = generateListProject();

    const SEARCH_TITLE = "test task";
    const task = await tasksStore.addTask(SEARCH_TITLE);

    await tasksStore.completeTask(task!);
    await vi.runAllTimersAsync();

    // 1. 验证行为
    expect(fetchCompleteTask).toBeCalledWith(task!.id);
    // 2. 验证数据状态
    expect(tasksStore.tasks).toHaveLength(0);
    expect(tasksStore.currentActiveTask).toBeUndefined();
  });

  it("should be restore task", async () => {
    const tasksStore = useTasksStore();
    const tasksSelectorStore = useTasksSelectorStore();
    tasksSelectorStore.currentSelector = generateListProject();

    const SEARCH_TITLE = "test task";
    const task = await tasksStore.addTask(SEARCH_TITLE);
    await tasksStore.restoreTask(task!);
    await vi.runAllTimersAsync();

    // 1. 验证行为
    expect(fetchRestoreTask).toBeCalledWith(task!.id);
    // 2. 验证数据状态
    expect(tasksStore.tasks).toHaveLength(0);
  });

  it("should be move task to project", async () => {
    const tasksStore = useTasksStore();
    const tasksSelectorStore = useTasksSelectorStore();
    tasksSelectorStore.currentSelector = generateListProject();

    const SEARCH_TITLE = "test task";
    const PROJECT_ID = "id1";
    const task = await tasksStore.addTask(SEARCH_TITLE);
    await tasksStore.moveTaskToProject(task!, PROJECT_ID);
    await vi.runAllTimersAsync();

    // 1. 验证行为
    expect(fetchMoveTaskToProject).toBeCalledWith(task!.id, PROJECT_ID);
    // 2. 验证数据状态
    expect(tasksStore.tasks).toHaveLength(0);
  });

  it("should be update tasks", async () => {
    const tasksStore = useTasksStore();
    const task = [createResponseTask("update task")];
    await tasksStore.updateTasks(task);
    await vi.runAllTimersAsync();

    // 1. 验证数据状态
    expect(tasksStore.tasks).toHaveLength(1);
    expectTaskDataStructure(tasksStore.tasks[0]);
  });

  describe("changeActiveTask", () => {
    it("should change active task by id", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      const SEARCH_TITLE = "test task";
      const task = await tasksStore.addTask(SEARCH_TITLE);
      await tasksStore.changeActiveTask(task!.id);
      await vi.runAllTimersAsync();

      expect(tasksStore.currentActiveTask).toEqual(task);
    });

    it("should change active task by task", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      const SEARCH_TITLE = "test task";
      const task = await tasksStore.addTask(SEARCH_TITLE);
      await tasksStore.changeActiveTask(task!);
      await vi.runAllTimersAsync();

      expect(tasksStore.currentActiveTask).toEqual(task);
    });
  });

  it("should find all task not remove", async () => {
    const tasksStore = useTasksStore();
    const tasksSelectorStore = useTasksSelectorStore();
    tasksSelectorStore.currentSelector = generateListProject();
    const SEARCH_TITLE = "test task";
    const task = await tasksStore.addTask(SEARCH_TITLE);

    const allTasks = await tasksStore.findAllTasksNotRemoved();
    vi.runAllTimersAsync();

    expect(fetchAllTasks).toBeCalledTimes(2);
    expect(fetchAllTasks).toBeCalledWith({
      status: TaskStatus.ACTIVE,
    });
    expect(fetchAllTasks).toBeCalledWith({
      status: TaskStatus.COMPLETED,
    });
  });

  describe("cancel complete task", () => {
    it("should be cancel complete task", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      // add task
      await tasksStore.addTask("task0");
      const task = await tasksStore.addTask("task1");
      await tasksStore.addTask("task2");

      // complete task
      await tasksStore.completeTask(task!);
      // cancel complete task
      await tasksStore.cancelCompleteTask(task!);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchRestoreTask).toBeCalledWith(task!.id);

      // 2. 验证数据状态
      expect(tasksStore.tasks).toHaveLength(3);
      expect(tasksStore.tasks[1]).toEqual(task);
    });

    it("should be cancel complete the first task", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      // add task
      await tasksStore.addTask("task0");
      await tasksStore.addTask("task1");
      const task = await tasksStore.addTask("task2");

      // complete task
      await tasksStore.completeTask(task!);
      // cancel complete task
      await tasksStore.cancelCompleteTask(task!);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchRestoreTask).toBeCalledWith(task!.id);

      // 2. 验证数据状态
      expect(tasksStore.tasks).toHaveLength(3);
      expect(tasksStore.tasks[0]).toEqual(task);
      expect(tasksStore.tasks[0].status).toEqual(TaskStatus.ACTIVE);
    });

    it("should be cancel complete the last task", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      // add task
      const task = await tasksStore.addTask("task0");
      await tasksStore.addTask("task1");
      await tasksStore.addTask("task2");

      // complete task
      await tasksStore.completeTask(task!);
      // cancel complete task
      await tasksStore.cancelCompleteTask(task!);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchRestoreTask).toBeCalledWith(task!.id);

      // 2. 验证数据状态
      expect(tasksStore.tasks).toHaveLength(3);
      expect(tasksStore.tasks[2]).toEqual(task);
      expect(tasksStore.tasks[2].status).toEqual(TaskStatus.ACTIVE);
    });

    it("should be cancel complete the only one task", async () => {
      const tasksStore = useTasksStore();
      const tasksSelectorStore = useTasksSelectorStore();
      tasksSelectorStore.currentSelector = generateListProject();

      // add task
      const task = await tasksStore.addTask("task0");

      // complete task
      await tasksStore.completeTask(task!);
      // cancel complete task
      await tasksStore.cancelCompleteTask(task!);
      await vi.runAllTimersAsync();

      // 1. 验证行为
      expect(fetchRestoreTask).toBeCalledWith(task!.id);

      // 2. 验证数据状态
      expect(tasksStore.tasks).toHaveLength(1);
      expect(tasksStore.tasks[0]).toEqual(task);
      expect(tasksStore.tasks[0].status).toEqual(TaskStatus.ACTIVE);
    });
  });
});

// 验证Task的数据结构
function expectTaskDataStructure(task: Task) {
  expect(task).toHaveProperty("id");
  expect(task).toHaveProperty("title");
  expect(task).toHaveProperty("content");
  expect(task).toHaveProperty("status");
  expect(task).toHaveProperty("projectId");
  expect(task).toHaveProperty("position");
}
