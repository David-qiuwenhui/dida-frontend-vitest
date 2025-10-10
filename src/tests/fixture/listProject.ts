import { ListProject, TasksSelectorType } from "@/storeNew";

export const generateListProject: () => ListProject = () => ({
  id: "task_001",
  name: "项目1",
  type: TasksSelectorType.listProject,
});
