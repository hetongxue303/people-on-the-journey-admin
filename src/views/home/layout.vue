<script setup>
import {computed, ref} from 'vue'
import logo from '@assets/images/logo.png'
import {useRoute} from "vue-router";

const activeIndex = ref('/index')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
const changePath = (path) => {
    activeIndex.value = path
    window.location.href(path)
}
const isLayout = computed(() => useRoute().path !== '/login' || useRoute().path !== '/register')
</script>

<template>
    <div :class="isLayout?'home-content':'home-content-no'">
        <el-menu
            :default-active="activeIndex"
            class="navbar"
            mode="horizontal"
            :ellipsis="false"
            router
            @select="handleSelect"
        >
            <div class="home-logo-box" @click="changePath('/index')">
                <el-image :src="logo" fit="contain" class="home-logo"/>
            </div>
            <div class="flex-grow"/>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/travel-agency">旅行社</el-menu-item>
            <el-menu-item index="/food">美食</el-menu-item>
            <el-menu-item index="/scenic-spots">景区</el-menu-item>
            <el-menu-item index="/about">关于我们</el-menu-item>
        </el-menu>
        <router-view/>
        <!--        <el-carousel :interval="5000" arrow="always" height="500px">-->
        <!--            <el-carousel-item v-for="item in 4" :key="item">-->
        <!--                <h3>{{ item }}</h3>-->
        <!--            </el-carousel-item>-->
        <!--        </el-carousel>-->
    </div>
    <el-backtop :right="50" :bottom="50"/>
</template>

<style scoped lang="scss">
/* home */
.home-content {
    width: 100%;
    height: 1000px;
}

.home-content-no {
    width: 100%;
    height: 100vh;
}

/* navbar */
.flex-grow {
    flex-grow: 1;
}

.navbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    height: 50px;
    width: 100%;
    padding: 0 80px 0 80px;
}
</style>
