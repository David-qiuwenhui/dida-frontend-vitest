<script setup lang="ts">
import { NEmpty, NInput, NSkeleton } from "naive-ui";
import { computed, ref, watch } from "vue";
import { watchDebounced } from "@vueuse/core";
import Search from "./search/Search.vue";
import Commands from "./commands/Commands.vue";

// 搜索任务或搜索命令的组件引用
const compRef = ref<InstanceType<typeof Search | typeof Commands>>();

// 搜索词
const searchWord = ref("");
// 加载状态
const loading = ref(false);
// 重置状态
const isReset = ref(true);

// 组件和搜索处理函数
const ComponentsAndSearchHandles = {
  search: [
    // 搜索组件
    Search,
    async (v: string) => {
      // base case: 去除搜索前缀后缀空格
      const str = v.trim();
      if (!str) {
        return;
      }
      loading.value = true;
      // 调用搜索组件的搜索方法
      await compRef.value!.handleSearch(str);
      // 模拟搜索延迟
      await new Promise((resolve) => setTimeout(resolve, 700));
      loading.value = false;
    },
  ],
  commands: [
    // 命令组件
    Commands,
    async (v: string) => {
      // base case: 去除命令前缀
      const str = v.slice(1).trim();
      if (!str) {
        return;
      }

      await compRef.value!.handleSearch(v);
    },
  ],
} as const;

// 计算属性：根据搜索词判断显示哪个组件和处理函数
const showComponentAndHandle = computed(() =>
  searchWord.value.startsWith(">")
    ? ComponentsAndSearchHandles.commands
    : ComponentsAndSearchHandles.search
);

// 监听搜索词变化，触发搜索处理函数
watchDebounced(
  () => searchWord.value,
  async (v) => {
    if (!v) {
      return;
    }

    if (isReset.value) {
      isReset.value = false;
    }
    // 调用对应的搜索处理函数
    const HANDLER_INDEX = 1;
    await showComponentAndHandle.value[HANDLER_INDEX](v);
  },
  { debounce: 500 }
);

// 监听搜索词变化，清空组件状态
watch(
  () => searchWord.value,
  (v) => {
    if (v === "") {
      isReset.value = true;
      compRef.value?.clear();
    }
  }
);

// 暴露方法：重置搜索词和状态
defineExpose({
  reset() {
    searchWord.value = "";
    isReset.value = true;
  },
});
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <NInput
      v-model:value="searchWord"
      placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式"
      clearable
    />
    <div class="mt-6">
      <NEmpty v-show="isReset" description="搜索任务，标签或查看命令。">
        <template #icon />
      </NEmpty>
      <div v-show="!isReset">
        <!-- Skeleton -->
        <div v-if="loading">
          <NSkeleton text :repeat="2" />
          <NSkeleton text style="width: 60%" />
        </div>
        <!-- 搜索任务或搜索命令组件 -->
        <component :is="showComponentAndHandle[0]" v-else ref="compRef" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
