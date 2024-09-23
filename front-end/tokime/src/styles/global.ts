import { createGlobalStyle } from 'styled-components';

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: white;
    font-family: 'KoddiUD OnGothic', sans-serif;
    color: black;
    line-height: 1.5;
    overflow-x: hidden;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
  }

  /* AppContainer의 전역 스타일 */
  .app-container {
    width: 360px;
    min-height: 640px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 60px; /* 하단탭을 위한 공간 */
    background-color: #f3f7fb;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: relative; /* 하단탭을 절대 위치로 배치하기 위한 설정 */
  }
`;

export default GlobalStyle;
