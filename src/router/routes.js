import Layout from '@/layout/index.vue'

export const routes = [
    {
        name: 'login',
        path: '/login',
        meta: {title: '登录'},
        component: () => import('@views/login/index.vue')
    },
    {
        name: '401',
        path: '/401',
        meta: {title: '无权访问'},
        component: () => import('@views/error/401.vue')
    },
    {
        name: '404',
        path: '/:pathMatch(.*)*',
        meta: {title: '页面不存在'},
        component: () => import('@views/error/404.vue')
    },
    {
        name: '500',
        path: '/500',
        meta: {title: '无权访问'},
        component: () => import('@views/error/500.vue')
    },
    {
        path: '/',
        name: 'root',
        component: Layout,
        redirect: '/index',
        children: [
            {
                name: 'index',
                path: '/index',
                meta: {title: '首页'},
                component: () => import('@views/index/index.vue')
            }
        ]
    }
]
