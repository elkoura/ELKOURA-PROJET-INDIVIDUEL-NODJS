import axios, { Axios } from 'axios';
import { reactive } from 'vue';

const HTTP_METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
}

/**
 * 
 * @param {string} url add suffix to the base url
 * @param {string} method http method 
 * @returns {Promise<AxiosResponse<any>>}
 */
export function api(url, method = HTTP_METHODS.GET) {
    const BASE_API_URL = 'http://localhost:3000';

    return axios({
        method,
        url: BASE_API_URL + url,
    })

}

export const store = reactive({
    helloWorld: null,
    selectedAppBarIndex: 0
})




