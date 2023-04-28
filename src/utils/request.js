import axios from 'axios'
import {ElNotification} from 'element-plus'
import {getToken} from './common'

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
        if (response.status === 500) ElNotification.error(response.data.message || '服务器异常')
        if (response.status === 401) {
            ElNotification.error(response.data.message || '身份过期')
            location.replace('/login')
            // useUserStore().systemLogout()
        }
        return Promise.reject(error)
    }
)

export {
    axios, base_url
}
