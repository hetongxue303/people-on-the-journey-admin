const data = [
    {
        title: '首页',
        icon: 'icon-park-home',
        path: '/admin/index'
    },
    {
        title: '旅途管理',
        icon: 'icon-park-camp',
        path: '/admin/journey',
        children: [
            {
                title: '旅游社',
                icon: 'icon-park-trunk',
                path: '/admin/journey/travel-agency'
            },
            {
                title: '美食管理',
                icon: 'icon-park-bowl',
                path: '/admin/journey/food'
            },
            {
                title: '景区管理',
                icon: 'icon-park-landscape',
                path: '/admin/journey/scenic-spots'
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
                path: '/admin/system/user'
            },
            {
                title: '角色管理',
                icon: 'icon-park-permissions',
                path: '/admin/system/role'
            },
            {
                title: '菜单管理',
                icon: 'icon-park-application-menu',
                path: '/admin/system/menu'
            },
        ]
    },
    {
        title: '关于系统',
        icon: 'icon-park-tips',
        path: '/admin/about'
    }
]

export default data
