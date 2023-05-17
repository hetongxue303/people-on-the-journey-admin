import {axios, base_url} from "@utils/request.js";

export const getShareLisAllUrl = () => axios({method: 'GET', url: `${base_url}/share/all`})

export const getShareListUrl = (params) => axios({method: 'GET', url: `${base_url}/share/list`, params})

export const getShareHomeListUrl = (params) => axios({method: 'GET', url: `${base_url}/share/list/home`, params})

export const addShareUrl = (data) => axios({method: 'POST', url: `${base_url}/share/add`, data})

export const updateShareUrl = (data) => axios({method: 'PUT', url: `${base_url}/share/update`, data})

export const deleteShareUrl = (id) => axios({method: 'DELETE', url: `${base_url}/share/delete/${id}`})

export const batchDeleteShareUrl = (data) => axios({method: 'DELETE', url: `${base_url}/share/batch/delete`, data})
