// src/pages/InvestmentDetailPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LandInformationTab from '../components/Tabs/LandInformationTab';
import ChecklistTab from '../components/Tabs/ChecklistTab';
import StoryAdviceTab from '../components/Tabs/StoryAdviceTab';

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? '#007bff' : '#f3f7fb')};
  color: ${(props) => (props.$active ? '#fff' : '#000')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function InvestmentDetailPage() {
  const [activeTab, setActiveTab] = useState('landInfo');

  return (
    <div>
      <h2>투자 예정지 상세 정보</h2>
      <Tabs>
        <TabButton
          $active={activeTab === 'landInfo'}
          onClick={() => setActiveTab('landInfo')}
        >
          토지 정보
        </TabButton>
        <TabButton
          $active={activeTab === 'checklist'}
          onClick={() => setActiveTab('checklist')}
        >
          체크리스트
        </TabButton>
        <TabButton
          $active={activeTab === 'storyAdvice'}
          onClick={() => setActiveTab('storyAdvice')}
        >
          사연과 조언
        </TabButton>
      </Tabs>

      {activeTab === 'landInfo' && <LandInformationTab />}
      {activeTab === 'checklist' && <ChecklistTab />}
      {activeTab === 'storyAdvice' && <StoryAdviceTab />}
    </div>
  );
}

export default InvestmentDetailPage;
