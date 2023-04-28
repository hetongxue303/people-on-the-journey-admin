<script setup>
import {ref} from "vue";

const drawer = ref(false)
</script>

<template>
    <div class="header-setting" @click="drawer=true">
        <component is="icon-park-setting" :size="16"/>
    </div>
    <el-drawer
        v-model="drawer"
        direction="rtl"
        title="项目配置"
    >
        <span>全局配置待开发...</span>
    </el-drawer>
</template>

<style lang="scss" scoped>
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
</style>
