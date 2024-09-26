import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import sidebarIcon from '../../assets/images/icon/sidebar-icon.svg'; // 사이드바 아이콘 임포트

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.$isOpen ? '0' : '-300px')};
  width: 300px;
  height: calc(100% - 60px); /* 하단탭 공간을 침범하지 않도록 높이 설정 */
  background-color: white;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarIcon = styled.img<{ $isOpen: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 2000; /* 사이드바 아이콘이 항상 보이도록 */
  display: ${(props) =>
    props.$isOpen ? 'none' : 'block'}; /* 사이드바가 열리면 아이콘 숨기기 */
`;

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false); // 사이드바 바깥쪽을 클릭했을 때 닫기
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <SidebarIcon
        src={sidebarIcon}
        alt="Sidebar Icon"
        onClick={toggleSidebar}
        $isOpen={isSidebarOpen}
      />
      <SidebarContainer ref={sidebarRef} $isOpen={isSidebarOpen}>
        {/* 사이드바 내용 */}
        <p>토지 점수: 76점</p>
        <p>홍길동</p>
        <p>abcd@kakao.com</p>
        <p>010-1234-1234</p>
        <button type="button">회원가입</button>
        <button type="button">로그인</button>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
