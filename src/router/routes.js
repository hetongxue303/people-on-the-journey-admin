import Layout from '@/layout/index.vue'

export const routes = [
    {
        name: 'admin-login',
        path: '/admin/login',
        meta: {title: '后台登录'},
        component: () => import('@views/login/index.vue')
    },
    {
        name: 'admin-401',
        path: '/401',
        meta: {title: '无权访问'},
        component: () => import('@views/error/401.vue')
    },
    {
        name: 'admin-404',
        path: '/admin/:pathMatch(.*)*',
        meta: {title: '页面不存在'},
        component: () => import('@views/error/404.vue')
    },
    {
        name: 'admin-500',
        path: '/admin/500',
        meta: {title: '无权访问'},
        component: () => import('@views/error/500.vue')
    },
    /* layout */
    {
        path: '/admin',
        name: 'layout',
        component: Layout,
        redirect: '/admin/index',
        children: [
            {
                name: 'admin-index',
                path: '/admin/index',
                meta: {title: '后台首页'},
                component: () => import('@views/index/index.vue')
            },
            {
                name: 'admin-food',
                path: '/admin/journey/food',
                meta: {title: '美食管理'},
                component: () => import('@views/journey/food/index.vue')
            },
            {
                name: 'admin-travel-agency',
                path: '/admin/journey/travel-agency',
                meta: {title: '旅游社'},
                component: () => import('@views/journey/travel-agency/index.vue')
            },
            {
                name: 'admin-scenic-spots',
                path: '/admin/journey/scenic-spots',
                meta: {title: '景区管理'},
                component: () => import('@views/journey/scenic-spots/index.vue')
            },
            {
                name: 'admin-user',
                path: '/admin/system/user',
                meta: {title: '用户管理'},
                component: () => import('@views/system/user/index.vue')
            },
            {
                name: 'admin-role',
                path: '/admin/system/role',
                meta: {title: '角色管理'},
                component: () => import('@views/system/role/index.vue')
            },
            {
                name: 'admin-menu',
                path: '/admin/system/menu',
                meta: {title: '菜单管理'},
                component: () => import('@views/system/menu/index.vue')
            },
            {
                name: 'admin-about',
                path: '/admin/about',
                meta: {title: '关于系统'},
                component: () => import('@views/about/index.vue')
            }
        ]
    },
    /* home */
    {
        name: 'home',
        path: '/',
        redirect: '/index',
        component: () => import('@views/home/components/layout.vue'),
        children: [
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
                name: 'index',
                path: '/index',
                meta: {title: '首页'},
                component: () => import('@views/home/index.vue')
            },
            {
                name: 'travel-agency',
                path: '/travel-agency',
                meta: {title: '旅行社'},
                component: () => import('@views/home/travelAgency.vue')
            },
            {
                name: 'scenic-spots',
                path: '/scenic-spots',
                meta: {title: '景区'},
                component: () => import('@views/home/scenicSpots.vue')
            },
            {
                name: 'food',
                path: '/food',
                meta: {title: '美食'},
                component: () => import('@views/home/food.vue')
            },
            {
                name: 'about',
                path: '/about',
                meta: {title: '关于我们'},
                component: () => import('@views/home/about.vue')
            }
        ]
    }
]
