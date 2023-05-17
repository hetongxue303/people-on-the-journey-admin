import {axios, base_url} from "@utils/request.js";

export const getOrderLisAllUrl = () => axios({method: 'GET', url: `${base_url}/order/all`})

export const getOrderListUrl = (params) => axios({method: 'GET', url: `${base_url}/order/list`, params})
export const getOrderListByIdUrl = (id, params) => axios({method: 'GET', url: `${base_url}/order/list/${id}`, params})

export const addOrderUrl = (data) => axios({method: 'POST', url: `${base_url}/order/add`, data})

export const updateOrderUrl = (data) => axios({method: 'PUT', url: `${base_url}/order/update`, data})

export const deleteOrderUrl = (id) => axios({method: 'DELETE', url: `${base_url}/order/delete/${id}`})
export const batchDeleteOrderUrl = (data) => axios({method: 'DELETE', url: `${base_url}/order/batch/delete`, data})
