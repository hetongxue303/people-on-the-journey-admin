import {defineStore} from "pinia";

const useUser = defineStore('user', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {},
    persist: {key: 'user'}
})
