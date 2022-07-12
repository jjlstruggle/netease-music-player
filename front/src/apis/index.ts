/**
 * axios全局配置部分
 */

import axios, { AxiosError } from "axios";
import cache from "src/utils/cache";
import storage from "../utils/storage";
axios.defaults.baseURL = "http://121.40.19.111:3000";
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

export default {
  async get(url: string) {
    const res = await axios.get(url);
    return res.data;
  },
  async post(url: string, data?: any, options?: object) {
    const res = await axios.post(url, data, options);
    return res.data;
  },
};
