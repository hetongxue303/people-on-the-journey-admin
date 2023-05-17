import useUser from "@store/modules/user.js";

const navbarData = [
    {
        title: '首页',
        icon: 'icon-park-home',
        path: '/index',
        isLogin: false
    },
    {
        title: '我的订单',
        icon: 'icon-park-trunk',
        path: '/order/me',
        isLogin: !useUser().getToken
    },
    {
        title: '旅途预约',
        icon: 'icon-park-trunk',
        path: '/order',
        isLogin: false
    },
    {
        title: '关于我们',
        icon: 'icon-park-landscape',
        path: '/about',
        isLogin: false
    }
]

export default navbarData
