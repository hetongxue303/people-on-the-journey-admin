import {axios, base_url} from "@utils/request.js";

export function adminLogin(data) {
    return axios({
        method: 'POST',
        url: `${base_url}/admin/login`,
        data
    })
}

export function adminLogout() {
    return axios({
        method: 'POST',
        url: `${base_url}/admin/logout`
    })
}

export function login(data) {
    return axios({
        method: 'POST',
        url: `${base_url}/user/login`,
        data
    })
}

export function register(data) {
    return axios({
        method: 'POST',
        url: `${base_url}/user/register`,
        data
    })
}

export function logout() {
    return axios({
        method: 'POST',
        url: `${base_url}/user/logout`
    })
}

export function getUserinfo() {
    return axios({
        method: 'GET',
        url: `${base_url}/user/userinfo`
    })
}

export function modifyPassword(data) {
    return axios({
        method: 'PUT',
        url: `${base_url}/user/update/password`,
        data
    })
}
