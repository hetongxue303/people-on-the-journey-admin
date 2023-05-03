import {axios, base_url} from "@utils/request.js";

export const getFoodLisAllUrl = () => axios({method: 'GET', url: `${base_url}/food/all`})

export const getFoodListUrl = (params) => axios({method: 'GET', url: `${base_url}/food/list`, params})

export const addFoodUrl = (data) => axios({method: 'POST', url: `${base_url}/food/add`, data})

export const updateFoodUrl = (data) => axios({method: 'PUT', url: `${base_url}/food/update`, data})

export const deleteFoodUrl = (id) => axios({method: 'DELETE', url: `${base_url}/food/delete/${id}`})
export const batchDeleteFoodUrl = (data) => axios({method: 'DELETE', url: `${base_url}/food/batch/delete`, data})
