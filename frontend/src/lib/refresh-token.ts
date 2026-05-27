import axios, { AxiosError, AxiosRequestConfig } from "axios";

import api from "./axios";

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedQueueItem {
  resolve: (value: boolean | PromiseLike<boolean>) => void;

  reject: (reason?: unknown) => void;
}

let isRefreshing = false;

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(true);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<boolean>((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err: unknown) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");

        processQueue(null);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
