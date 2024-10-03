import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BottomTab from './BottomTab'; // 하단탭 컴포넌트
import Sidebar from './Sidebar'; // 사이드바 컴포넌트
import TokimLogo from '../../assets/images/TokimEnglogo.png'; // 로고 이미지

// 헤더 스타일
const Header = styled.div`
  width: 100vw; /* 전체 화면 너비 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  // background-color: #fff; /* 헤더 배경색 테스트용입니다.*/
`;

// 로고 스타일 (vw, vh 사용)
const Logo = styled.img`
  width: 33vw;
  // margin-left: 1vw;
  // align-self: flex-start;
`;

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
      <Header>
        <Logo src={TokimLogo} alt="Tokim Logo" />
        {!shouldHideComponents && <Sidebar />} {/* 조건부 렌더링 */}
      </Header>
      {children} {/* 페이지 내용 */}
      {!shouldHideComponents && <BottomTab />} {/* 조건부 렌더링 */}
    </>
  );
};

export default Layout;
