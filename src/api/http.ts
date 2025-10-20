import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";
import { checkHaveToken, getToken } from "../utils/token";
import {
  goToLoginHandler,
  messageInfo,
  messageRedirectToSignIn,
} from "@/composable";

export const http: AxiosInstance = axios.create({
  baseURL: "/api", // Replace with your API base URL
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器处理逻辑
const requestHandler = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.log("________request________");
  if (checkHaveToken()) {
    config.headers!.Authorization = `Bearer ${getToken()}`;
  }

  return config;
};

// 响应拦截器处理逻辑
const responseHandler = (response: AxiosResponse) => {
  console.log("________response________");
  const { code, message, data } = response.data;
  if (code === 0) {
    return data;
  } else {
    messageInfo(message);
    return Promise.reject(new Error(message));
  }
};

// 响应拦截器错误场景处理逻辑
const responseErrorHandler = (error: AxiosError) => {
  console.log("________error________");
  const { status } = error.response || {};
  console.log("status", status);

  if (status) {
    switch (status) {
      case 401:
        messageRedirectToSignIn(goToLoginHandler);
        break;
      default:
        messageInfo("请求失败");
        break;
    }

    return Promise.reject(error);
  }
};

// 请求拦截器
http.interceptors.request.use(requestHandler);
// 响应拦截器
http.interceptors.response.use(responseHandler, responseErrorHandler);
