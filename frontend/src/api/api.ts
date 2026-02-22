import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7223";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
