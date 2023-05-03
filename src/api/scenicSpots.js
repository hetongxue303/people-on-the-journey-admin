import {axios, base_url} from "@utils/request.js";

export const getScenicSpotsLisAllUrl = () => axios({method: 'GET', url: `${base_url}/scenic/spots/all`})

export const getScenicSpotsListUrl = (params) => axios({method: 'GET', url: `${base_url}/scenic/spots/list`, params})

export const addScenicSpotsUrl = (data) => axios({method: 'POST', url: `${base_url}/scenic/spots/add`, data})

export const updateScenicSpotsUrl = (data) => axios({method: 'PUT', url: `${base_url}/scenic/spots/update`, data})

export const deleteScenicSpotsUrl = (id) => axios({method: 'DELETE', url: `${base_url}/scenic/spots/delete/${id}`})
export const batchDeleteScenicSpotsUrl = (data) => axios({
    method: 'DELETE',
    url: `${base_url}/scenic/spots/batch/delete`,
    data
})
