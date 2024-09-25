import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 투자 예정지 스타일
const InvestItem = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 투자 예정지 등록 버튼 스타일
const RegisterButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 800; /* z-index 추가 */
`;

function InvestmentPage() {
  const navigate = useNavigate();

  // 투자 예정지 아이템 클릭 시 상세 페이지로 이동
  const handleItemClick = () => {
    navigate('/investment-detail'); // 투자 예정지 상세 페이지 경로로 이동
  };

  // 등록 버튼 클릭 시 투자 예정지 등록 페이지로 이동
  const handleRegisterClick = () => {
    navigate('/investment-register'); // 투자 예정지 등록 페이지 경로로 이동
  };

  return (
    <div>
      <h1>투자 예정지 페이지</h1>
      {/* 임시 데이터 1개 추가 */}
      <InvestItem onClick={handleItemClick}>
        서울시 강남구 테헤란로 123 (임시 데이터)
      </InvestItem>
      <RegisterButton onClick={handleRegisterClick}>
        투자 예정지 등록
      </RegisterButton>
    </div>
  );
}

export default InvestmentPage;
