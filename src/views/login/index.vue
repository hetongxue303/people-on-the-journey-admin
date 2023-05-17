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
            <el-form-item style="margin: 0;padding: 0;display: flex;justify-content: center;align-items: center;width: 100%;height: 70px;flex-direction: column">
                <div style="width: 50px;height: 1px;background-color: #a9afb7;margin-right: 10px"/>
                <div style="font-size: 24px;color: #0d2a42">欢迎回来</div>
                <div style="width: 50px;height: 1px;background-color: #a9afb7;margin-left: 10px"/>
            </el-form-item>
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
            <div class="back-home">
                <el-link href="/index" :underline="false" type="primary">返回首页</el-link>
            </div>
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
    padding: 0 20px 55px 20px;
    width: 400px;
    height: 240px;
    background-color: rgba(255, 255, 255);
    border-radius: $global-border-radius;
}

:deep(.el-input__wrapper) {
    border-radius: 0;
}


:deep(.el-button) {
    width: 100%;
}

.back-home {
    position: relative;
    top: 7px;
    left: 306px;
}

:deep(.el-link) {
    font-size: 13px;
    font-weight: 600;
}
</style>
