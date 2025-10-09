import Fuse from "fuse.js";
import { ref } from "vue";
import {
  TaskStatus,
  completeSmartProject,
  useListProjectsStore,
  useTasksStore,
} from "@/store";
import type { TasksSelector } from "@/store";

interface SearchTaskItem {
  id: string;
  title: string;
  desc: string;
  done: boolean;
  from: TasksSelector | undefined;
}

const filteredTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([]);
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ["title", "desc"],
});

/**
 * 搜索任务方法
 */
export function useSearchTasks() {
  /**
   * 搜索任务
   * @param input 搜索输入
   */
  async function searchTasks(input: string) {
    const tasksStore = useTasksStore();
    const projectsStore = useListProjectsStore();

    const tasks = await tasksStore.findAllTasksNotRemoved();
    const fuseTasks = tasks.map((task) => {
      const done = task.status === TaskStatus.COMPLETED;
      const from = done
        ? completeSmartProject
        : projectsStore.findProject(task.projectId);

      return {
        id: task.id!,
        title: task.title,
        desc: task.content,
        done,
        from,
      };
    });
    fuse.setCollection(fuseTasks);

    filteredTasks.value = fuse.search(input);
  }

  // 重置搜索任务
  function resetSearchTasks() {
    filteredTasks.value = [];
  }

  return {
    filteredTasks,
    searchTasks,
    resetSearchTasks,
  };
}
