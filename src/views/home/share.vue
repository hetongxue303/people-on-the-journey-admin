<script setup>
import {reactive, ref, watch} from "vue";
import {clone, cloneDeep} from "lodash-es";
import {ElNotification} from "element-plus";
import {addShareUrl} from "@/api/share.js";
import useUser from "@store/modules/user.js";
import {updateUserinfoUrl} from "@/api/userinfo.js";
import {getUserinfo, login, logout, modifyPassword, register} from "@/api/auth.js";
import {useLogin} from "@views/login/hooks/useLogin.jsx";
import {setToken, setTokenTime} from "@utils/common.js";
import {confirmBox} from "@utils/element.js";

/* 上传 */
const maxSize = ref(5)
const types = ref(['image/jpeg', 'image/png'])
const handleUploadSuccess = (response) => (infoFrom.value.avatar = clone(response.data))
const handleFormUploadSuccess = (response) => (form.value.image = clone(response.data))

const handleFormBeforeUpload = (file) => {
    const {value} = maxSize
    const {size, type} = file
    if (!user.getUserId) {
        ElNotification.warning('请先登录')
        return false
    }
    if (size / 1000 / 1024 > value) {
        ElNotification.warning(`图片最大为${value}MB`);
        return false;
    }
    if (types.value.indexOf(type) === -1) {
        ElNotification.warning('图片类型错误')
        return false
    }
}
const handleBeforeUpload = (file) => {
    const {value} = maxSize
    const {size, type} = file
    if (!user.getUserId) {
        ElNotification.warning('请先登录')
        return false
    }
    if (size / 1000 / 1024 > value) {
        ElNotification.warning(`图片最大为${value}MB`);
        return false;
    }
    if (types.value.indexOf(type) === -1) {
        ElNotification.warning('图片类型错误')
        return false
    }
}

/* 分享 */
const form = ref({})
const handleSave = () => {
    if (!form.value["content"]) {
        ElNotification.warning('内容不能为空')
        return
    }
    if (!form.value["image"]) {
        ElNotification.warning('图片不能为空')
        return
    }
    addShareUrl(form.value)
        .then(({data}) => {
            if (data.code === 200) {
                form.value = {}
                ElNotification.success('发布成功')
                return
            }
            ElNotification.error('发布失败，请重试！')
        })
}

/* 个人信息 */
const infoDialog = ref(false)
const infoRef = ref(null)
const infoFrom = ref({})
const infoRules = reactive({
    avatar: [{required: true, message: '请上传头像', trigger: 'blur'}],
    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
    gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
    email: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
})
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
watch(() => infoDialog.value,
    (value) =>
        value ? getUserinfo()
            .then(({data}) => infoFrom.value = data.code === 200 ? cloneDeep(data.data) : {}) : infoFrom.value = {},
    {deep: true}
)

/* 修改密码 */
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

/* 用户登录/注销 */
const loginDialog = ref(false)
const openDialog = (oop) => {
    title.value = oop === 'L' ? '用户登录' : '用户注册'
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
                            setToken(data.data.value, data.data.timeout)
                            setTokenTime(data.data.timeout)
                            user.setLoginInfo(data.data)
                            ElNotification.success('登陆成功')
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

    <div class="share-box">
        <div class="share-content">
            <el-input v-model="form.content" placeholder="记录今日心情！" style="width: 100%" :rows="10" resize="none" type="textarea"/>
        </div>
        <div class="share-image">
            <el-upload
                :before-upload="handleFormBeforeUpload"
                :on-success="handleFormUploadSuccess"
                :show-file-list="false"
                action="/api/file/upload/share"
                class="images-upload"
                drag
                method="post"
                name="file"
            >
                <el-image v-if="form.image" :src="form.image" class="images-box" fit="fill"/>
                <div v-else class="images-box">
                    <el-icon :size="67" class="images-upload-icon">
                        <component is="upload-filled"/>
                    </el-icon>
                    <div class="el-upload__text" style="font-size: 12px">将图片拖到此处，或<em>点击上传</em></div>
                </div>
            </el-upload>
        </div>
        <div class="share-bth">
            <!-- 已登陆 -->
            <div v-if="user.getUserId" class="userinfo">
                <div class="userinfo-box">
                    <el-avatar class="avatar" :src="user.getUserinfo.avatar"/>
                </div>
                <div class="userinfo-box">
                    <el-link type="info" class="username" :underline="false">
                        {{ user.getUserinfo['nickname'] }}
                    </el-link>
                </div>
                <div class="item-box">
                    <el-link type="success" icon="icon-park-id-card-h" :underline="false" @click="infoDialog=true">
                        个人信息
                    </el-link>
                    <el-link type="success" icon="icon-park-key" :underline="false" @click="upwDialog=true">
                        修改密码
                    </el-link>
                    <el-link type="success" icon="icon-park-logout" :underline="false" @click="userLogout">
                        退出登录
                    </el-link>
                </div>
            </div>
            <!-- 未登陆 -->
            <div v-else class="userinfo no-userinfo">
                <el-avatar shape="square" class="no-image mb-20px"/>
                <button class="btn-ok mb-20px" @click="openDialog('L')">
                    用户登录
                </button>
                <button class="btn-ok" @click="openDialog('R')">用户注册</button>
            </div>
            <button v-if="user.getUserId" class="btn-ok" @click="handleSave">发布心情</button>
        </div>
    </div>
    <div class="share-list">
        <div class="item-content">

        </div>
    </div>
</template>

<style scoped lang="scss">
.share-list {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    background-color: aliceblue;
}

.item-content {
    width: 80%;
    height: 100px;
    background-color: #0B0037;
}

:deep(.el-link) {
    margin-bottom: 5px;
    font-size: 13px;
}

:deep(.el-link__inner) {
    padding-left: 3px;
}

.no-image {
    height: 100px;
    width: 100px;
}

.item-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}

.btn-ok {
    background-image: linear-gradient(to right, #16222A 0%, #3A6073 51%, #16222A 100%);
    padding: 7px 36px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 5px;
    display: block;

    &:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
    }
}

.avatar {
    width: 35px;
    height: 35px;
    margin: 5px;
}

.username {
    font-size: 12px;
    margin-bottom: 3px;
}

.share-box {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    padding: 50px 0 50px 0;
    background-color: aliceblue;
}

.share-image {
    height: 100%;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}

.share-content {
    width: 40%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0 0 15px;
    background-color: white;
}

.share-bth {
    width: 11.5%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 0 10px 10px 0;
    background-color: white;
}

// image
$images-upload-width: 220px;
$images-upload-height: 220px;
:deep(.images-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
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

.userinfo {
    width: 125px;
    height: 175px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;

    &-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        width: 100%;
        cursor: pointer;
    }
}

.no-userinfo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
