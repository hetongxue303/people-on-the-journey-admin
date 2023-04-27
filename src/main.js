import {createApp} from 'vue'
import App from './App.vue'

import router from '@/router'
import i18n from "@/locales";
import pinia from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@assets/styles/index.scss'
import 'virtual:windi.css'
import 'animate.css'
import {install} from '@icon-park/vue-next/es/all'

const app = createApp(App)

const initiate = async () => {
    app.use(router)
    app.use(ElementPlus)
    app.use(pinia)
    app.use(i18n)
    // 注册iconPark图标
    install(app, 'icon-park')
    app.mount('#app')
}

await initiate()
