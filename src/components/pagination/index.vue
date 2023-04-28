<script setup>
defineProps({
    current: {type: Number, required: true},
    size: {type: Number, required: true},
    total: {type: Number, required: true},
    small: {type: Boolean, required: false, default: true},
    disabled: {type: Boolean, required: false, default: false},
    background: {type: Boolean, required: false, default: true},
    layout: {type: String, required: false, default: 'jumper,prev,pager,next,sizes,total'},
    sizes: {type: Array, required: false, default: [10, 15, 20, 30, 50]},
    prevText: {type: String, required: false, default: ''},
    nextText: {type: String, required: false, default: ''},
    hideOnSinglePage: {type: Boolean, required: false, default: false}
})

const emit = defineEmits(['change-current', 'change-size'])
const changeCurrent = (value) => emit('change-current', value)
const changeSize = (value) => emit('change-size', value)
</script>

<template>
    <el-pagination
        class="pagination"
        :current-page="current"
        :page-size="size"
        :total="total"
        :page-sizes="sizes"
        :small="small"
        :disabled="disabled"
        :background="background"
        :layout="layout"
        :prev-text="prevText"
        :next-text="nextText"
        :hide-on-single-page="hideOnSinglePage"
        @size-change="changeSize"
        @current-change="changeCurrent"
    />
</template>

<style scoped lang="scss">
.pagination {
    @apply m-p-10px;
}
</style>
