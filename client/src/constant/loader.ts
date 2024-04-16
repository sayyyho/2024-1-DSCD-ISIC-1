import { redirect } from "react-router-dom";

export function loader() {
  const userId = false;

  if (!userId) {
    console.log(userId);
    return redirect("/login");
  }
}
