import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global'; // 전역 스타일 가져오기
import AppRouter from './router/AppRouter'; // router 폴더에서 AppRouter 가져오기

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppRouter />
      </Router>
    </>
  );
}

export default App;
