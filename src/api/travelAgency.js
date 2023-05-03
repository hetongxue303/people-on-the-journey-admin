import {axios, base_url} from "@utils/request.js";

export const getTravelAgencyLisAllUrl = () => axios({method: 'GET', url: `${base_url}/travel/agency/all`})

export const getTravelAgencyListUrl = (params) => axios({method: 'GET', url: `${base_url}/travel/agency/list`, params})

export const addTravelAgencyUrl = (data) => axios({method: 'POST', url: `${base_url}/travel/agency/add`, data})

export const updateTravelAgencyUrl = (data) => axios({method: 'PUT', url: `${base_url}/travel/agency/update`, data})

export const deleteTravelAgencyUrl = (id) => axios({method: 'DELETE', url: `${base_url}/travel/agency/delete/${id}`})
export const batchDeleteTravelAgencyUrl = (data) => axios({
    method: 'DELETE',
    url: `${base_url}/travel/agency/batch/delete`,
    data
})
