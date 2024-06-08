import { useCallback } from "react";
import Swal from "sweetalert2";

interface User {
  username: string;
  password?: string;
  password1?: string;
  password2?: string;
  last_name?: string;
  first_name?: string;
  sex?: string;
  email?: string;
  phone_number?: string;
}

type requestType<T> = (user: User) => Promise<T>;

export const useSubmit = <T extends { status: number }>(
  callAPI: requestType<T>,
  successMessage: string,
  successCallback: (response: T) => void
) => {
  const onSubmit = useCallback(
    async (user: User) => {
      Swal.fire({
        title: "요청 중...",
        text: "잠시만 기다려 주세요.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const res = await callAPI(user);
        if (res.status === 204 || res.status === 200) {
          Swal.fire({
            title: successMessage,
            text: "페이지로 이동합니다.",
            icon: "success",
          }).then(() => {
            successCallback(res);
          });
        } else {
          Swal.fire({
            title: "에러 발생!",
            text: "문제가 발생했습니다. 다시 시도해 주세요.",
            icon: "error",
            confirmButtonColor: "#ed8b00",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "에러 발생!",
          text: "문제가 발생했습니다. 다시 시도해 주세요.",
          icon: "error",
          confirmButtonColor: "#ed8b00",
        });
      }
    },
    [callAPI, successMessage, successCallback]
  );

  return { onSubmit };
};
