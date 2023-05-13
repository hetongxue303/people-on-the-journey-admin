<script setup>
import {reactive, ref, watch} from 'vue'
import logo from '@assets/images/logo.png'
import {getUserinfo, login, logout, modifyPassword, register} from "@/api/auth.js";
import {ElNotification} from "element-plus";
import {setToken, setTokenTime} from "@utils/common.js";
import {useLogin} from "@views/login/hooks/useLogin.jsx";
import navbarData from "@views/home/data/data.js";
import useUser from "@store/modules/user.js";
import {confirmBox} from "@utils/element.js";
import {clone, cloneDeep} from "lodash-es";
import {updateUserinfoUrl} from "@/api/userinfo.js";

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

const infoDialog = ref(false)
const infoRef = ref(null)
const infoFrom = ref({})
const infoRules = reactive({
    avatar: [{required: true, message: '请上传头像', trigger: 'blur'}],
    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
    gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
    email: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
})
watch(() => infoDialog.value,
    (value) =>
        value ? getUserinfo()
            .then(({data}) => infoFrom.value = data.code === 200 ? cloneDeep(data.data) : {}) : infoFrom.value = {},
    {deep: true}
)
/* upload */
const maxSize = ref(5)
const types = ref(['image/jpeg', 'image/png'])
const handleUploadSuccess = (response) => (infoFrom.value.avatar = clone(response.data))

const handleBeforeUpload = (file) => {
    const {value} = maxSize
    const {size, type} = file
    if (size / 1000 / 1024 > value) {
        ElNotification.warning(`图片最大为${value}MB`)
        return false
    }
    if (types.value.indexOf(type) === -1) {
        ElNotification.warning('图片类型错误')
        return false
    }
}
const saveUserinfo = async (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            updateUserinfoUrl(infoFrom.value)
                .then(({data}) => {
                    if (data.code === 200) {
                        infoDialog.value = false
                        user.userinfo = cloneDeep(infoFrom.value)
                        ElNotification.success('资料修改成功')
                        return
                    }
                    ElNotification.error('资料修改失败，请重试！')
                })
        }
    })
}
</script>

<template>
    <el-dialog v-model="infoDialog"
               :close-on-click-modal="false"
               :show-close="false"
               align-center
               class="dialog-common"
               destroy-on-close
               title="个人信息"
               width="30%">
        <el-form ref="infoRef" :model="infoFrom" :rules="infoRules" label-width="50">
            <el-form-item label="头像" prop="avatar">
                <el-upload
                    :before-upload="handleBeforeUpload"
                    :on-success="handleUploadSuccess"
                    :show-file-list="false"
                    action="/api/file/upload/avatar"
                    class="images-upload"
                    drag
                    method="post"
                    name="file"
                >
                    <el-image v-if="infoFrom.avatar" :src="infoFrom.avatar" class="images-box" fit="fill" title="点击更换头像"/>
                    <div v-else class="images-box">
                        <el-icon :size="50" class="images-upload-icon">
                            <component is="upload-filled"/>
                        </el-icon>
                        <div class="el-upload__text" style="font-size: 10px">将文件拖到此处，或<em>点击上传</em></div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="infoFrom['nickname']"/>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="infoFrom.gender">
                    <el-radio-button :label="1">男</el-radio-button>
                    <el-radio-button :label="2">女</el-radio-button>
                    <el-radio-button :label="3">保密</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="infoFrom['email']"/>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="infoFrom.intro" placeholder="用户太懒，没有介绍！" :rows="3" resize="none" type="textarea"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="infoDialog = false">返回</el-button>
            <el-button type="primary" @click="saveUserinfo(infoRef)">
                确认
            </el-button>
        </template>
    </el-dialog>
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
                <el-dropdown v-show="user.getUserId" style="margin:0 10px 0 5px">
                    <div style="display: flex;justify-content: center;align-items: center;width: 130px;height: 50px">
                        <el-image v-show="user.getUserId" :src="user.getUserinfo['avatar']" style="width: 30px;height: 30px;border-radius: 50%"/>
                        <span style="margin-left: 5px" class="el-dropdown-link">
                        {{ user.getUserinfo['nickname'] }}
                            <el-icon class="el-icon--right" size="10">
                                <component is="arrow-down"/>
                            </el-icon>
                    </span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu style="padding: 0">
                            <el-dropdown-item @click="infoDialog=true" icon="icon-park-id-card-h">
                                个人信息
                            </el-dropdown-item>
                            <el-dropdown-item @click="upwDialog=true" icon="icon-park-key">修改密码</el-dropdown-item>
                            <el-dropdown-item style="border-top: rgb(235, 238, 245) solid 1px" @click="userLogout" icon="icon-park-logout">
                                退出登录
                            </el-dropdown-item>
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

:deep(.el-backtop) {
    color: red;
}

// image
$images-upload-width: 200px;
$images-upload-height: 200px;
:deep(.images-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: $images-upload-width;
    height: $images-upload-height;

    &:hover {
        border-color: var(--el-color-primary);
    }
}

:deep(.el-upload-dragger) {
    padding: 0;
}

.images-upload-icon {
    color: #8c939d;
    text-align: center;
}

.images-box {
    width: $images-upload-width;
    height: $images-upload-height;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
