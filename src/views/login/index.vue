<script setup>
import {useLogin} from "@views/login/hooks/useLogin.jsx";

const {loginForm, userLogin, loading, loginRef, loginRules} = useLogin()
</script>

<template>
    <div class="login-container">
        <el-form ref="loginRef"
                 :model="loginForm"
                 :rules="loginRules"
                 class="login-box"
                 hide-required-asterisk>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username"
                          :maxlength="20"
                          autofocus
                          clearable
                          placeholder="用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password"
                          :maxlength="20"
                          :minlength="6"
                          clearable
                          placeholder="密码"
                          show-password/>
            </el-form-item>
            <el-button type="primary"
                       @click="userLogin(loginRef)">
                <span v-if="!loading">登录</span>
                <span v-else>登陆中</span>
            </el-button>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
@import "@assets/styles/mixin";
@import "@assets/styles/variables.module";

.login-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #57C601 0%, #320049 100%), linear-gradient(121.28deg, #007762 0%, #5200FF 100%), linear-gradient(341.1deg, #FF0000 7.52%, #1700A4 77.98%), radial-gradient(49.82% 80.51% at 49.82% 50%, #820097 0%, #FF3D00 100%), radial-gradient(50% 72.12% at 50% 50%, #EB00FF 0%, #0B0037 100%);
    background-blend-mode: color-dodge, overlay, difference, difference, normal;
    @include displayFlex;
}

.login-box {
    padding: 55px 20px;
    width: 400px;
    height: 250px;
    background-color: white;
    border-radius: $global-border-radius;
}


:deep(.el-input__wrapper) {
    border-radius: 0;
}

:deep(.el-button) {
    width: 100%;
}
</style>
