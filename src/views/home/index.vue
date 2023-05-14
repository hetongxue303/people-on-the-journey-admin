<script setup>
import indexBg from '@assets/images/index-bg.jpg'
import index1 from '@assets/images/index1.jpg'
import index2 from '@assets/images/index2.png'
import index3 from '@assets/images/index3.png'
import index4 from '@assets/images/index4.png'
import Share from "@views/home/components/panel/share.vue";

const images = [index1, index2, index3, index4]
</script>

<template>
    <!--    <el-carousel :interval="2000" arrow="always" height="500px">-->
    <!--        <el-carousel-item v-for="item in images" :key="item">-->
    <!--            <el-image :src="item" fit="contain"/>-->
    <!--        </el-carousel-item>-->
    <!--    </el-carousel>-->
    <el-image :src="indexBg" fit="fill"/>
    <div class="content">
        <Share/>
        <!--        <about/>-->
        <!--        <list/>-->
        <!--        <food/>-->
        <div class="footer">
            <div class="footer-link">
                <el-link :underline="false" type="default" disabled class="footer-link">人在旅途</el-link>
                |
                <el-link class="footer-link" :underline="false" type="info" href="/admin/login">管理员登录</el-link>
            </div>
            <div class="footer-content">
                <div>联系邮箱：xxx@qq.com</div>
                <div>QQ:14626463</div>
                <div>联系地址：xx市xx区xx街道</div>
                <div>联系电话：203-67865954</div>
            </div>
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
    color: rgb(102, 86, 69);
    width: 100%;
    height: 150px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #97a8be;
}

.footer-content {
    margin-top: 20px;
    display: flex;
    width: 70%;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
}

.footer-link {
    font-size: 12px;
}
</style>
