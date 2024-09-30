import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import styled from 'styled-components';
import LandPurchaseProcedureTab from '../components/Tabs/LandPurchaseProcedureTab';
import EssentialKnowledgeTab from '../components/Tabs/EssentialKnowledgeTab';

// 페이지 제목 스타일
const Title = styled.h2`
  position: absolute;
  left: 40px;
  top: 40px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
`;

// 탭 버튼을 감싸는 컨테이너
const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px; // 탭 사이 간격 80px
  width: 360px;
  height: 39px;
  position: absolute;
  top: 100px;
  left: 0;
  border-bottom: 2px solid rgba(121, 121, 130, 0.1); // 기본 보더라인
`;

// 탭 버튼 스타일
const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'KoddiUD OnGothic';
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => (props.$active ? '#333333' : '#797982')};
  position: relative;
  padding: 0;

  &:hover {
    color: #333333;
  }

  // 탭이 활성화되었을 때 아래쪽 보더라인 표시
  &::after {
    content: '';
    position: absolute;
    width: 130px; // 선택된 탭 하단 보더라인 길이
    height: 2px;
    background-color: ${(props) => (props.$active ? '#27C384' : 'transparent')};
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

// 버튼 스타일
const QuizButton = styled.button`
  position: absolute;
  width: 300px;
  height: 50px;
  left: 32px;
  top: 565px;
  background: #27c384;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  // 텍스트 스타일
  font-family: 'KoddiUD OnGothic';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;

  &:hover {
    background-color: #1ea873; // hover 시 조금 더 어두운 녹색
  }
`;

function LandPurchaseKnowledge() {
  const [activeTab, setActiveTab] = useState<string>('purchaseProcedure');
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div>
      <Title>용어 상세 설명</Title>

      <TabsContainer>
        <TabButton
          $active={activeTab === 'purchaseProcedure'}
          onClick={() => setActiveTab('purchaseProcedure')}
        >
          구매 절차
        </TabButton>
        <TabButton
          $active={activeTab === 'essentialKnowledge'}
          onClick={() => setActiveTab('essentialKnowledge')}
        >
          필수 상식
        </TabButton>
      </TabsContainer>

      {activeTab === 'purchaseProcedure' && <LandPurchaseProcedureTab />}
      {activeTab === 'essentialKnowledge' && <EssentialKnowledgeTab />}

      {/* 문제 풀어보기 버튼 */}
      <QuizButton onClick={() => navigate('/land-purchase-quiz')}>
        토지 구매 상식 문제 풀어보기!
      </QuizButton>
    </div>
  );
}

export default LandPurchaseKnowledge;
