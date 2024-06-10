import { isAxiosError } from "axios";
import { instance } from "./axios";

export const getJobs = async (headers: { Authorization: string }) => {
  try {
    const response = await instance.get(`/recommendation/job/`, { headers });
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

export interface JobRecommendation {
  job_name: string;
  recommendation_reason: string;
  improvement_points: string;
}
