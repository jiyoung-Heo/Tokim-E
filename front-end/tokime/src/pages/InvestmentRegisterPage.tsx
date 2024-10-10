import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import LandInformationRegistrationTab from '../components/Tabs/LandInformationRegistrationTab';
import ChecklistRegistrationTab from '../components/Tabs/ChecklistRegistrationTab';
import StoryWritingRegistrationTab from '../components/Tabs/StoryWritingRegistrationTab';
import { registInvestLand } from '../api/landInvestAxios';
import LandInformationRegistrationModal from '../components/modals/LandInformationRegistrationModal';

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
  margin-bottom: 3vh;
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => (props.$isActive ? '#27C384' : '#000')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  border-bottom: ${(props) =>
    props.$isActive ? '2px solid #27C384' : '2px solid #ddd'};
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
  const [modalMessage, setModalMessage] = useState<string>(''); // 모달 메시지
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 열림 상태

  // 저장해야할 4가지 state 상태
  // 주소정보
  const [address, setAddress] = useState('');
  // 주소에 대한 땅정보
  const [landInfo, setLandInfo] = useState<LandInfo | null>(null);
  // 작성자가 작성한 땅 정보
  const [expectedArea, setExpectedArea] = useState<number | ''>(''); // State for expected area
  const [expectedPrice, setExpectedPrice] = useState<number | ''>(''); // State for expected price
  const [expectedLandNickname, setExpectedLandNickname] = useState<string | ''>(
    '',
  );

  // 체크리스트 체크한것저장
  const [check, setCheck] = useState<number[]>([]);

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

  const handleRegister = async () => {
    // 서버로 POST 요청 보내는 로직 구현
    // console.log(stor.length);
    const defaultLandInfo = {
      landGradient: '', // 기본값으로 빈 문자열 또는 기본적인 지형 값 설정
      landPrice: 0, // 기본 가격을 0으로 설정
      landRoad: '', // 기본 도로 정보를 빈 문자열로 설정
      landUseStatus: '', // 기본 용도 상태 설정
      landDanger: 0, // 기본 안전도 값을 0으로 설정
    };

    const finalLandInfo = landInfo || defaultLandInfo;
    // console.log({ address, landInfo, check });
    if (expectedArea === '') {
      setModalMessage('구매 예정 평수를 입력해주세요.');
      setIsModalOpen(true);
      return;
    }

    if (expectedPrice === '') {
      setModalMessage('구매 예정 가격을 입력해주세요.');
      setIsModalOpen(true);
      return;
    }

    const investmentData = {
      landAddress: address, // 주소
      landGradient: finalLandInfo.landGradient, // 지형
      landPrice: finalLandInfo.landPrice, // 가격
      landRoad: finalLandInfo.landRoad, // 도로
      landUseStatus: finalLandInfo.landUseStatus, // 용도 상태
      landStory: '', // 사연
      plannedLandPyeong: expectedArea, // 투자 예정 평수
      plannedLandPrice: expectedPrice, // 투자 예정 가격
      checkedCount: check.length, // 체크된 항목 개수
      checklistIds: check, // 체크된 체크리스트 ID 배열
      landNickname: expectedLandNickname,
      landDanger: finalLandInfo.landDanger,
    };

    try {
      const result = await registInvestLand(investmentData); // POST 요청
      if (result) {
        setModalMessage('투자 예정지 등록이 완료되었습니다!');
        setIsModalOpen(true);
        navigate('/investment');
      } else {
        setModalMessage('등록에 실패했습니다. 다시 시도해주세요.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      setModalMessage('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  return (
    <Container>
      <TabsContainer>
        <TabItem $isActive={activeTab === 'landInfo'}>1. 토지 정보</TabItem>
        <TabItem $isActive={activeTab === 'checklist'}>2. 체크리스트</TabItem>
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
          expectedLandNickname={expectedLandNickname}
          setExpectedLandNickname={setExpectedLandNickname}
        />
      )}
      {activeTab === 'checklist' && (
        <ChecklistRegistrationTab
          onNext={handleRegister}
          onPrevious={handlePreviousFromChecklist} // 이전 버튼 기능 추가
          check={check}
          setCheck={setCheck}
        />
      )}
      {isModalOpen && (
        <LandInformationRegistrationModal
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
}

export default InvestmentRegistrationPage;
