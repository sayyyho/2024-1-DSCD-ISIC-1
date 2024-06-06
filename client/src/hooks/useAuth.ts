import { useRecoilValue } from "recoil";
import { userAuth } from "@/atoms/auth";

export const useAuthHeader = () => {
  const token = useRecoilValue(userAuth);
  return {
    Authorization: `Bearer ${token}`,
  };
};
