import md5 from 'js-md5'
import {reactive, ref} from "vue";
import {login} from "@/api/auth.js";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import {setToken, setTokenTime} from "@utils/common.js";

export function useLogin() {
    const router = useRouter()
    const loginRef = ref(null)
    const loading = ref(false)
    const redirect = ref('')
    const loginRules = reactive({
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
    })
    const loginForm = reactive({
        username: 'admin', password: '123456'
    })

    const encryptPasswordByMD5 = (password) => md5(md5(password)
        .split('')
        .reverse()
        .join(''))


    const userLogin = async (formEl) => {
        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {
                loading.value = true
                login({
                    username: loginForm.username, password: encryptPasswordByMD5(loginForm.password)
                })
                    .then(({data, status}) => {
                        if (data.code === 200 && status === 200) {
                            ElNotification.success('登陆成功')
                            setToken(data.data.value, data.data.timeout)
                            setTokenTime(data.data.timeout)
                            router.push(redirect.value || '/admin/index')
                            return
                        }
                        ElNotification.error(data.message || '登陆失败，请重新登录')
                    })
                    .finally(() => loading.value = false)
            }
        })
    }

    return {
        loginRef, loginRules, loading, loginForm, userLogin, encryptPasswordByMD5
    }
}
