import { createGlobalStyle } from "styled-components";
import Jua from "@/assets/font/Jua-Regular.ttf";

export const GlobalStyle = createGlobalStyle`


@font-face {
    font-family: 'Jua';
    src: url(${Jua}) format('truetype');
    font-weight: normal;
  } 
* {
  font-family: 'Jua';

}

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
