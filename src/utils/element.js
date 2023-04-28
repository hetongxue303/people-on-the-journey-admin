import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

const DURATION_TIME = 1500
const type = 'info' | 'success' | 'warning' | 'error'
// 消息框
export const Notification = (message, type, title = null, duration = DURATION_TIME) =>
    ElNotification({type, message, duration, title})
export const Message = (message, type, duration = DURATION_TIME) =>
    ElMessage({message, type, duration})

/**
 * 确认框
 * @param text 文本
 * @param tip 提示
 * @param confirm 确认回调
 * @param cancel 取消回调
 * @param always 成功与否都会执行
 * @param type
 * @param confirmButtonText
 * @param cancelButtonText
 */
export const confirmBox = (
    text,
    tip,
    type,
    confirm = null,
    cancel = null,
    always = null,
    confirmButtonText = '确定',
    cancelButtonText = '返回'
) => {
    ElMessageBox.confirm(text, tip, {
        confirmButtonText,
        cancelButtonText,
        type
    })
        .then(() => confirm())
        .catch(() =>
            (cancel ? cancel() : null)
        )
        .finally(() =>
            (always ? always() : null)
        )
}

export const loadIcon = (app) => {
    for (const [key, component] of Object.entries(Icons))
        app.component(key, component)
}
