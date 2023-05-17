<script setup>
import logo from '@assets/images/index-bg.jpg'
import useUser from "../../store/modules/user.js";
</script>

<template style="margin: 0;padding: 0">
    <span style="font-size: 26px">你好，{{ useUser().getUserinfo.nickname }}！</span>
    <el-image :src="logo" style="margin-top: 5px"/>
</template>
