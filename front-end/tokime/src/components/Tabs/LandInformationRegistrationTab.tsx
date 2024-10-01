import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LandInformationRegistrationTabProps {
  onNext: () => void; // onNext prop의 타입 정의
}

function LandInformationRegistrationTab({
  onNext,
}: LandInformationRegistrationTabProps) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleCancel = () => {
    navigate('/investment'); // /investment 경로로 이동
  };

  return (
    <div>
      <h3>토지 정보 등록 탭 내용</h3>
      {/* 여기에 폼이나 내용을 추가하세요 */}
      <div>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button type="button" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default LandInformationRegistrationTab;
