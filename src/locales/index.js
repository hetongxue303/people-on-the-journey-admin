import zh_cn from '@/locales/lang/zh_cn'
import en from '@/locales/lang/en'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import {createI18n} from "vue-i18n";
import {cookies} from "@utils/storage.js";

const messages = {
    zh_cn: {
        ...zh_cn,
        ...elementZhLocale,
    },
    en: {
        ...en,
        ...elementEnLocale,
    }
}
export const getLocale = () => {
    // 判断cookie中是否有语言信息
    const cookieLanguage = cookies.getLanguage()
    if (cookieLanguage) return cookieLanguage
    // 判断当前浏览器语言
    return navigator.language.toLowerCase().indexOf('zh') !== -1 ? 'zh_cn' : 'en'
}
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: getLocale(),
    messages
})

export default i18n
