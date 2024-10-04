import { createGlobalStyle } from 'styled-components';

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: #f3f7fb;  /* 전체 배경을 지정 */
    font-family: 'KoddiUD OnGothic';
    color: black;
    line-height: 1.5;
    overflow-x: hidden;
  }

  body {
    margin: 0;
    padding: 3vh 5vw;
    align-items: flex-start;
    min-height: 100vh;
  }

`;

export default GlobalStyle;
