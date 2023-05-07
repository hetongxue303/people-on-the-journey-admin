<script setup>
import {reactive, ref} from 'vue'
import logo from '@assets/images/logo.png'
import {login, register} from "@/api/auth.js";
import {ElNotification} from "element-plus";
import {setToken, setTokenTime} from "@utils/common.js";
import {useLogin} from "@views/login/hooks/useLogin.js";
import navbarData from "@views/home/data/data.js";

const activeIndex = ref('/index')
const changePath = (path) => {
    activeIndex.value = path
    window.location.href(path)
}
const loginDialog = ref(false)
const openDialog = (oop) => {
    if (oop === 'L') {
        title.value = '用户登录'
    } else {
        title.value = '用户注册'
    }
    status.value = oop
    loginDialog.value = true
}
const {encryptPasswordByMD5} = useLogin()
const loading = ref(false)
const con = ref(null)
const dialogRef = ref(null)
const loginFrom = reactive({})
const title = ref('')
const status = ref('')
const confirmPassword = ref('')
const dialogRules = reactive({
    username: [{required: true, message: '请输入账号', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
})
const userOOP = async (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            if (status.value === 'L') {
                login({username: loginFrom.username, password: encryptPasswordByMD5(loginFrom.password)})
                    .then(({data, status}) => {
                        if (data.code === 200 && status === 200) {
                            ElNotification.success('登陆成功')
                            setToken(data.data.value, data.data.timeout)
                            setTokenTime(data.data.timeout)
                            window.location.reload()
                            return
                        }
                        ElNotification.error(data.message || '登陆失败，请重新登录')
                    })
                    .finally(() => loading.value = false)
            } else {
                if (loginFrom.password !== confirmPassword.value) {
                    ElNotification.warning('密码不一致')
                    con.value.focus()
                    return
                }
                register({username: loginFrom.username, password: encryptPasswordByMD5(loginFrom.password)})
                    .then(({data}) => {
                        if (data.code === 200) {
                            ElNotification.success('注册成功,请登录！')
                            status.value = 'L'
                            return
                        }
                        ElNotification.error(data.message || '注册失败，请重新注册')
                    })
                    .finally(() => loading.value = false)
            }
        }
    })
}
</script>

<template>
    <el-dialog v-model="loginDialog"
               :close-on-click-modal="false"
               :title="title"
               align-center
               class="dialog-common"
               destroy-on-close
               width="30%">
        <el-form ref="dialogRef" :label-width="status==='R'?80:60" :model="loginFrom" :rules="dialogRules" class="login-content">
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginFrom.username" style="width: 300px"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginFrom.password" show-password style="width: 300px"/>
            </el-form-item>
            <el-form-item v-if="status==='R'" label="确认密码" prop="confirmPassword">
                <el-input ref="con" v-model="confirmPassword" show-password style="width: 300px"/>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 300px" type="success" @click="userOOP(dialogRef)">
                    {{ status === 'R' ? '注册' : '登录' }}
                </el-button>
            </el-form-item>
            <el-form-item :style="{marginLeft:'240px'}">
                <el-button v-if="status==='L'" size="small" text type="primary" @click="openDialog('R')">
                    立即注册
                </el-button>
                <el-button v-else size="small" text type="primary" @click="openDialog('L')">返回登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <div class="home-content">
        <el-menu
            :default-active="activeIndex"
            :ellipsis="false"
            class="navbar"
            mode="horizontal"
            router
        >
            <div class="home-logo-box" @click="changePath('/index')">
                <el-image :src="logo" class="home-logo" fit="contain"/>
            </div>
            <div class="flex-grow"/>
            <div style="display: flex;justify-content: center;align-items: center;margin-right: 10px">
                <el-button text type="success" @click="openDialog('L')">登录</el-button>
                <el-button text type="primary" @click="openDialog('R')">注册</el-button>
            </div>
            <el-menu-item v-for="item in navbarData" :key="item" :index="item.path">{{ item.title }}</el-menu-item>
        </el-menu>
        <router-view/>
    </div>
    <el-backtop :bottom="50" :right="50"/>
</template>

<style lang="scss" scoped>
/* home */
.home-content {
    width: 100%;
    height: 1000px;
}

.home-content-no {
    width: 100%;
    height: 100vh;
}

/* navbar */
.navbar {
    //position: fixed;
    //top: 0;
    //right: 0;
    //z-index: 999;
    height: 50px;
    width: 100%;
    padding: 0 80px 0 80px;
}

.flex-grow {
    flex-grow: 1;
}
</style>
