// src/pages/InvestmentDetailPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LandInformationTab from '../components/Tabs/LandInformationTab';
import ChecklistTab from '../components/Tabs/ChecklistTab';
import StoryAdviceTab from '../components/Tabs/StoryAdviceTab';
import LandDetailTab from '../components/Tabs/LandDetailTab';

// 탭 스타일
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f3f7fb;
  border-bottom: 1px solid #ddd;
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: ${(props) => (props.$isActive ? '#27C384' : '#000')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.$isActive ? '2px solid #27C384' : 'none')};
  cursor: pointer;
`;

function InvestmentDetailPage() {
  const [activeTab, setActiveTab] = useState('landInfo');

  return (
    <div>
      <TabsContainer>
        <TabItem
          $isActive={activeTab === 'landInfo'}
          onClick={() => setActiveTab('landInfo')}
        >
          토지 정보
        </TabItem>
        <TabItem
          $isActive={activeTab === 'checklist'}
          onClick={() => setActiveTab('checklist')}
        >
          체크리스트
        </TabItem>
        <TabItem
          $isActive={activeTab === 'storyAdvice'}
          onClick={() => setActiveTab('storyAdvice')}
        >
          사연과 조언
        </TabItem>
      </TabsContainer>

      {activeTab === 'landInfo' && <LandDetailTab />}
      {activeTab === 'checklist' && <ChecklistTab />}
      {activeTab === 'storyAdvice' && <StoryAdviceTab />}
    </div>
  );
}

export default InvestmentDetailPage;
