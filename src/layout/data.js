const data = [
    {
        title: '首页',
        icon: 'icon-park-home',
        path: '/index'
    },
    {
        title: '旅途管理',
        icon: 'icon-park-camp',
        path: '/journey',
        children: [
            {
                title: '旅游社',
                icon: 'icon-park-trunk',
                path: '/journey/travel-agency'
            },
            {
                title: '美食管理',
                icon: 'icon-park-bowl',
                path: '/journey/food'
            },
            {
                title: '景区管理',
                icon: 'icon-park-landscape',
                path: '/journey/scenic-spots'
            }
        ]
    },
    {
        title: '系统管理',
        icon: 'icon-park-setting',
        path: '/system',
        children: [
            {
                title: '用户管理',
                icon: 'icon-park-user',
                path: '/system/user'
            },
            {
                title: '角色管理',
                icon: 'icon-park-permissions',
                path: '/system/role'
            },
            {
                title: '菜单管理',
                icon: 'icon-park-application-menu',
                path: '/system/menu'
            },
        ]
    },
    {
        title: '关于系统',
        icon: 'icon-park-tips',
        path: '/about'
    }
]

export default data
