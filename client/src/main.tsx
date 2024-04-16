import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./style";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <RouterProvider router={router} />
    <GlobalStyle />
  </RecoilRoot>
);
