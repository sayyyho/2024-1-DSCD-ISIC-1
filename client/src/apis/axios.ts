import axios from "axios";

export const instance = axios.create({
  baseURL: "https://86a6-210-94-220-230.ngrok-free.app",
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});
