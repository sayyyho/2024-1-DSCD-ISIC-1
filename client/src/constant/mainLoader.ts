import { redirect } from "react-router-dom";
export const loader = () => {
  if (localStorage.getItem("key") === null) {
    return redirect("/login");
  }
  return null;
};
