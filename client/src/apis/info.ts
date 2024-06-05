import { isAxiosError } from "axios";
import { instance } from "./axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export interface Info {
  award_detail: string;
  award_part: string;
  club_detail: string;
  club_part: string;
  double_major: string;
  grades: string;
  id?: number;
  major: string;
  project_detail: string;
  project_part: string;
  skills: string;
  user?: number;
}

export const getInfo = async () => {
  try {
    const response = await instance.get<Info>(`/accounts/profile/`, {
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};

export const postInfo = async (data: Info) => {
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

export const patchInfo = async (data: Info) => {
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
