import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global'; // 전역 스타일 가져오기
import AppRouter from './router/AppRouter'; // router 폴더에서 AppRouter 가져오기
import BottomTab from './layouts/BottomTab'; // 하단탭

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <Router>
          <AppRouter />
          <BottomTab />
        </Router>
      </div>
    </>
  );
}

export default App;
