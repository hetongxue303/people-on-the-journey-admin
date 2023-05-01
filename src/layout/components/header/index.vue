<script setup>
import {computed, ref} from "vue";
import {getLocale} from "@/locales/index.js";

const drawer = ref(false)
const local = computed(() => getLocale())
</script>

<template>
    <div class="header-setting" @click="drawer=true">
        <component is="icon-park-setting" :size="16"/>
    </div>
    <el-dropdown trigger="click">
        <component is="icon-park-translate" :size="18"/>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :class="local==='zh_cn'?'is-active':''">简体中文</el-dropdown-item>
                <el-dropdown-item :class="local==='en'?'is-active':''">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <el-drawer
        v-model="drawer"
        direction="rtl"
        title="项目配置"
    >
        <span>全局配置待开发...</span>
    </el-drawer>
</template>

<style lang="scss" scoped>
/* settings */
.header-setting {
    width: 40px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: rgb(246, 246, 246);
    }
}

/* locales */
.is-active {
    color: white;
    background-color: rgb(64, 158, 255);
}

:deep(.el-menu-item) {
    width: 150px;
    height: 32px;
}

:deep(.el-menu-item.is-active) {
    color: white;
    background-color: rgb(64, 158, 255);
}
</style>
