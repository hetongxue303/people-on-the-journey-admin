import {axios, base_url} from "@utils/request.js";

export function login(data) {
    return axios({
        method: 'POST',
        url: `${base_url}/admin/login`,
        data
    })
}

export function logout() {
    return axios({
        method: 'POST',
        url: `${base_url}/admin/logout`
    })
}
