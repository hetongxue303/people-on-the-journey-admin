<script setup>
import {ref, watch} from 'vue'
import logo from '@assets/images/logo.png'
import navbarData from "@views/home/data/data.js";
import {useRoute} from "vue-router";
import useUser from "@store/modules/user.js";

const active = ref('/index')
const changePath = (path) => {
    active.value = path
    window.location.href = path;
}
let route = useRoute()
watch(() => route.path, (path) => {
    console.log(path)
}, {deep: true})
</script>

<template>
    <div class="home-content">
        <el-menu
            :default-active="active"
            :ellipsis="false"
            class="navbar"
            mode="horizontal"
            router
        >
            <div class="home-logo-box" @click="changePath('/index')">
                <el-image :src="logo" class="home-logo" fit="contain"/>
            </div>
            <div class="flex-grow"/>
            <el-menu-item v-show="!(item.isLogin)" v-for="item in navbarData" :key="item" :index="item.path">
                {{ item.title }}
            </el-menu-item>
        </el-menu>
        <router-view/>
    </div>
    <el-backtop :bottom="50" :right="50"/>
</template>

<style lang="scss" scoped>
/* home */
.home-content {
    width: 100%;
    height: auto;
    background-color: aliceblue;
}

.home-content-no {
    width: 100%;
    height: 100vh;
}

/* navbar */
.navbar {
    //position: fixed;
    //top: 0;
    //right: 0;
    height: 50px;
    width: 100%;
    padding: 0 80px 0 80px;
    position: fixed;
    top: 0;
    z-index: 99;
}

.flex-grow {
    flex-grow: 1;
}

/* dropdown */
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

:deep(.el-backtop) {
    color: red;
}

// image
$images-upload-width: 200px;
$images-upload-height: 200px;
:deep(.images-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: $images-upload-width;
    height: $images-upload-height;

    &:hover {
        border-color: var(--el-color-primary);
    }
}

:deep(.el-upload-dragger) {
    padding: 0;
}

.images-upload-icon {
    color: #8c939d;
    text-align: center;
}

.images-box {
    width: $images-upload-width;
    height: $images-upload-height;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
