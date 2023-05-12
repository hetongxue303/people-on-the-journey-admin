<script setup>
import index1 from '@assets/images/index1.jpg'
import index2 from '@assets/images/index2.png'
import index3 from '@assets/images/index3.png'
import index4 from '@assets/images/index4.png'

import Panel from '@views/home/components/panel/index.vue'

const images = [index1, index2, index3, index4]
</script>

<template>
    <el-carousel :interval="2000" arrow="always" height="500px">
        <el-carousel-item v-for="item in images" :key="item">
            <el-image :src="item" fit="contain"/>
        </el-carousel-item>
    </el-carousel>
    <div class="content">
        <Panel title="旅社推荐" sub-title="常见的旅社">
            <template #content>
                content
            </template>
        </Panel>
        <Panel title="美食推荐" sub-title="常见的美食">
            <template #content>
                content
            </template>
        </Panel>
        <Panel title="景区推荐" sub-title="常见的景区">
            <template #content>
                content
            </template>
        </Panel>
        <div class="footer">
            footer内容
        </div>
    </div>

</template>

<style scoped lang="scss">
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
    width: 100%;
    height: 2160px;
    display: flex;
    flex-direction: column;
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
