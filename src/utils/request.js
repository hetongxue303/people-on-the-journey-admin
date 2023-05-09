import axios from 'axios'
import {ElNotification} from 'element-plus'
import {getToken} from './common'
import useUser from "@store/modules/user.js";

const base_url = import.meta.env.VITE_BASIC_URL

axios.create({
    baseURL: import.meta.env.VITE_BASIC_HTTP,
    timeout: 10 * 1000,
    withCredentials: true,
    timeoutErrorMessage: 'timeout',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
axios.interceptors.request.use(
    async (config) => {
        if (getToken() && config.headers) {
            // TODO 判断token是否快要过期
            config.headers.authorization = getToken()
        }
        return config
    },
    (error) => {
        ElNotification.error('请求异常')
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {
        const {response} = error
        if (response.status === 500) {
            ElNotification.error(response.data.message || '服务器异常')
            return
        }
        if (response.status === 401) {
            console.log(response.data.message)
            ElNotification.error('身份过期');
            useUser().isAdmin ? window.location.replace('/admin/login') : window.location.replace('/index')
            useUser()
                .userLogout()
            return
        }
        return Promise.reject(error)
    }
)

export {
    axios, base_url
}
