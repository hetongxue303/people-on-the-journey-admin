import {reactive, ref} from "vue";
import {useLogin} from "@views/login/hooks/useLogin.jsx";
import {login, register} from "@/api/auth.js";
import {ElNotification} from "element-plus";
import {setToken, setTokenTime} from "@utils/common.js";

export function useLayout() {
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
                        // await nextTick(() => con.value.focus())
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

    return {}
}
