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
  outline: none; /* 포커스 시 파란색 박스 제거 */
`;

interface LandInfo {
  landId: string;
  landDistrictCode: number;
  landDistrict: string;
  landAddress: string;
  landAddressName: string;
  landScale: number;
  landUse: string;
  landUseStatus: string;
  landGradient: string;
  landRoad: string;
  landPrice: number;
  landDanger: number;
}
function InvestmentRegistrationPage() {
  const [activeTab, setActiveTab] = useState('landInfo');
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 저장해야할 4가지 state 상태
  // 주소정보
  const [address, setAddress] = useState('');
  // 주소에 대한 땅정보
  const [landInfo, setLandInfo] = useState<LandInfo | null>(null);
  // 작성자가 작성한 땅 정보
  const [expectedArea, setExpectedArea] = useState<number | ''>(''); // State for expected area
  const [expectedPrice, setExpectedPrice] = useState<number | ''>(''); // State for expected price

  // 체크리스트 체크한것저장
  const [check, setCheck] = useState<number[]>([]);
  // 사연 저장
  const [story, setStory] = useState('');

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
    // 서버로 POST 요청 보내는 로직 구현
    console.log({ address, landInfo, check, story });

    navigate('/investment'); // /investment 경로로 이동
  };

  return (
    <Container>
      <TabsContainer>
        <TabItem $isActive={activeTab === 'landInfo'}>1. 토지 정보</TabItem>
        <TabItem $isActive={activeTab === 'checklist'}>2. 체크리스트</TabItem>
        <TabItem $isActive={activeTab === 'storyWriting'}>3. 사연 작성</TabItem>
      </TabsContainer>

      {activeTab === 'landInfo' && (
        <LandInformationRegistrationTab
          onNext={handleNextFromLandInfo}
          address={address}
          setAddress={setAddress}
          landInfo={landInfo}
          setLandInfo={setLandInfo}
          expectedArea={expectedArea}
          setExpectedArea={setExpectedArea}
          expectedPrice={expectedPrice}
          setExpectedPrice={setExpectedPrice}
        />
      )}
      {activeTab === 'checklist' && (
        <ChecklistRegistrationTab
          onNext={handleNextFromChecklist}
          onPrevious={handlePreviousFromChecklist} // 이전 버튼 기능 추가
          check={check}
          setCheck={setCheck}
        />
      )}
      {activeTab === 'storyWriting' && (
        <StoryWritingRegistrationTab
          onPrevious={handlePreviousFromStoryWriting} // 이전 버튼 기능 추가
          onRegister={handleRegister} // 등록 버튼 기능 추가
          story={story}
          setStory={setStory}
        />
      )}
    </Container>
  );
}

export default InvestmentRegistrationPage;
