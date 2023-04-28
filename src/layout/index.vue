<script setup>
import Header from '@layout/components/header/index.vue'
import Aside from '@layout/components/aside/index.vue'
</script>

<template>
    <el-container>
        <el-aside>
            <Aside/>
        </el-aside>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
@import "@assets/styles/variables.module";

:deep(.el-aside) {
    width: $layout-aside-width;
    height: $layout-aside-height;
    background-color: #304156;
}

:deep(.el-header) {
    height: $layout-header-height;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

:deep(.el-main) {
    height: 100%;
    width: 100%;
}
</style>
