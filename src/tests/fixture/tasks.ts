import { TaskResponse } from "@/api/types";
import { TasksSelectorType, TaskStatus } from "@/storeNew";

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

// 模拟项目列表数据
export const liveListProject = [
  // 工作相关项目
  {
    id: "project_work_001",
    name: "工作项目",
    type: TasksSelectorType.listProject,
  },

  // 学习相关项目
  {
    id: "project_study_001",
    name: "学习计划",
    type: TasksSelectorType.listProject,
  },

  // 生活相关项目
  {
    id: "project_life_001",
    name: "日常生活",
    type: TasksSelectorType.listProject,
  },

  // 技术学习项目
  {
    id: "project_tech_001",
    name: "技术学习",
    type: TasksSelectorType.listProject,
  },

  // 健身健康项目
  {
    id: "project_health_001",
    name: "健身计划",
    type: TasksSelectorType.listProject,
  },

  // 阅读项目
  {
    id: "project_reading_001",
    name: "阅读清单",
    type: TasksSelectorType.listProject,
  },

  // 旅行计划项目
  {
    id: "project_travel_001",
    name: "旅行计划",
    type: TasksSelectorType.listProject,
  },

  // 购物清单项目
  {
    id: "project_shopping_001",
    name: "购物清单",
    type: TasksSelectorType.listProject,
  },

  // 个人发展项目
  {
    id: "project_personal_001",
    name: "个人发展",
    type: TasksSelectorType.listProject,
  },

  // 财务规划项目
  {
    id: "project_finance_001",
    name: "财务规划",
    type: TasksSelectorType.listProject,
  },
];

// 模拟任务响应数据
export const generateResponseTask = () => mockTaskResponses;
const mockTaskResponses: TaskResponse[] = [
  // 活跃任务 - 工作相关
  {
    title: "完成项目需求分析",
    content: "分析用户需求并制定开发计划，包括功能规格说明和技术方案",
    status: TaskStatus.ACTIVE,
    projectId: "project_work_001",
    position: 1,
    _id: "task_001",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T14:20:00.000Z",
  },

  // 已完成任务 - 学习相关
  {
    title: "学习 Vue 3 组合式 API",
    content: "掌握 Vue 3 的组合式 API 和响应式系统",
    status: TaskStatus.COMPLETED,
    projectId: "project_study_001",
    position: 2,
    _id: "task_002",
    createdAt: "2024-01-14T09:15:00.000Z",
    updatedAt: "2024-01-14T16:45:00.000Z",
  },

  // 活跃任务 - 生活相关
  {
    title: "购买生活用品",
    content: "去超市购买牛奶、面包、水果等日常用品",
    status: TaskStatus.ACTIVE,
    projectId: "project_life_001",
    position: 3,
    _id: "task_003",
    createdAt: "2024-01-16T08:00:00.000Z",
    updatedAt: "2024-01-16T08:00:00.000Z",
  },

  // 已删除任务
  {
    title: "整理旧照片",
    content: "整理电脑中的旧照片并备份到云盘",
    status: TaskStatus.REMOVED,
    projectId: "project_life_002",
    position: 4,
    _id: "task_004",
    createdAt: "2024-01-10T15:30:00.000Z",
    updatedAt: "2024-01-12T11:20:00.000Z",
  },

  // 活跃任务 - 技术学习
  {
    title: "编写单元测试用例",
    content: "为搜索功能编写完整的测试用例，覆盖边界情况",
    status: TaskStatus.ACTIVE,
    projectId: "project_work_002",
    position: 5,
    _id: "task_005",
    createdAt: "2024-01-17T13:45:00.000Z",
    updatedAt: "2024-01-17T15:30:00.000Z",
  },

  // 已完成任务 - 健身相关
  {
    title: "完成本周健身计划",
    content: "完成3次力量训练和2次有氧运动",
    status: TaskStatus.COMPLETED,
    projectId: "project_health_001",
    position: 6,
    _id: "task_006",
    createdAt: "2024-01-08T07:00:00.000Z",
    updatedAt: "2024-01-14T20:00:00.000Z",
  },

  // 活跃任务 - 阅读相关
  {
    title: "阅读《JavaScript高级程序设计》",
    content: "完成第10-12章的阅读和笔记整理",
    status: TaskStatus.ACTIVE,
    projectId: "project_study_002",
    position: 7,
    _id: "task_007",
    createdAt: "2024-01-13T19:30:00.000Z",
    updatedAt: "2024-01-16T21:15:00.000Z",
  },
];
