import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import KakaoIcon from '../assets/images/icon/kakao.svg'; // 이미지 import
import GoogleIcon from '../assets/images/icon/Google.png'; // 이미지 import
import LogoImage from '../assets/images/Tokimlogo.png'; // 로고 이미지 import

// 페이지 전체의 스타일 설정
const LoginPageStyle = createGlobalStyle`
  body {
    background-color: white;
  }
`;

// 이미지와 버튼 스타일 정의
const LoginRequiredPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 170px;
  height: 170px;
  margin-bottom: 75px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 25px;
  font-weight: 700;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 15px;
  text-align: center;
  color: #797982;
  top: 60px;
  font-weight: 400;
  margin-bottom: 25px;
`;

const Button = styled.button<{ $bgColor: string }>`
  width: 280px;
  height: 42px;
  margin-top: 10px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => (props.$bgColor === '#FEE500' ? '#000' : '#000')};
  border: none;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ButtonText = styled.span`
  flex: 1;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
`;

function LoginRequiredPage() {
  const kakaoLoginUrl = `${process.env.REACT_APP_CUSTOM_KEY}/oauth2/authorization/kakao`;
  const googleLoginUrl = `${process.env.REACT_APP_CUSTOM_KEY}/oauth2/authorization/google`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <>
      <LoginPageStyle />
      <LoginRequiredPageContainer>
        <SubTitle>로그인 후 더 많은 기능이 준비되어 있어요 !</SubTitle>
        <Title>로그인하고 계속하기</Title>
        <Logo src={LogoImage} alt="토킴 로고" />

        <Button $bgColor="#FEE500" onClick={handleKakaoLogin}>
          <Icon src={KakaoIcon} alt="카카오 아이콘" />
          <ButtonText>카카오로 로그인</ButtonText>
        </Button>

        <Button $bgColor="#FFFFFF" onClick={handleGoogleLogin}>
          <Icon src={GoogleIcon} alt="구글 아이콘" />
          <ButtonText>구글로 로그인</ButtonText>
        </Button>
      </LoginRequiredPageContainer>
    </>
  );
}

export default LoginRequiredPage;
