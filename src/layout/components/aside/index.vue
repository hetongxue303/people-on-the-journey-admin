<script setup>
import data from "@layout/data.js";
import MenuItem from "@layout/components/aside/components/menuItem.vue";
import variables from '@assets/styles/variables.module.scss'
</script>

<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :active-text-color="variables['layout-aside-active-text-color']"
                 :background-color="variables['layout-aside-background-color']"
                 :text-color="variables['layout-aside-text-color']"
                 :unique-opened="true"
                 default-active="/index"
                 router>
            <menuItem :menu-data="data"/>
        </el-menu>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
@import "@assets/styles/variables.module";

:deep(.el-menu) {
    width: $layout-aside-width-min;
    border-right: 0 !important;

    &:not(.el-menu--collapse) {
        width: $layout-aside-width;
    }
}

:deep(.el-menu-item.is-active) {
    background-color: $layout-aside-active-background-color
}

:deep(.el-scrollbar) {
    //height: calc(100% - $layout-header-height);
    height: 100%;
}

.scrollbar-wrapper {
    overflow-x: hidden !important;
}
</style>
