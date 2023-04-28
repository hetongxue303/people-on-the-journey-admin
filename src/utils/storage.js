import Cookies from 'js-cookie'

/**
 * localStorage存储
 * @method get 获取
 * @method set 设置
 * @method remove 移除
 * @method clear 移除全部
 */
export const local = {
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}

/**
 * sessionStorage存储
 * @method get 获取
 * @method set 设置
 * @method remove 移除
 * @method clear 移除全部
 */
export const session = {
    get(key) {
        return JSON.parse(sessionStorage.getItem(key))
    },
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        sessionStorage.removeItem(key)
    },
    clear() {
        sessionStorage.clear()
    }
}

export const cookies = {
    get(key) {
        return Cookies.get(key)
    },
    set(key, value, attributes) {
        Cookies.set(key, value, attributes)
    },
    remove(key) {
        Cookies.remove(key)
    }
}
