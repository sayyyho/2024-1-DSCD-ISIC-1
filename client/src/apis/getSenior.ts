import { isAxiosError } from "axios";
import { instance } from "./axios";

export const getSenior = async (headers: { Authorization: string }) => {
  try {
    const response = await instance.get(`/matching/senior/`, {
      headers,
    });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};
