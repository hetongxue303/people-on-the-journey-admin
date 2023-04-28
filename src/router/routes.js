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
            },
            {
                name: 'food',
                path: '/journey/food',
                meta: {title: '旅游社'},
                component: () => import('@views/journey/food/index.vue')
            },
            {
                name: 'travel-agency',
                path: '/journey/travel-agency',
                meta: {title: '美食管理'},
                component: () => import('@views/journey/travel-agency/index.vue')
            },
            {
                name: 'scenic-spots',
                path: '/journey/scenic-spots',
                meta: {title: '景区管理'},
                component: () => import('@views/journey/scenic-spots/index.vue')
            },
            {
                name: 'user',
                path: '/system/user',
                meta: {title: '用户管理'},
                component: () => import('@views/system/user/index.vue')
            },
            {
                name: 'role',
                path: '/system/role',
                meta: {title: '角色管理'},
                component: () => import('@views/system/role/index.vue')
            },
            {
                name: 'menu',
                path: '/system/menu',
                meta: {title: '菜单管理'},
                component: () => import('@views/system/menu/index.vue')
            },
            {
                name: 'about',
                path: '/about',
                meta: {title: '关于系统'},
                component: () => import('@views/about/index.vue')
            }
        ]
    }
]
