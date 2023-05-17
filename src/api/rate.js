import {axios, base_url} from "@utils/request.js";

export const getRateLisAllUrl = () => axios({method: 'GET', url: `${base_url}/rate/all`})

export const getRateListUrl = (params) => axios({method: 'GET', url: `${base_url}/rate/list`, params})

export const addRateUrl = (data) => axios({method: 'POST', url: `${base_url}/rate/add`, data})

export const updateRateUrl = (data) => axios({method: 'PUT', url: `${base_url}/rate/update`, data})

export const deleteRateUrl = (id) => axios({method: 'DELETE', url: `${base_url}/rate/delete/${id}`})
export const batchDeleteRateUrl = (data) => axios({method: 'DELETE', url: `${base_url}/rate/batch/delete`, data})
