// import axios, { type AxiosResponse } from "axios";
// import { useUser } from "@/composables/modules/auth/user";
// import { useCustomToast } from '@/composables/core/useCustomToast'
// const { showToast } = useCustomToast();

// const { token, logOut } = useUser();

// const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env
//   .VITE_BASE_URL as string;
// const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL;
// const $GATEWAY_ENDPOINT_V2 = import.meta.env.VITE_BASE_URL + "/v2";
// const $IMAGE_UPLOAD_ENDPOINT = import.meta.env
//   .VITE_IMAGE_UPLOAD_BASE_URL as string;

// export const GATEWAY_ENDPOINT = axios.create({
//   baseURL: $GATEWAY_ENDPOINT,
// });

// export const GATEWAY_ENDPOINT_V2 = axios.create({
//   baseURL: $GATEWAY_ENDPOINT_V2
// });

// export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
//   baseURL: $GATEWAY_ENDPOINT,
//   headers: {
//     Authorization: `Bearer ${token.value}`,
//   },
// });

// export const GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA = axios.create({
//   baseURL: $GATEWAY_ENDPOINT,
//   headers: {
//     Authorization: `Bearer ${token.value}`,
//     "Content-Type": "multipart/form-data",
//   },
// });

// export const GATEWAY_ENDPOINT_WITHOUT_VERSION = axios.create({
//   baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
// });
// export const GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH = axios.create({
//   baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
//   headers: {
//     Authorization: `Bearer ${token.value}`,
//   },
// });
// export const IMAGE_UPLOAD_ENDPOINT = axios.create({
//   baseURL: $IMAGE_UPLOAD_ENDPOINT,
// });
// export interface CustomAxiosResponse extends AxiosResponse {
//   value?: any;
//   type?: string;
// }

// const instanceArray = [
//   GATEWAY_ENDPOINT,
//   GATEWAY_ENDPOINT_V2,
//   GATEWAY_ENDPOINT_WITH_AUTH,
//   GATEWAY_ENDPOINT_WITHOUT_VERSION,
//   GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH,
// ];

// instanceArray.forEach((instance) => {
//   instance.interceptors.request.use((config: any) => {
//     if (token.value) {
//       config.headers.Authorization = `Bearer ${token.value}`;
//     }
//     return config;
//   });

//   instance.interceptors.response.use(
//     (response: CustomAxiosResponse) => {
//       return response;
//     },
//     (err: any) => {
//       if (typeof err.response === "undefined") {
//         showToast({
//           title: "Error",
//           message: "kindly check your network connection",
//           toastType: "error",
//           duration: 3000
//         });
//         return {
//           type: "ERROR",
//           ...err.response,
//         };
//       }
//       if (err.response.status === 401) {
//         console.log(err?.response?.data?.detail)
//         logOut();
//         showToast({
//           title: "Error",
//           message: err?.response?.data?.detail || "An error occured",
//           toastType: "error",
//           duration: 3000
//         });
//         return {
//           type: "ERROR",
//           ...err.response,
//         };
//       } else if (statusCodeStartsWith(err.response.status, 4)) {
//         if (err.response.data.message) {
//           showToast({
//             title: "Error",
//             message: err?.response?.data?.detail || "An error occured",
//             toastType: "error",
//             duration: 3000
//           });
//         }
//         return {
//           type: "ERROR",
//           ...err.response,
//         };
//       } else if (err.response.status === 500) {
//         showToast({
//           title: "Error",
//           message: err?.response?.data?.detail || "An error occured",
//           toastType: "error",
//           duration: 3000
//         });
//         return {
//           type: "ERROR",
//           ...err.response,
//         };
//       } else if (err.response.status === 409) {
//         showToast({
//           title: "Error",
//           message: err?.response?.data?.detail || "An error occured",
//           toastType: "error",
//           duration: 3000
//         });
//       }
//     }
//   );
// });

// const statusCodeStartsWith = (
//   statusCode: number,
//   startNumber: number
// ): boolean => {
//   const statusCodeString = statusCode.toString();
//   const startNumberString = startNumber.toString();

//   return statusCodeString.startsWith(startNumberString);
// };

import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { useUser } from "@/composables/modules/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { auth_api } from "@/api_factory/modules/auth";

