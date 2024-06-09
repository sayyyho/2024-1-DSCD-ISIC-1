import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErorrPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Info } from "./pages/Info";
import { Job } from "./pages/Job";
import { Senior } from "./pages/Senior";
import { SeniorDetail } from "./pages/SeniorDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/job",
        element: <Job />,
      },
      {
        path: "/senior",
        element: <Senior />,
      },
      {
        path: "/seniorDetail/:id",
        element: <SeniorDetail />,
      },
    ],
  },
]);
