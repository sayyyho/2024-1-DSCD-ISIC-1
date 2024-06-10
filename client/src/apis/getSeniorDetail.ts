import { isAxiosError } from "axios";
import { instance } from "./axios";

export const getSeniorDetail = async (
  key: string,
  headers: { Authorization: string }
) => {
  try {
    const response = await instance.get(`/matching/senior-detail/${key}/`, {
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

export interface SeniorDetailProps {
  id: number;
  name: string;
  sex: string;
  major: string;
  double_major: string | null;
  grades: string;
  job: string;
  club_part: string;
  project_part: string;
  award_part: string;
  skills: string[];
}
