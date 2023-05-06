<script setup>
import {ref} from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<template>
    <div class="home-content">
        <el-affix target=".affix-container" :offset="80">
            <el-menu
                :default-active="activeIndex"
                class="navbar"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
            >
                <div style="padding: 0;cursor: pointer">
                    <el-image style="height: 100%;width: 100px"/>
                </div>
                <div class="flex-grow"/>
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">旅行社</el-menu-item>
                <el-menu-item index="3">美食</el-menu-item>
                <el-menu-item index="4">景区</el-menu-item>
            </el-menu>
        </el-affix>
        <el-carousel :interval="5000" arrow="always" height="500px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div style=""></div>
    </div>
</template>

<style scoped lang="scss">
/* home */
.home-content {
    width: 100vw;
    height: 100vh;
}

/* navbar */
.flex-grow {
    flex-grow: 1;
}

.navbar {
    padding: 0 50px 0 50px;
}

/* carousel */
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
