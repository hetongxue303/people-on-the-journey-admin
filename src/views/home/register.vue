<script setup>
import {reactive, ref} from "vue";

const form = ref({})
const dialogRules = reactive({username: [{required: true, message: '用户名不能为空', trigger: 'blur'}]})

</script>

<template>
    <el-form ref="dialogRef" :model="form" :rules="dialogRules" label-width="70">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="默认：123456" show-password/>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="scss">

</style>
