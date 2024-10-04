import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BottomTab from './BottomTab'; // 하단탭 컴포넌트
import Sidebar from './Sidebar'; // 사이드바 컴포넌트

// 헤더 스타일
const Header = styled.div`
  position: absolute;
  right: 0;
  top: 3vh;
  margin-right: 5vw;
  // background-color: red; /* 헤더 배경색 테스트용입니다.*/
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // 경로 로그 출력해서 확인하기
  console.log('Current path:', location.pathname);
  const hideComponentsOnPaths = ['/main']; // 사이드바를 숨길 경로 목록 (StartPage 경로 '/')

  const shouldHideComponents = hideComponentsOnPaths.includes(
    location.pathname,
  );

  return (
    <>
      <Header>
        {shouldHideComponents && <Sidebar />} {/* 조건부 렌더링 */}
      </Header>
      {children} {/* 페이지 내용 */}
      <BottomTab />
    </>
  );
};

export default Layout;
