/**
 * axios全局配置部分
 */

import axios from "axios";
import hasNet from '../utils/net'
import storage from '../utils/storage'
axios.defaults.baseURL = "http://121.40.19.111:3000";
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true

class Request {
    async getDataFromApi(...args) {
        const res = await axios.get(...args)
        storage.set(args[0], res.data)
        return res.data
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
            getDataFromStorage: () => that.getDataFromStorage(...args),
            getDataFromApi: () => that.getDataFromApi(...args)
        }
    }
    async defaultGet(...args) {
        return await this.getDataFromApi(...args)
    }
}

export default new Request()