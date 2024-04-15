import axios from "axios";

export const instance = axios.create({
  baseURL: "https://8c91-210-94-220-230.ngrok-free.app",
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});
