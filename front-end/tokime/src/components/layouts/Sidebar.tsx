import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import sidebarIcon from '../../assets/images/icon/sidebar-icon.svg';
import TokimLogo from '../../assets/images/TokimEnglogo.png';
import sidebarUser from '../../assets/images/icon/sidebaruser.png';
import sidebarEmail from '../../assets/images/icon/sidebaremail.png';
import sidebarPhone from '../../assets/images/icon/sidebarphone.png';
import KakaoIcon from '../../assets/images/icon/kakao.svg'; // 카카오 아이콘 이미지
import GoogleIcon from '../../assets/images/icon/Google.png'; // 구글 아이콘 이미지
import Graph from '../charts/GaugeGraph'; // 이전에 만든 Graph 컴포넌트 가져오기

// 사이드바 전체 스타일 정의
const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) =>
    props.$isOpen ? '0' : '-50vw'}; /* 너비를 기준으로 열리고 닫히도록 설정 */
  width: 50vw;
  height: 90vh; /* 전체 화면 높이에 맞추기 */
  background-color: white;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  padding: 2.5vh 2vw; /* 사이드바 안쪽 패딩 조정 */
  box-sizing: border-box; /* 패딩을 포함한 크기 계산 */
`;

// 사이드바 아이콘 정의
const SidebarIcon = styled.img<{ $isOpen: boolean }>`
  position: fixed;
  top: 7.34vh;
  right: 5.56vw;
  width: 8vw;
  height: auto;
  cursor: pointer;
  z-index: 2000;
  display: ${(props) => (props.$isOpen ? 'none' : 'block')};
`;

const Button = styled.button<{ $bgColor: string; $boxShadow?: string }>`
  width: 80%;
  margin: 2vh auto;
  background-color: ${(props) => props.$bgColor};
  color: white;
  font-size: 4vw;
  font-weight: bold;
  padding: 2vh 0;
  border: none;
  border-radius: 2vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.$boxShadow || 'none'};
`;

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 사이드바가 열리면 스크롤을 비활성화하고, 닫히면 다시 활성화하는 useEffect
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 다시 활성화
    }
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트가 언마운트될 때 스크롤 다시 활성화
    };
  }, [isSidebarOpen]);

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
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
