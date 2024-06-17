import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --vh: 100%;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

* {
  font-family: 'Pretendard-Regular';

}

html, body {
  margin: 0;
}

html {
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding: 0;
  height: 100dvh;
}
body  {
    background-color: #FEF9EB;  
    width: 430px;
    height: 100%;
  }
  #root {
    height: 100%;
    width: 100%;
  }
`;
