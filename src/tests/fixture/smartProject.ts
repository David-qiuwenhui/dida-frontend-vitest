import { SmartProject, TasksSelectorType } from "@/storeNew";

export const generateSmartProject: () => SmartProject = () => ({
  name: "项目1",
  type: TasksSelectorType.smartProject,
});
