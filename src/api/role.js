import {axios, base_url} from "@utils/request.js";

export const getRoleLisAllUrl = () => axios({method: 'GET', url: `${base_url}/role/all`})

export const getRoleListUrl = (params) => axios({method: 'GET', url: `${base_url}/role/list`, params})

export const addRoleUrl = (data) => axios({method: 'POST', url: `${base_url}/role/add`, data})

export const updateRoleUrl = (data) => axios({method: 'PUT', url: `${base_url}/role/update`, data})

export const deleteRoleUrl = (id) => axios({method: 'DELETE', url: `${base_url}/role/delete/${id}`})

export const batchDeleteRoleUrl = (data) => axios({method: 'DELETE', url: `${base_url}/role/batch/delete`, data})
