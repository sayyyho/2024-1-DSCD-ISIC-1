import { isAxiosError } from "axios";
import { instance } from "./axios";

export const getSenior = async (headers: { Authorization: string }) => {
  try {
    const response = await instance.get(`/matching/senior/`, { headers });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

export interface SeniorRecommendation {
  double_major: string;
  grades: string;
  id: number;
  job: string;
  major: string;
  name: string;
  similarity_sum: string;
}
