import React, { useState } from 'react';
import styled from 'styled-components';
import MyLandScoreTab from '../components/Tabs/MyLandScoreTab';
import AnalysisTab from '../components/Tabs/AnalysisTab';
import LandScoreModal from '../components/Modals/LandScoreModal'; // 모달 컴포넌트

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

function LandScorePage() {
  const [activeTab, setActiveTab] = useState<string>('myLandScore');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Tabs>
        <TabButton
          active={activeTab === 'myLandScore'}
          onClick={() => setActiveTab('myLandScore')}
        >
          나의 토지점수
        </TabButton>
        <TabButton
          active={activeTab === 'analysis'}
          onClick={() => setActiveTab('analysis')}
        >
          분석
        </TabButton>
      </Tabs>

      {/* 각 탭에 해당하는 내용 */}
      {activeTab === 'myLandScore' && (
        <MyLandScoreTab onOpenModal={toggleModal} />
      )}
      {activeTab === 'analysis' && <AnalysisTab />}

      {/* 모달 */}
      {isModalOpen && <LandScoreModal onClose={toggleModal} />}
    </div>
  );
}

export default LandScorePage;
