import { TaskStatus } from "@/storeNew";

export const generateTasks = () => [
  {
    id: "task_001",
    title: "完成项目需求分析",
    status: TaskStatus.ACTIVE,
    content: "分析用户需求并制定开发计划",
    projectId: "project_001",
    position: 1,
  },
  {
    id: "task_002",
    title: "编写单元测试用例",
    status: TaskStatus.COMPLETED,
    content: "为搜索功能编写完整的测试用例",
    projectId: "project_002",
    position: 2,
  },
];
