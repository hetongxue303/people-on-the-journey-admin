<script setup>

</script>

<template>
    <div class="parent">

        <div class="title">美食推荐</div>

        <div class="panel">
            <div class="mr-20px card-box">
                <el-image src="https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAg6rb1ggYoufXIxgYwgAM4uAM.jpg.webp"/>
                <div class="desc-box">
                    <div class="desc-box-title">美食1</div>
                    <div class="desc-box-content">美食1介绍</div>
                </div>
            </div>

            <div class="mr-20px card-box">
                <el-image src="https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAggOn1ggYo7Om4bzCAAzi4Aw.jpg.webp"/>
                <div class="desc-box">
                    <div class="desc-box-title">美食2</div>
                    <div class="desc-box-content">美食2介绍</div>
                </div>
            </div>

            <div class="card-box">
                <el-image src="https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAgxuj1ggYo0ume6gUwgAM4uAM.jpg.webp"/>
                <div class="desc-box">
                    <div class="desc-box-title">美食3</div>
                    <div class="desc-box-content">美食3介绍</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.parent {
    padding-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 900px;
    background-color: rgb(22, 21, 39);
    flex-direction: column;
}

.title {
    color: white;
    font-size: 26px;
    padding: 10px 0 30px 0;
}

.panel {
    display: flex;
    justify-content: center;
}

.desc-box {
    padding: 20px 0 20px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .desc-box-title {
        color: white
    }

    .desc-box-content {
        color: rgb(148, 150, 161);
        font-size: 10px;
    }
}

.card-box {
    width: 384px;
    height: 530px;
    transition: all ease-in-out 0.3s;
}

.card-box:hover {
    width: 388;
    transition: all ease-in-out 0.3s;
}
</style>
