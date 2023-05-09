import {defineStore} from "pinia";
import {AUTHORIZATION_KEY, IS_PREFIX, PREFIX_VALUE} from "@utils/constants.js";
import {cookies, local, session} from "@utils/storage.js";

const useUser = defineStore('user', {
    state: () => {
        return {
            userinfo: {},
            token: '',
            userId: undefined,
            username: '',
            isAdmin: false
        }
    },
    getters: {
        getUserinfo: (state) => state.userinfo,
        getIsAdmin: (state) => state.isAdmin,
        getUserId: (state) => state.userId,
        getUsername: (state) => state.username,
        getToken: (state) => state.token
    },
    actions: {
        setLoginInfo(data) {
            this.token = IS_PREFIX ? PREFIX_VALUE + data.value : data.value
            this.userinfo = data.userinfo
            this.userId = data.userId
            this.isAdmin = data.admin
            this.username = data.username
        },
        userLogout() {
            this.$reset()
            session.clear()
            local.clear()
            cookies.remove(AUTHORIZATION_KEY)
        }
    },
    persist: {key: 'user'}
})

export default useUser
