import { isAxiosError } from "axios";
import { instance } from "./axios";

interface PostLogin {
  username: string;
  password: string;
}

export const postLogin = async (body: PostLogin) => {
  try {
    const response = await instance.post(`api/token/`, {
      username: body.username,
      password: body.password,
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
