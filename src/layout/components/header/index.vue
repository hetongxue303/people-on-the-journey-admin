<script setup>
import {computed, reactive, ref, watch} from "vue";
import {getLocale} from "@/locales/index.js";
import useUser from "../../../store/modules/user.js";
import {ElNotification} from "element-plus";
import {updateUserinfoUrl} from "@/api/userinfo.js";
import {clone, cloneDeep} from "lodash-es";
import {getUserinfo, logout, modifyPassword} from "@/api/auth.js";
import {useLogin} from "@views/login/hooks/useLogin.jsx";
import {confirmBox} from "@utils/element.js";

const drawer = ref(false)
const user = useUser()
const local = computed(() => getLocale())
const {encryptPasswordByMD5} = useLogin()

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
watch(() => infoDialog.value,
    (value) =>
        value ? getUserinfo()
            .then(({data}) => infoFrom.value = data.code === 200 ? cloneDeep(data.data) : {}) : infoFrom.value = {},
    {deep: true}
)

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
                        ElNotification.success('修改成功,请重新登录！')
                    }
                })
        }
    })
}

/* 系统注销 */
const adminLogout = () => {
    confirmBox("确定退出系统吗?", '提示', 'warning', () => {
        logout()
            .then(({data}) => {
                if (data.code === 200) {
                    user.userLogout()
                    window.location.replace('/admin/login')
                    ElNotification.success('注销成功')
                    return
                }
                ElNotification.error('注销失败，请重试！')
            })
    }, undefined, undefined)
}

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
</script>

<template>
    <div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
        <div style="display: flex;justify-content: center;align-items: center">
            <el-dropdown trigger="click">
                <div class="language">
                    <component is="icon-park-translate" :size="18"/>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :class="local==='zh_cn'?'is-active':''">简体中文</el-dropdown-item>
                        <el-dropdown-item :class="local==='en'?'is-active':''">English</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div style="display: flex;justify-content: center;align-items: center">
            <el-dropdown trigger="click">
                <div class="userinfo">
                    <el-image :src="user.getUserinfo.avatar" style="width: 30px;height: 30px;border-radius: 50%"/>
                    <span style="margin-left: 5px">{{ user.getUserinfo.nickname }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu style="padding: 0">
                        <el-dropdown-item @click="infoDialog=true" icon="icon-park-id-card-h">
                            个人信息
                        </el-dropdown-item>
                        <el-dropdown-item @click="upwDialog=true" icon="icon-park-key">修改密码</el-dropdown-item>
                        <el-dropdown-item style="border-top: rgb(235, 238, 245) solid 1px" @click="adminLogout" icon="icon-park-logout">
                            退出系统
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="header-setting" style="margin-top: 5px" @click="drawer=true">
                <component is="icon-park-setting" :size="16"/>
            </div>
        </div>
    </div>

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

    <el-drawer
        v-model="drawer"
        direction="rtl"
        title="项目配置"
        size="25%"
    >
        <span>全局配置待开发...</span>
    </el-drawer>
</template>

<style lang="scss" scoped>
/* settings */
.header-setting, .language {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.userinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
}

.header-setting:hover, .userinfo:hover, .language:hover {
    background-color: rgb(246, 246, 246);
}

/* locales */
.is-active {
    color: white;
    background-color: rgb(64, 158, 255);
}

:deep(.el-menu-item) {
    width: 150px;
    height: 32px;
}

:deep(.el-menu-item.is-active) {
    color: white;
    background-color: rgb(64, 158, 255);
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
