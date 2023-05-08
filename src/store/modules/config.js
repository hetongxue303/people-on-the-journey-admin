import {defineStore} from "pinia";

const useConfig = defineStore('config', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {},
    persist: {key: 'config'}
})
