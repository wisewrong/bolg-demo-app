import axios from 'axios';

import {
  ApiBusinessError,
  ApiServerError,
  ApiTimeoutError,
} from './errors';

import { TIMEOUT } from './config';

const headers = {
  'Content-Type': 'application/json',
};

// 创建 axios 实例
const service = axios.create({
  // baseURL,
  headers,
  timeout: TIMEOUT,
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    let { method, data, params = {} } = config;
    method = `${method}`.toUpperCase();

    if (method !== 'GET') {
      // post、put、delete 提交时，将对象转换为string
      config.data = JSON.stringify(data);
    } else {
      // 增加时间戳 避免IE缓存 仅 GET
      params.t = Date.now();
      config.params = params;
    }
    // 请求发送前进行处理
    return config;
  },
  (error) => Promise.reject(error),
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data = {}, config = {} } = response;
    // const { code, message } = data;

    // if (`${code}` !== `${BACK_TRUE_CODE}`) {
    if (!data) {
      throw new ApiBusinessError('error', config.url, data);
    } else {
      return data;
    }
  },
  (error) => {
    const { status, config } = error.response || error || {};

    // 超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      const err = new ApiTimeoutError(TIMEOUT, config.url);
      throw err;
    }

    throw new ApiServerError(status, config.url);
  },
);

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return service;
}
