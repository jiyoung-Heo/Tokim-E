import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomTab from './BottomTab'; // 하단탭 컴포넌트
import Sidebar from './Sidebar'; // 사이드바 컴포넌트

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideComponentsOnPaths = ['/']; // 하단탭과 사이드바를 숨길 경로 목록 (StartPage 경로 '/')

  const shouldHideComponents = hideComponentsOnPaths.includes(
    location.pathname,
  );

  return (
    <>
      {!shouldHideComponents && <Sidebar />} {/* 조건부 렌더링 */}
      {children} {/* 페이지 내용 */}
      {!shouldHideComponents && <BottomTab />} {/* 조건부 렌더링 */}
    </>
  );
};

export default Layout;
