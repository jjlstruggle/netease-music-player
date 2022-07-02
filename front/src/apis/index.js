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
    async get(...args) {
        if (!hasNet()) {
            return {
                code: 201,
                data: await storage.get(args[0]),
                onlineState: false
            }
        } else {
            const res = await axios.get(...args)
            storage.set(args[0], res.data)
            return res
        }
    }
    async post(...args) {
        if (!hasNet()) {
            return {
                code: 201,
                data: await storage.get(args[0]),
                onlineState: false
            }
        } else {
            const res = await axios.post(...args)
            storage.set(args[0], res.data)
            return res
        }
    }
}

export default new Request()