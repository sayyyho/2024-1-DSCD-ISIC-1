import { redirect } from "react-router-dom";
export const loader = () => {
  if (sessionStorage.getItem("access_token") === null) {
    return redirect("/login");
  }
  return null;
};
