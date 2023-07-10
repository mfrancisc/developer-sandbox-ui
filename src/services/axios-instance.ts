import {
  errorInterceptor,
  interceptor401,
  interceptor500,
} from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import axios, { AxiosRequestConfig } from 'axios';

const baseURL =
  'https://registration-service-toolchain-host-operator.apps.sandbox.x8i5.p1.openshiftapps.com';

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((reqConfig: AxiosRequestConfig) => ({
  baseURL,
  ...reqConfig,
}));

axiosInstance.interceptors.request.use((reqConfig: AxiosRequestConfig) => {
  return window.insights.chrome.auth.getToken().then((bearerToken) => {
    if (!bearerToken) {
      return reqConfig;
    }
    return {
      ...reqConfig,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`,
        ...reqConfig.headers,
      },
    };
  });
});
axiosInstance.interceptors.response.use(undefined, interceptor401);
axiosInstance.interceptors.response.use(undefined, interceptor500);
axiosInstance.interceptors.response.use(undefined, errorInterceptor);
