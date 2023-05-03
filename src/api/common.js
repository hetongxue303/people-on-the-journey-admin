import {axios, base_url} from "@utils/request.js";

export const getCascadeTreeUrl = () => axios({method: 'GET', url: `${base_url}/cascade/tree`})
