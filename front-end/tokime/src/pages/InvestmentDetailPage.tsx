// src/pages/InvestmentDetailPage.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import LandInformationTab from '../components/Tabs/LandInformationTab';
import ChecklistTab from '../components/Tabs/ChecklistTab';
import StoryAdviceTab from '../components/Tabs/StoryAdviceTab';
import LandDetailTab from '../components/Tabs/LandDetailTab';
import {
  getInvestChecklistDetail,
  getInvestDetail,
} from '../api/landInvestAxios';

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
interface ChecklistItem {
  checklistId: number;
  content: string;
}
interface InvestmentInfo {
  investmentPlannedLandId: number;
  landAddress: string;
  landCreatedAt: string;
  landDanger: number;
  landGradient: string;
  landNickname: string | null;
  landOwner: string;
  landPrice: number;
  landRoad: string;
  landStory: string;
  landUpdatedAt: string;
  landUseStatus: string;
  plannedLandPrice: number;
  plannedLandPyeong: number;
  userId: number;
  checkedCount: number;
  checklistIds: number[] | null;
}
function InvestmentDetailPage() {
  const { invest = '' } = useParams<{ invest: string }>();

  const [activeTab, setActiveTab] = useState('landInfo');
  const [investmentInfo, setInvestmentInfo] = useState<InvestmentInfo>();
  // 체크리스트 체크한것저장
  const [check, setCheck] = useState<number[]>([]);
  useEffect(() => {
    const fetchInvestmentData = async () => {
      const data = await getInvestDetail(invest);
      if (data) {
        setInvestmentInfo(data);
      }
    };
    fetchInvestmentData();
    const fetchInvestmentChecklistData = async () => {
      const data = await getInvestChecklistDetail(invest);
      if (data) {
        const checklistIds: number[] = data.map(
          (item: ChecklistItem) => item.checklistId,
        );

        setCheck(checklistIds);
      }
    };
    fetchInvestmentChecklistData();
  }, []);

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
      {activeTab === 'checklist' && <ChecklistTab check={check} />}
      {activeTab === 'storyAdvice' && (
        <StoryAdviceTab
        // story={investmentInfo.landStory}
        />
      )}
    </div>
  );
}

export default InvestmentDetailPage;
