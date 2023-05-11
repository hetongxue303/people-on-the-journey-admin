import {axios, base_url} from "@utils/request.js";

export const getUserinfoLisAllUrl = () => axios({method: 'GET', url: `${base_url}/userinfo/all`})

export const getUserinfoListUrl = (params) => axios({method: 'GET', url: `${base_url}/userinfo/list`, params})

export const addUserinfoUrl = (data) => axios({method: 'POST', url: `${base_url}/userinfo/add`, data})

export const updateUserinfoUrl = (data) => axios({method: 'PUT', url: `${base_url}/userinfo/update`, data})

export const deleteUserinfoUrl = (id) => axios({method: 'DELETE', url: `${base_url}/userinfo/delete/${id}`})

export const batchDeleteUserinfoUrl = (data) => axios({
    method: 'DELETE',
    url: `${base_url}/userinfo/batch/delete`,
    data
})
