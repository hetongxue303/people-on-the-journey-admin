<script setup>
import {ref} from "vue";

const img = ref('https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAgy7XrggYo5aeqrwMwiAQ45AU.jpg.webp')
</script>

<template>
    <div class="parent">
        <div class="panel">
            <div class="text-container">
                <div class="title">关于旅途</div>
                <div class="content">
                    随着旅游行业的发展，愈来愈多的人们愿意在经济条件允许的情况下去旅行，但人们在做旅行规划时特别是对于陌生的目的地而言，是最缺少有关信息的，所以这也成为了一个非常让大家困扰的问题。目前，很多人想得到更多的旅游目的地的信息只能在网页上进行搜索和阅读，该需求量非常大。然而这种方式存在着很大的局限性，尚未完全满足人们进行旅游规划时的需求。
                </div>
            </div>
            <el-image class="images" :src="img"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep([data-v-051739fd].el-main) {
    padding: 0;
    margin: 0;
}

.parent {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
}

.panel {
    width: 90%;
    height: 600px;
    background-color: #ccdcea;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 50px
}

.images {
    width: 530px;
    height: 700px;
}

.text-container {
    width: 34%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    right: 40px;
}

.title {
    color: white;
    font-size: 26px;
    letter-spacing: 4px;
    line-height: 50px;
}

.content {
    color: #0d2a42;
    letter-spacing: 4px;
    text-indent: 36px;
    line-height: 35px;
}
</style>
