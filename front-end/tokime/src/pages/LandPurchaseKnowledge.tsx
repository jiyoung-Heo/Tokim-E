import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import styled from 'styled-components';
import LandPurchaseProcedureTab from '../components/Tabs/LandPurchaseProcedureTab';
import EssentialKnowledgeTab from '../components/Tabs/EssentialKnowledgeTab';
import backIcon from '../assets/images/icon/left-actionable.png';

// 페이지 제목 스타일
const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;
// 탭 버튼을 감싸는 컨테이너
const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22vw; // 반응형 간격 설정 (80px)
  height: 6vh; // 반응형 높이 (39px)
  border-bottom: 0.27vh solid rgba(121, 121, 130, 0.1); // 아주 미세하게 두께 조정
`;

// 뒤로가기 아이콘 정의
const BackIcon = styled.img``;

// 탭 버튼 스타일
const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'KoddiUD OnGothic';
  font-size: 5.5vw; // 반응형 폰트 크기 (20px)
  font-weight: 700;
  line-height: 7vh; // 반응형 라인 높이 (24px)
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
    width: 36vw; // 반응형 보더라인 길이 (130px)
    height: 0.27vh; // 미세하게 두께 조정
    background-color: ${(props) => (props.$active ? '#27C384' : 'transparent')};
    bottom: 0.4vh; // 미세하게 위치 조정
    left: 50%;
    transform: translateX(-50%);
  }
`;
// 버튼 스타일
const QuizButton = styled.button`
  width: 83.3vw; // 반응형 너비 (300px)
  height: 7.8vh; // 반응형 높이 (50px)
  background: #27c384;
  border-radius: 3.125vh; // 반응형 보더 (20px)
  border: none;
  cursor: pointer;

  // 텍스트 스타일
  font-family: 'KoddiUD OnGothic';
  font-style: normal;
  font-weight: 700;
  font-size: 3.88vw; // 반응형 폰트 크기 (14px)
  line-height: 2.65vh; // 반응형 라인 높이 (17px)
  color: #ffffff;

  &:hover {
    background-color: #1ea873; // hover 시 조금 더 어두운 녹색
  }
`;
// 버튼을 감싸는 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5vh;
`;

function LandPurchaseKnowledge() {
  const [activeTab, setActiveTab] = useState<string>('purchaseProcedure');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const goBack = () => {
    // navigate(-1); // 이전 페이지로 이동
    navigate('/main');
  };

  return (
    <div>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        토지 구매 상식
      </Title>

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
      <ButtonContainer>
        <QuizButton onClick={() => navigate('/land-purchase-quiz')}>
          토지 구매 상식 문제 풀어보기!
        </QuizButton>
      </ButtonContainer>
    </div>
  );
}

export default LandPurchaseKnowledge;
