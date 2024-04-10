import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


html, body {
  margin: 0;
}

html {
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding: 0;
}
body  {
    background-color: #FEF9EB;  
    width: 393px;
    height: 100vh;
  }
  #root {
    height: 100%;
    width: 100%;
  }
`;
