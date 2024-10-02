import React, { useState } from 'react';
import styled from 'styled-components';
import MyLandScoreTab from '../components/Tabs/MyLandScoreTab';
import AnalysisTab from '../components/Tabs/AnalysisTab';

// 탭 버튼을 감싸는 컨테이너
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around; // 각 탭 버튼이 동일한 간격으로 배치되도록 설정
  align-items: center;
  width: 100vw;
  height: 6vh; // 반응형 높이 (39px)
  position: absolute;
  top: 15.6vh; // 100px을 vh로 환산
  left: 0;
  border-bottom: 2px solid rgba(121, 121, 130, 0.1); // 아주 미세하게 두께 조정
  z-index: 10;
`;

// 탭 버튼 스타일
const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'KoddiUD OnGothic';
  font-size: 5.5vw; // 반응형 폰트 크기
  font-weight: 700;
  line-height: 7vh; // 반응형 라인 높이
  letter-spacing: 0.5px;
  color: ${(props) => (props.$active ? '#333333' : '#797982')};
  position: relative;
  padding: 10px 0; // 클릭 가능한 영역 확장
  z-index: 101;
  flex: 1; // 각 탭 버튼이 동일한 공간을 차지하도록 설정

  &:hover {
    color: #333333;
  }

  // 탭이 활성화되었을 때 아래쪽 보더라인 표시
  &::after {
    content: '';
    position: absolute;
    width: 40vw; // 뷰포트 너비 기준으로 반응형 설정
    height: 2px; // 고정된 보더라인 두께
    background-color: ${(props) => (props.$active ? '#27C384' : 'transparent')};
    bottom: 12px; // 보더라인을 아래에 위치
    left: 50%;
    transform: translateX(-50%);
  }
`;

// 탭 내용이 들어가는 스크롤 가능한 컨테이너
const ContentContainer = styled.div`
  position: fixed; // 페이지가 아닌 탭 내용이 스크롤되도록 설정
  top: 21.6vh; // 탭 바로 아래에 위치하도록 조정
  left: 0;
  width: 100vw;
  height: 78.4vh; // 남은 공간을 탭 내용에 할당
  overflow-y: auto; // 수직 스크롤 허용
  padding: 20px;
  box-sizing: border-box;
`;

function LandScorePage() {
  const [activeTab, setActiveTab] = useState<string>('MyLandScoreTab');

  return (
    <div>
      <TabsContainer>
        {/* MyLandScoreTab 탭 */}
        <TabButton
          $active={activeTab === 'MyLandScoreTab'}
          onClick={() => setActiveTab('MyLandScoreTab')}
        >
          나의 토지점수
        </TabButton>

        {/* AnalysisTab 탭 */}
        <TabButton
          $active={activeTab === 'AnalysisTab'}
          onClick={() => setActiveTab('AnalysisTab')}
        >
          분석
        </TabButton>
      </TabsContainer>

      <ContentContainer>
        {/* 활성화된 탭에 따라 보여줄 컴포넌트 */}
        {activeTab === 'MyLandScoreTab' && <MyLandScoreTab />}
        {activeTab === 'AnalysisTab' && <AnalysisTab />}
      </ContentContainer>
    </div>
  );
}

export default LandScorePage;
