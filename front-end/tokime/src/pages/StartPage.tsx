import React from 'react';

function StartPage() {
  // 환경 변수에서 API URL 가져오기
  const kakaoLoginUrl = `${process.env.REACT_APP_CUSTOM_KEY}/oauth2/authorization/kakao`;
  const googleLoginUrl = `${process.env.REACT_APP_CUSTOM_KEY}/oauth2/authorization/google`;

  // 카카오 로그인 처리
  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
    window.location.href = kakaoLoginUrl;
  };

  // 구글 로그인 처리
  const handleGoogleLogin = () => {
    console.log('구글 로그인');
    window.location.href = googleLoginUrl;
  };

  // 비회원으로 시작 처리
  const handleGuestLogin = () => {
    console.log('비회원으로 시작');
    // 비회원 시작 처리 로직 (e.g., 메인 페이지로 이동)
    window.location.href = '/main';
  };

  return (
    <div className="start-page">
      <h1>앱에 오신 것을 환영합니다</h1>
      <button type="button" onClick={handleKakaoLogin}>
        카카오 로그인
      </button>
      <button type="button" onClick={handleGoogleLogin}>
        구글 로그인
      </button>
      <button type="button" onClick={handleGuestLogin}>
        비회원으로 시작
      </button>
    </div>
  );
}

export default StartPage;
