import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global'; // 전역 스타일 가져오기
import AppRouter from './router/AppRouter'; // router 폴더에서 AppRouter 가져오기
import BottomTab from './components/layouts/BottomTab'; // 하단탭
import Sidebar from './components/layouts/Sidebar'; // 사이드바

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Sidebar /> {/* 사이드바 상태는 Sidebar 컴포넌트에서 관리 */}
        <AppRouter />
        <BottomTab />
      </Router>
    </>
  );
}

export default App;
