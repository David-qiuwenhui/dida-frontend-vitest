import { it, expect, describe, vi, beforeEach, beforeAll } from "vitest";
import { useSearch } from "../search";
import { createTestingPinia } from "@pinia/testing";
import {
  completeSmartProject,
  TasksSelectorType,
  useListProjectsStore,
  useTasksStore,
} from "@/storeNew";
import {
  generateTasks,
  KEY_WORD_HOME,
  KEY_WORD_SETTING,
  TEST_COMMAND_HOME,
  TEST_COMMAND_SETTING,
} from "@/tests/fixture";
import { useSearchTasks } from "../searchTasks";
import { useCommand } from "@/composable/command";
import { useSearchCommands } from "../searchCommands";

/**
 * 群居测试
 */

describe("search", () => {
  beforeAll(() => {
    const { addCommand } = useCommand();
    addCommand({ name: TEST_COMMAND_HOME, execute: () => {} });
    addCommand({ name: TEST_COMMAND_SETTING, execute: () => {} });
  });

  beforeEach(() => {
    vi.useFakeTimers();

    // init pinia testing
    createTestingPinia({
      createSpy: vi.fn,
    });

    // mock task store
    const taskStore = useTasksStore();
    vi.mocked(taskStore.findAllTasksNotRemoved).mockImplementation(async () =>
      generateTasks()
    );

    const listProjectsStore = useListProjectsStore();
    vi.mocked(listProjectsStore.findProject).mockImplementation(
      (projectId) => ({
        id: projectId,
        name: `项目${projectId}`,
        type: TasksSelectorType.listProject,
      })
    );
  });

  describe("ui state", () => {
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
  });

  describe("search tasks", () => {
    it("should search tasks", async () => {
      const { search } = useSearch();
      const { filteredTasks } = useSearchTasks();

      search.value = "单元";
      await vi.runAllTimersAsync();

      expect(filteredTasks.value.length).toBe(1);
      expect(filteredTasks.value[0].item.title).toBe("编写单元测试用例");
    });

    it("should be search a tasks by title", async () => {
      const { search } = useSearch();
      const { filteredTasks } = useSearchTasks();

      search.value = "单元测试";
      await vi.runAllTimersAsync();

      expect(filteredTasks.value.length).toBe(1);
      // 验证数据结构
      const item = filteredTasks.value[0].item;
      expect(item.title).toBe("编写单元测试用例");
      expect(item).toHaveProperty("title", "编写单元测试用例");
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("desc");
    });

    it("should be search a tasks by desc", async () => {
      const { search } = useSearch();
      const { filteredTasks } = useSearchTasks();

      search.value = "分析用户需求";
      await vi.runAllTimersAsync();

      expect(filteredTasks.value.length).toBe(1);
      expect(filteredTasks.value[0].item.desc).toBe(
        "分析用户需求并制定开发计划"
      );
    });

    it("should not be found when the task does not exist", async () => {
      const { search } = useSearch();
      const { filteredTasks } = useSearchTasks();

      search.value = "调用方法";
      await vi.runAllTimersAsync();

      expect(filteredTasks.value.length).toBe(0);
    });

    it("should be task 's project is listProject when status is active", async () => {
      const { search } = useSearch();
      const { filteredTasks } = useSearchTasks();

      search.value = "完成项目需求分析";
      await vi.runAllTimersAsync();

      expect(filteredTasks.value[0].item?.done).toBe(false);
      expect(filteredTasks.value[0].item?.from?.type).toBe(
        TasksSelectorType.listProject
      );
    });

    it("should be task 's project is listProject when status is completed", async () => {
      const { search } = useSearch();
      const { filteredTasks } = useSearchTasks();
      search.value = "编写单元测试用例";
      await vi.runAllTimersAsync();

      expect(filteredTasks.value[0].item?.done).toBe(true);
      expect(filteredTasks.value[0].item?.from?.type).toBe(
        TasksSelectorType.smartProject
      );
      expect(filteredTasks.value[0].item?.from?.name).toBe(
        completeSmartProject.name
      );
    });

    it("should be reset tasks", async () => {
      const { search } = useSearch();
      const { filteredTasks, resetSearchTasks } = useSearchTasks();
      search.value = "完成项目需求分析";
      expect(filteredTasks.value.length).toBe(1);

      resetSearchTasks();
      expect(filteredTasks.value.length).toBe(0);
    });

    describe("search commands", () => {
      it("should be add a command", () => {
        const { commands } = useCommand();

        expect(commands.length).toBe(2);
        expect(commands[0].name).toBe(TEST_COMMAND_HOME);
        expect(
          commands.find((i) => i.name === TEST_COMMAND_HOME)
        ).toBeDefined();
      });

      it("should be search a command", async () => {
        const { search } = useSearch();
        const { filteredCommands } = useSearchCommands();
        search.value = `>${KEY_WORD_HOME}`;
        await vi.runAllTimersAsync();

        expect(filteredCommands.value.length).toBe(1);
        expect(filteredCommands.value[0].name).toBe(TEST_COMMAND_HOME);
      });

      it("should be search all commands", async () => {
        const { search } = useSearch();
        const { filteredCommands } = useSearchCommands();
        search.value = ">";
        await vi.runAllTimersAsync();

        expect(filteredCommands.value.length).toBe(2);
        expect(filteredCommands.value[0].name).toBe(TEST_COMMAND_HOME);
        expect(filteredCommands.value[1].name).toBe(TEST_COMMAND_SETTING);
      });

      it("should search commands after remove white space", async () => {
        const { search } = useSearch();
        const { filteredCommands } = useSearchCommands();
        search.value = `>${KEY_WORD_SETTING}      `;
        await vi.runAllTimersAsync();

        expect(filteredCommands.value.length).toBe(1);
        expect(filteredCommands.value[0].name).toBe(TEST_COMMAND_SETTING);
      });
    });

    describe("reset search", () => {
      it("should be reset tasks and commands", async () => {
        {
          const { search } = useSearch();
          const { filteredTasks } = useSearchTasks();
          const { filteredCommands } = useSearchCommands();

          search.value = "单元测试";
          await vi.runAllTimersAsync();
          search.value = `>${KEY_WORD_SETTING}`;
          await vi.runAllTimersAsync();
          search.value = "";
          await vi.runAllTimersAsync();

          expect(filteredTasks.value.length).toBe(0);
          expect(filteredCommands.value.length).toBe(2);
        }
      });
    });
  });
});
