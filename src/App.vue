<script setup>
import {useRoute} from "vue-router";
import {getLocale} from "@/locales/index.js";
import {computed, watch} from "vue";
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {setBrowserTitle} from "@utils/common.js";

const route = useRoute()
const locale = computed(() => (getLocale() === 'en' ? en : zhCn))
watch(
    () => route.path,
    () => setBrowserTitle(),
    {deep: true}
)
</script>

<template>
    <el-config-provider :locale="locale">
        <router-view/>
    </el-config-provider>
</template>

<style scoped>
</style>
