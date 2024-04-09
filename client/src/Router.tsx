import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { loader } from "./constant/loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: <Home />,
        loader: loader,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
