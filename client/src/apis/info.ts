import { isAxiosError } from "axios";
import { instance } from "./axios";

export interface Info {
  award_detail: string;
  award_part: string;
  club_detail: string;
  club_part: string;
  double_major: string | null;
  grades: string;
  id?: number;
  major: string;
  project_detail: string;
  project_part: string;
  skills: string;
  user?: number;
}

export const getInfo = async (headers: { Authorization: string }) => {
  try {
    const response = await instance.get<Info>(`/accounts/profile/`, {
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

export const postInfo = async (
  data: Info,
  headers: { Authorization: string }
) => {
  try {
    const response = await instance.post(`/accounts/profile/`, data, {
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

export const patchInfo = async (
  data: Info,
  headers: { Authorization: string }
) => {
  try {
    const response = await instance.patch(`/accounts/profile/`, data, {
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
