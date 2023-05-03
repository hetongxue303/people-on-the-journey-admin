import {axios, base_url} from "@utils/request.js";

export const getUserLisAllUrl = () => axios({method: 'GET', url: `${base_url}/user/all`})

export const getUserListUrl = (params) => axios({method: 'GET', url: `${base_url}/user/list`, params})

export const addUserUrl = (data) => axios({method: 'POST', url: `${base_url}/user/add`, data})

export const updateUserUrl = (data) => axios({method: 'PUT', url: `${base_url}/user/update`, data})

export const deleteUserUrl = (id) => axios({method: 'DELETE', url: `${base_url}/user/delete/${id}`})

export const batchDeleteUserUrl = (data) => axios({method: 'DELETE', url: `${base_url}/user/batch/delete`, data})
