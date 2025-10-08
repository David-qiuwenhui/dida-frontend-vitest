<template>
  <NConfigProvider :theme="themeStore.naiveTheme">
    <BaseLayout>
      <RouterView />
    </BaseLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import BaseLayout from "./layout/BaseLayout.vue";
import { useThemeStore } from "@/store";

const themeStore = useThemeStore();
</script>

<style scoped></style>
