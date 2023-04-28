<script setup>
defineProps({
    menuData: {type: Array, default: [], required: true}
})
</script>

<template>
    <template v-for="(item, index) in menuData" :key="index">
        <!-- 有子组件时 -->
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                <component :is="item.icon" class="icon"/>
                <span>{{ item.title }}</span>
            </template>
            <MenuItem :menu-data="item.children"/>
        </el-sub-menu>
        <!-- 无子组件时 -->
        <el-menu-item v-else :index="item.path">
            <component :is="item.icon" class="icon"/>
            <template #title>{{ item.title }}</template>
        </el-menu-item>
    </template>
</template>

<style lang="scss" scoped>
:deep(.i-icon *) {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

//:deep(.el-menu-item) {
//    height: 50px;
//}
</style>
