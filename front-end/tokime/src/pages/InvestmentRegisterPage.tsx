import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import LandInformationRegistrationTab from '../components/Tabs/LandInformationRegistrationTab';
import ChecklistRegistrationTab from '../components/Tabs/ChecklistRegistrationTab';
import StoryWritingRegistrationTab from '../components/Tabs/StoryWritingRegistrationTab';

// 필요한 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

// 탭 스타일
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f3f7fb;
  border-bottom: 1px solid #ddd;
  margin-bottom: 3vh;
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => (props.$isActive ? '#27C384' : '#000')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.$isActive ? '2px solid #27C384' : 'none')};
  cursor: pointer;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #219a6d;
  }
`;

function InvestmentRegistrationPage() {
  const [activeTab, setActiveTab] = useState('landInfo');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleNextFromLandInfo = () => {
    setActiveTab('checklist'); // 체크리스트 등록 탭 활성화
  };

  const handleNextFromChecklist = () => {
    setActiveTab('storyWriting'); // 사연 작성 등록 탭 활성화
  };

  const handlePreviousFromChecklist = () => {
    setActiveTab('landInfo'); // 토지 정보 등록 탭 활성화
  };

  const handlePreviousFromStoryWriting = () => {
    setActiveTab('checklist'); // 체크리스트 등록 탭 활성화
  };

  const handleRegister = () => {
    // axios POST 요청을 보낼 수 있습니다.
    // 추후에 구현할 부분
    navigate('/investment'); // /investment 경로로 이동
  };

  return (
    <Container>
      <TabsContainer>
        <TabItem
          $isActive={activeTab === 'landInfo'}
          onClick={() => setActiveTab('landInfo')}
        >
          1. 토지 정보
        </TabItem>
        <TabItem
          $isActive={activeTab === 'checklist'}
          onClick={() => setActiveTab('checklist')}
        >
          2. 체크리스트
        </TabItem>
        <TabItem
          $isActive={activeTab === 'storyAdvice'}
          onClick={() => setActiveTab('storyAdvice')}
        >
          3. 사연 작성
        </TabItem>
      </TabsContainer>

      {activeTab === 'landInfo' && (
        <LandInformationRegistrationTab onNext={handleNextFromLandInfo} />
      )}
      {activeTab === 'checklist' && (
        <ChecklistRegistrationTab
          onNext={handleNextFromChecklist}
          onPrevious={handlePreviousFromChecklist} // 이전 버튼 기능 추가
        />
      )}
      {activeTab === 'storyWriting' && (
        <StoryWritingRegistrationTab
          onPrevious={handlePreviousFromStoryWriting} // 이전 버튼 기능 추가
          onRegister={handleRegister} // 등록 버튼 기능 추가
        />
      )}
    </Container>
  );
}

export default InvestmentRegistrationPage;
