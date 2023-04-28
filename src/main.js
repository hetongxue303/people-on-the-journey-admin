import {createApp} from 'vue'
import App from './App.vue'

import router from '@/router'
import i18n from "@/locales";
import pinia from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {install} from '@icon-park/vue-next/es/all'
import {directives} from "@utils/directives.js";
import {loadIcon} from "@utils/element.js";

import '@/router/permission.js'
import '@assets/styles/index.scss'
import 'virtual:windi.css'
import 'animate.css'


const app = createApp(App)

const initiate = async () => {
    app.use(router)
    app.use(ElementPlus)
    app.use(pinia)
    app.use(i18n)
    directives(app)
    loadIcon(app)
    // 注册iconPark图标
    install(app, 'icon-park')
    app.mount('#app')
}

await initiate()
