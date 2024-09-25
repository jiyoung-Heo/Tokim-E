import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  const navigate = useNavigate(); // navigate 사용

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

      {activeTab === 'landInfo' && <LandInformationRegistrationTab />}
      {activeTab === 'checklist' && <ChecklistRegistrationTab />}
      {activeTab === 'storyWriting' && <StoryWritingRegistrationTab />}

      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={() => console.log('등록 완료')}>
          등록
        </button>
        {/* window.history.back 대신 navigate 사용 */}
        <button type="button" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
}

export default InvestmentRegistrationPage;
