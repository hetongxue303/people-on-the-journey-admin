<script setup>
import index1 from '@assets/images/index1.jpg'
import index2 from '@assets/images/index2.png'
import index3 from '@assets/images/index3.png'
import index4 from '@assets/images/index4.png'
import About from "@views/home/components/panel/about.vue";
import List from "@views/home/components/panel/list.vue";
import Food from "@views/home/components/panel/food.vue";

const images = [index1, index2, index3, index4]
</script>

<template>
    <!--    <el-carousel :interval="2000" arrow="always" height="500px">-->
    <!--        <el-carousel-item v-for="item in images" :key="item">-->
    <!--            <el-image :src="item" fit="contain"/>-->
    <!--        </el-carousel-item>-->
    <!--    </el-carousel>-->
    <el-image :src="index2"/>
    <div class="content">
        <about/>
        <list/>
        <food/>
        <div style="display: flex;justify-content: center;align-items: center;width: 100%;height:900px;background-color: rgb(19, 22, 37)">

        </div>

        <div class="footer">
            footer内容
        </div>
    </div>

</template>

<style lang="scss" scoped>
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

/* content */
.content {
    margin-top: -6px;
    width: 100%;
    height: 2500px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* footer */
.footer {
    width: 100%;
    height: 200px;
    margin: 10px 0 0 0;
    background-color: #409eff;
    border-radius: 10px 10px 0 0;
}
</style>
