import { API } from "@/lib/config/axios.client";
import { AxiosDefaults } from "axios";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: unknown;
}

class ApiClient {
  get defaults(): AxiosDefaults<unknown> {
    return API.defaults;
  }

  async get<T>(url: string, config?: object): Promise<T> {
    const res = await API.get<ApiResponse<T>>(url, config);
    return res.data.data;
  }

  async post<T, B = unknown>(
    url: string,
    body: B,
    config?: object,
  ): Promise<T> {
    const res = await API.post<ApiResponse<T>>(url, body, config);
    return res.data.data;
  }

  async put<T, B = unknown>(url: string, body: B): Promise<T> {
    const res = await API.put<ApiResponse<T>>(url, body);
    return res.data.data;
  }

  async patch<T, B = unknown>(url: string, body?: B): Promise<T> {
    const res = await API.patch<ApiResponse<T>>(url, body);

    return res.data.data;
  }

  async delete<T>(url: string): Promise<T> {
    const res = await API.delete<ApiResponse<T>>(url);
    return res.data.data;
  }

  async downloadBlob(url: string): Promise<Blob> {
    const res = await API.get(url, { responseType: "blob" });
    return res.data as Blob;
  }
}

export const apiClient = new ApiClient();
