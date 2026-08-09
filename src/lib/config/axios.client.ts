import axios from "axios";

const REQUEST_TIMEOUT_MS = 15_000;

// const PUBLIC_ROUTES = ["/", "/admin/signin", "/forgot-password"];

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
  },
};

export const API = axios.create(options);
