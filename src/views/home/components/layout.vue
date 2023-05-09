<script setup>
import {reactive, ref} from 'vue'
import logo from '@assets/images/logo.png'
import {login, logout, modifyPassword, register} from "@/api/auth.js";
import {ElNotification} from "element-plus";
import {setToken, setTokenTime} from "@utils/common.js";
import {useLogin} from "@views/login/hooks/useLogin.js";
import navbarData from "@views/home/data/data.js";
import useUser from "@store/modules/user.js";
import {confirmBox} from "@utils/element.js";

const activeIndex = ref('/index')
const changePath = (path) => {
    activeIndex.value = path
    window.location.href = path
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
const user = useUser()
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
                            user.setLoginInfo(data.data)
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

const userLogout = () => {
    confirmBox("确定退出登录吗?", '提示', 'warning', () => {
        logout()
            .then(({data}) => {
                if (data.code === 200) {
                    user.userLogout()
                    ElNotification.success('注销成功')
                    return
                }
                ElNotification.error('注销失败，请重试！')
            })
    }, undefined, undefined)
}

const upwDialog = ref(false)
const upwRef = ref(null)
const cpw = ref(null)
const upwFrom = reactive({})
const upwRules = reactive({
    oldPassword: [{required: true, message: '请输入原密码', trigger: 'blur'}],
    newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
    confirmPassword: [{required: true, message: '请确认密码', trigger: 'blur'}]
})
const updatePassword = async (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            if (upwFrom.newPassword !== upwFrom.confirmPassword) {
                ElNotification.warning('两次输入的密码不匹配')
                cpw.value.focus()
                return
            }
            modifyPassword({
                oldPassword: encryptPasswordByMD5(upwFrom.oldPassword),
                newPassword: encryptPasswordByMD5(upwFrom.newPassword),
                confirmPassword: encryptPasswordByMD5(upwFrom.confirmPassword)
            })
                .then(({data, status}) => {
                    if (status === 200 && data.code === 200) {
                        upwDialog.value = false
                        user.userLogout()
                        openDialog('L')
                        ElNotification.success('修改成功,请重新登录！')
                    }
                })
        }
    })
}
</script>

<template>
    <el-dialog v-model="upwDialog"
               :close-on-click-modal="false"
               :show-close="false"
               align-center
               class="dialog-common"
               destroy-on-close
               title="修改密码"
               width="30%">
        <el-form ref="upwRef" :model="upwFrom" :rules="upwRules" label-width="80">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model="upwFrom.oldPassword" show-password/>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="upwFrom.newPassword" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input ref="cpw" v-model="upwFrom.confirmPassword" show-password/>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="upwDialog = false">返回</el-button>
            <el-button type="primary" @click="updatePassword(upwRef)">
                确认
            </el-button>
        </template>
    </el-dialog>
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
                <el-link v-show="!user.getUserId" :underline="false" style="font-size: 12px" type="info" @click="openDialog('L')">
                    您好，请登录
                </el-link>
                <el-link v-show="!user.getUserId" :underline="false" style="font-size: 12px" type="danger" @click="openDialog('R')">
                    &nbsp;&nbsp;免费注册
                </el-link>
                <el-dropdown v-show="user.getUserId" style="margin-right: 10px">
                    <span class="el-dropdown-link">
                     {{ user.getUsername }}
                      <el-icon class="el-icon--right" size="10">
                       <component is="arrow-down"/>
                      </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item @click="upwDialog=true">修改密码</el-dropdown-item>
                            <el-dropdown-item divided @click="userLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
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

/* dropdown */
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
