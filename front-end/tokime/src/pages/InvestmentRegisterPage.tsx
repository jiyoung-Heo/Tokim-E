import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import LandInformationRegistrationTab from '../components/Tabs/LandInformationRegistrationTab';
import ChecklistRegistrationTab from '../components/Tabs/ChecklistRegistrationTab';
import StoryWritingRegistrationTab from '../components/Tabs/StoryWritingRegistrationTab';

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#007bff' : '#f3f7fb')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
    <div>
      <h2>투자 예정지 등록</h2>
      <Tabs>
        <TabButton
          active={activeTab === 'landInfo'}
          onClick={() => setActiveTab('landInfo')}
        >
          토지 정보 등록
        </TabButton>
        <TabButton
          active={activeTab === 'checklist'}
          onClick={() => setActiveTab('checklist')}
        >
          체크리스트 등록
        </TabButton>
        <TabButton
          active={activeTab === 'storyWriting'}
          onClick={() => setActiveTab('storyWriting')}
        >
          사연 작성 등록
        </TabButton>
      </Tabs>

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
    </div>
  );
}

export default InvestmentRegistrationPage;
