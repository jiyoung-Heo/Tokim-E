import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  // 함수 선언식으로 변경
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
    navigate('/main');
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인');
    navigate('/main');
  };

  const handleGuestLogin = () => {
    console.log('비회원으로 시작');
    navigate('/main');
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