const { showToast } = useCustomToast();
const { token, getRefreshToken, setToken, setRefreshToken, logOut } = useUser();

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env
  .VITE_BASE_URL as string;
const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL;
const $GATEWAY_ENDPOINT_V2 = import.meta.env.VITE_BASE_URL + "/v2";
const $IMAGE_UPLOAD_ENDPOINT = import.meta.env
  .VITE_IMAGE_UPLOAD_BASE_URL as string;

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
});

export const GATEWAY_ENDPOINT_V2 = axios.create({
  baseURL: $GATEWAY_ENDPOINT_V2
});

export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});

export const GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "multipart/form-data",
  },
});

export const GATEWAY_ENDPOINT_WITHOUT_VERSION = axios.create({
  baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
});

export const GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});

export const IMAGE_UPLOAD_ENDPOINT = axios.create({
  baseURL: $IMAGE_UPLOAD_ENDPOINT,
});

export interface CustomAxiosResponse extends AxiosResponse {
  value?: any;
  type?: string;
}

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

const instanceArray = [
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_V2,
  GATEWAY_ENDPOINT_WITH_AUTH,
  GATEWAY_ENDPOINT_WITHOUT_VERSION,
  GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH,
];

instanceArray.forEach((instance) => {
  // Request interceptor
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  // Response interceptor
  instance.interceptors.response.use(
    (response: CustomAxiosResponse) => {
      return response;
    },
    async (err: any) => {
      const originalRequest = err.config;

      // Handle network errors
      if (typeof err.response === "undefined") {
        showToast({
          title: "Error",
          message: "kindly check your network connection",
          toastType: "error",
          duration: 3000
        });
        return Promise.reject({
          type: "ERROR",
          ...err.response,
        });
      }

      // Handle 401 errors (token expired or invalid)
      if (err.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If a refresh is already in progress, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // No refresh token available, log out user
          logOut();
          showToast({
            title: "Session Expired",
            message: "Please log in again",
            toastType: "error",
            duration: 3000
          });
          return Promise.reject(err);
        }

        try {
          // Attempt to refresh the token
          const res = await auth_api.$_refresh_token({ refresh_token: refreshToken }) as any

          if (res.type !== "ERROR" && res.data?.access_token) {
            const newAccessToken = res.data.access_token;
            const newRefreshToken = res.data.refresh_token;

            // Update tokens
            setToken(newAccessToken);
            if (newRefreshToken) {
              setRefreshToken(newRefreshToken);
            }

            // Update the authorization header
            instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Process queued requests
            processQueue(null, newAccessToken);

            // Retry the original request
            return instance(originalRequest);
          } else {
            // Refresh failed, log out user
            processQueue(err, null);
            logOut();
            showToast({
              title: "Session Expired",
              message: "Please log in again",
              toastType: "error",
              duration: 3000
            });
            return Promise.reject(err);
          }
        } catch (refreshError) {
          // Refresh failed, log out user
          processQueue(refreshError, null);
          logOut();
          showToast({
            title: "Session Expired",
            message: "Please log in again",
            toastType: "error",
            duration: 3000
          });
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other 4xx errors
      if (statusCodeStartsWith(err.response.status, 4)) {
        if (err.response.data.message || err.response.data.detail) {
          showToast({
            title: "Error",
            message: err?.response?.data?.detail || err?.response?.data?.message || "An error occurred",
            toastType: "error",
            duration: 3000
          });
        }
        return Promise.reject({
          type: "ERROR",
          ...err.response,
        });
      }

      // Handle 500 errors
      if (err.response.status === 500) {
        showToast({
          title: "Error",
          message: err?.response?.data?.detail || "An error occurred",
          toastType: "error",
          duration: 3000
        });
        return Promise.reject({
          type: "ERROR",
          ...err.response,
        });
      }

      // Handle 409 errors
      if (err.response.status === 409) {
        showToast({
          title: "Error",
          message: err?.response?.data?.detail || "An error occurred",
          toastType: "error",
          duration: 3000
        });
        return Promise.reject({
          type: "ERROR",
          ...err.response,
        });
      }

      return Promise.reject(err);
    }
  );
});

const statusCodeStartsWith = (
  statusCode: number,
  startNumber: number
): boolean => {
  const statusCodeString = statusCode.toString();
  const startNumberString = startNumber.toString();

  return statusCodeString.startsWith(startNumberString);
};