<script setup>
defineProps({
    title: {required: true, type: String},
    subTitle: {required: false, type: String, default: ''},
    backgroundColor: {required: false, type: String, default: '#99a9bf'}
})
</script>

<template>
    <div class="parent">
        <div class="panel" :style="{backgroundColor:backgroundColor}">
            <span class="title">{{ title }}</span>
            <span class="sub-title">{{ subTitle }}</span>
        </div>
        <div class="content">
            <slot name="content"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
$panel-height: 50px;
$panel-margin: 10px;
$content-height: 600px;
$border-radius: 10px;
$common-width: 95%;

@mixin dis-flex {
    display: flex;
    align-items: center;
}

.parent {
    width: 100%;
    height: $panel-height + $content-height;
    flex-direction: column;
    @include dis-flex;
}

.panel {
    margin: $panel-margin 0 $panel-margin 0;
    height: $panel-height;
    width: $common-width;
    padding: 0 50px 0 50px;
    border-radius: $border-radius;
    @include dis-flex;

    .title {
        font-size: 16px;
        font-weight: bold;
        color: white;
    }

    .sub-title {
        margin: 15px 0 0 45px;
        font-size: 10px;
        color: #f3f3f3;
    }
}

.content {
    width: $common-width;
    height: $content-height;
    border-radius: $border-radius;
    background-color: #8593a6;
    display: flex;
    justify-content: center;
}
</style>
