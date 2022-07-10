/**
 * axios全局配置部分
 */

import axios, { AxiosError } from "axios";
import cache from "src/utils/cache";
import storage from '../utils/storage'
axios.defaults.baseURL = "http://121.40.19.111:3000";
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true

class Request {
    async getDataFromApi(url, options = {}, cache = true) {
        try {
            const res = await axios.get(url, options)
            if (cache) {
                storage.set(url, res.data)
            }
            return res.data
        } catch (e) {
            return {
                code: e.response.status,
                data: null,
                info: e.response.statusText
            }
        }

    }
    async getDataFromStorage(url) {
        return await storage.get(url)
    }
    async post(...args) {
        return await axios.post(...args)
    }
    async get(...args) {
        let that = this
        return {
            getDataFromStorage: (cache = true) => cache && that.getDataFromStorage(...args),
            getDataFromApi: () => that.getDataFromApi(...args)
        }
    }
    async defaultGet(...args) {
        return await this.getDataFromApi(...args)
    }
}

export default new Request()