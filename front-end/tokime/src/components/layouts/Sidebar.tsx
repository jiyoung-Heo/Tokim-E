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
  right: ${(props) => (props.$isOpen ? '0' : '-300px')};
  width: 180px;
  height: calc(100% - 75px);
  background-color: white;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;

// 사이드바 아이콘 정의
const SidebarIcon = styled.img<{ $isOpen: boolean }>`
  position: fixed;
  top: 47px;
  right: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 2000;
  display: ${(props) => (props.$isOpen ? 'none' : 'block')};
`;

// 로고 스타일 정의
const Logo = styled.img`
  display: block;
  margin: 20px auto;
  width: 120px;
  top: 10px;
`;

// 점수와 백분위
const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

// 점수 텍스트 스타일
const Score = styled.p`
  font-size: 20px;
  font-weight: bold;
  position: relative;
  top: -20px;
`;

// 백분위 텍스트 스타일
const Percentile = styled.p`
  font-size: 10px;
  color: #333333;
  position: relative;
  top: -20px;
`;

// 사용자 정보 섹션
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -20px;
`;

const UserName = styled.p`
  font-size: 14px;
  margin-bottom: 10px; /* 추가: 로그인 해주세요 텍스트 밑에 10px 마진 */
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`;

const Divider = styled.hr`
  width: calc(100% - 10px);
  border: none;
  border-top: 2px solid #000000;
  margin: 5px 0;
`;

// 버튼 스타일 정의
const Button = styled.button<{ $bgColor: string; $boxShadow?: string }>`
  width: 90%;
  margin: 10px auto;
  background-color: ${(props) => props.$bgColor};
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.$boxShadow || 'none'};
`;

const ButtonText = styled.span`
  margin-left: 10px;
  color: #000000;
`;

// 모달 스타일 정의
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* 사이드바보다 큰 z-index 값 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2100; /* 모달 내용도 사이드바보다 위에 있도록 설정 */
`;
const ModalButtonList = styled.div`
  display: flex;
  justify-content: space-evenly; /* 버튼 사이의 공간을 균등하게 배분 */
`;

const ModalButton = styled.button`
  margin-top: 10px;
  width: 37%;
  background-color: #00c99c;
  color: white;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  // const modalBackground = useRef();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const score = isLoggedIn ? 50 : 0; // 로그인 여부에 따라 점수 설정
  const navigate = useNavigate();

  const kakaoLoginUrl = `${process.env.REACT_APP_CUSTOM_KEY}/oauth2/authorization/kakao`;
  const googleLoginUrl = `${process.env.REACT_APP_CUSTOM_KEY}/oauth2/authorization/google`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !modalOpen // 모달이 열려 있을 경우 사이드바 닫기 방지
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setModalOpen(false); // 모달 닫기
  };

  const handleNavigateToLogin = () => {
    navigate('/login-required'); // LoginRequiredPage로 이동
  };

  return (
    <>
      <SidebarIcon
        src={sidebarIcon}
        alt="Sidebar Icon"
        onClick={toggleSidebar}
        $isOpen={isSidebarOpen}
      />
      <SidebarContainer ref={sidebarRef} $isOpen={isSidebarOpen}>
        <Logo src={TokimLogo} alt="Tokim Logo" />
        {isLoggedIn ? (
          <>
            <GaugeWrapper>
              {/* Graph 컴포넌트를 사용하여 게이지 표시 */}
              <Graph score={score} />
              <Score>{score}점</Score>
              <Percentile>상위 XX%</Percentile> {/* score 대신 백분위로 변경 */}
            </GaugeWrapper>

            <UserInfo>
              <Icon src={sidebarUser} alt="유저 아이콘" />
              <UserName>홍길동</UserName>
              <Divider />
              <Icon src={sidebarEmail} alt="이메일 아이콘" />
              <p>abcd@kakao.com</p>
              <Divider />
              <Icon src={sidebarPhone} alt="전화번호 아이콘" />
              <p>010-1234-1234</p>
              <Divider />
            </UserInfo>

            <Button $bgColor="#00C99C" onClick={() => navigate('/my-page')}>
              마이페이지
            </Button>
            <Button $bgColor="#00C99C" onClick={() => setModalOpen(true)}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <GaugeWrapper>
              <Graph score={score} />
              <Icon
                src={sidebarUser}
                alt="유저 아이콘"
                onClick={handleNavigateToLogin}
              />
              <UserName onClick={handleNavigateToLogin}>
                로그인 해주세요
              </UserName>
            </GaugeWrapper>

            <UserInfo>
              <Divider />
              <Icon src={sidebarEmail} alt="이메일 아이콘" />
              <p>e-mail</p>
              <Divider />
              <Icon src={sidebarPhone} alt="전화번호 아이콘" />
              <p>010-xxxx-xxxx</p>
              <Divider />
            </UserInfo>

            {/* 카카오 로그인 버튼 */}
            <Button $bgColor="#FEE500" onClick={handleKakaoLogin}>
              <Icon src={KakaoIcon} alt="카카오 아이콘" />
              <ButtonText>카카오로 로그인</ButtonText>
            </Button>

            {/* 구글 로그인 버튼 */}
            <Button
              $bgColor="#FFFFFF"
              $boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              onClick={handleGoogleLogin}
            >
              <Icon src={GoogleIcon} alt="구글 아이콘" />
              <ButtonText>구글로 로그인</ButtonText>
            </Button>
          </>
        )}
      </SidebarContainer>

      {/* 모달 추가 */}
      {modalOpen && (
        <ModalContainer onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>로그아웃하시겠습니까?</h3>
            <ModalButtonList>
              <ModalButton onClick={handleLogout}>확인</ModalButton>
              <ModalButton onClick={() => setModalOpen(false)}>
                취소
              </ModalButton>
            </ModalButtonList>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default Sidebar;
