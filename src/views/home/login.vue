<script setup>
import bg from '@assets/images/index1.jpg'
import {reactive, ref} from "vue";

const form = ref({})
const dialogRules = reactive({username: [{required: true, message: '用户名不能为空', trigger: 'blur'}]})

</script>

<template>
    <el-image :src="bg"/>
    <div class="login-box">
        <el-form ref="dialogRef" :model="form" class="login-content" :rules="dialogRules" label-width="70">
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="默认：123456" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button type="success" style="width: 100%;">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang="scss">
.login-box {
}

.login-content {
    width: 400px;
    height: 200px;
    position: fixed;
    top: 40%;
    right: 2%;
    border: 1px solid #bbb0b0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
