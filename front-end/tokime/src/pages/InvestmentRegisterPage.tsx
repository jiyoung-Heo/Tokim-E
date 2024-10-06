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
  background-color: #f3f7fb;
  border-bottom: 1px solid #ddd;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px;
  text-align: center;
  flex: 1;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#27C384' : '#000')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.active ? '2px solid #27C384' : 'none')};
  opacity: ${(props) => (props.active ? 0.6 : 1)};
  pointer-events: ${(props) => (props.active ? 'none' : 'auto')};
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
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
    <div>
      <h2>투자 예정지</h2>
      <Tabs>
        <TabButton
          active={activeTab === 'landInfo'}
          onClick={() => {
            if (activeTab !== 'landInfo') {
              setActiveTab('landInfo'); // Switch to land info tab if not already active
            }
          }}
        >
          토지 정보
        </TabButton>
        <TabButton
          active={activeTab === 'checklist'}
          onClick={() => {
            if (activeTab !== 'checklist') {
              setActiveTab('checklist'); // Switch to checklist tab if not already active
            }
          }}
        >
          체크리스트
        </TabButton>
        <TabButton
          active={activeTab === 'storyWriting'}
          onClick={() => {
            if (activeTab !== 'storyWriting') {
              setActiveTab('storyWriting'); // Switch to story writing tab if not already active
            }
          }}
        >
          사연 작성
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
