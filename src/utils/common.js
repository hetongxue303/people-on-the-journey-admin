import {JSEncrypt} from 'jsencrypt'
import {AUTHORIZATION_KEY, EXPIRE_TIME_KEY, IS_PREFIX, PREFIX_VALUE, PRIVATE_KEY, PUBLIC_KEY} from './constants'
import router from '@/router'
import {cookies} from "@utils/storage.js";

/**
 * 设置浏览器标题
 * @param router vue路由
 */
export const setBrowserTitle = () => {
    if (typeof router.currentRoute.value.meta["title"] === 'string') {
        document.title = router.currentRoute.value.meta["title"]
    }
}

/**
 * 生成范围随机数
 * @param min 最小值
 * @param max 最大值
 */
export const randomNumber = (min = undefined, max = undefined) => {
    if (min === undefined || max === undefined) return undefined
    return Math.floor(Math.random() * ((max) - (min))) + (min)
}

/**
 * 延时请求
 * @param callback 请求回调
 * @param min 最小范围
 * @param max 最大范围
 */
export const delayRequest = (callback, min = undefined, max = undefined) => {
    setTimeout(() => {
        callback()
    }, randomNumber(min, max))
}

/**
 * 文本加密
 *
 * @param text 明文
 */
export const encrypt = (text) => {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    return encryptor.encrypt(text)
}

/**
 * 文本解密
 *
 * @param text 密文
 */
export const decrypt = (text) => {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(PRIVATE_KEY)
    return encryptor.decrypt(text)
}

/**
 * 获取token
 */
export const getToken = () => {
    return cookies.get(AUTHORIZATION_KEY)
}

/**
 * 清除token
 */
export const removeToken = () => {
    cookies.remove(AUTHORIZATION_KEY)
}

/**
 * 设置token
 * @param token
 * @param timeout
 */
export const setToken = (token, timeout) => {
    cookies.set(AUTHORIZATION_KEY, IS_PREFIX ? PREFIX_VALUE + token : token, {expires: new Date(new Date() * 1 + timeout * 1000)})
}

/**
 * 设置token过期时间
 * @param time
 */
export const setTokenTime = (time) => {
    cookies.set(EXPIRE_TIME_KEY, time)
}

/**
 * 获取token过期时间
 */
export const getTokenTime = () => {
    return cookies.get(EXPIRE_TIME_KEY)
}

/**
 * 清除token过期时间
 */
export const removeTokenTime = () => {
    cookies.remove(EXPIRE_TIME_KEY)
}
