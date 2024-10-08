import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import KakaoIcon from '../assets/images/icon/kakao.svg'; // 이미지 import
import GoogleIcon from '../assets/images/icon/Google.png'; // 이미지 import
import TokimeIcon from '../assets/images/icon/Tokime.png'; // 이미지 import
import LogoImage from '../assets/images/Tokimlogo.png'; // 로고 이미지 import
import { persistor } from '../redux/reduxStore';

// 이미지와 버튼 스타일 정의
const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-top: 125px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 800; /* 굵기 강제 설정 */
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 15px;
  text-align: center;
  color: #555;
  margin-bottom: 30px;
  font-weight: 400;
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
  left: 10px; /* 왼쪽에서 10px 떨어짐 */
`;

function StartPage() {
  const userInfo = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const kakaoLoginUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  const googleLoginUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const handleGuestLogin = () => {
    persistor.purge();
    dispatch({ type: 'RESET_ALL' });
    window.location.href = '/main';
  };

  useEffect(() => {
    // 이메일이 존재하면 메인페이지로 이동
    if (userInfo.email) {
      const timeoutId = setTimeout(() => {
        navigate('/main');
      }, 0); // 즉시 이동하도록 설정

      return () => clearTimeout(timeoutId); // 클린업 함수
    }
    return undefined;
  }, [userInfo.email, navigate]);

  return (
    <StartPageContainer>
      <Logo src={LogoImage} alt="토킴 로고" />

      <Title>토지 개발은 토킴이</Title>
      <SubTitle>
        토지 정보부터 사기 위험도까지,
        <br />
        구매 매물 정보를 분석하고 안전하게 구매하세요!
      </SubTitle>

      <Button $bgColor="#FEE500" onClick={handleKakaoLogin}>
        <Icon src={KakaoIcon} alt="카카오 아이콘" />
        <ButtonText>카카오로 시작하기</ButtonText>
      </Button>

      <Button $bgColor="#FFFFFF" onClick={handleGoogleLogin}>
        <Icon src={GoogleIcon} alt="구글 아이콘" />
        <ButtonText>구글로 시작하기</ButtonText>
      </Button>

      <Button $bgColor="#FFFFFF" onClick={handleGuestLogin}>
        <Icon src={TokimeIcon} alt="토킴이 아이콘" />
        <ButtonText>비회원으로 시작하기</ButtonText>
      </Button>
    </StartPageContainer>
  );
}

export default StartPage;
