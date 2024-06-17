import { isAxiosError } from "axios";
import { instance } from "./axios";

import { RequestSignUpParams } from "@/types/auth";

export const postSignUp = async (body: RequestSignUpParams) => {
  try {
    const response = await instance.post(`accounts/registration`, {
      username: body.username,
      password1: body.password1,
      password2: body.password2,
      last_name: body.last_name,
      first_name: body.first_name,
      sex: body.sex,
      email: body.email,
      phone_number: body.phone_number,
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
