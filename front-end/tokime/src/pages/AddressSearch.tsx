import React, { useState } from 'react';
import styled from 'styled-components';
import LandDetailTab from '../components/Tabs/LandDetailTab';
import OrdinanceInfoTab from '../components/Tabs/OrdinanceInfoTab';
import RiskMapTab from '../components/Tabs/RiskMapTab';

// 검색창 스타일
const SearchContainer = styled.div`
  padding: 10px;
  background-color: #f3f7fb;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

// 탭 스타일
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => (props.$isActive ? '#007bff' : '#000')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.$isActive ? '2px solid #007bff' : 'none')};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
`;

function AddressSearch() {
  const [activeTab, setActiveTab] = useState('landInfo');

  return (
    <>
      <SearchContainer>
        <SearchInput type="text" placeholder="주소를 입력하세요." />
      </SearchContainer>

      <TabsContainer>
        <TabItem
          $isActive={activeTab === 'landInfo'}
          onClick={() => setActiveTab('landInfo')}
        >
          토지 상세 정보
        </TabItem>
        <TabItem
          $isActive={activeTab === 'riskMap'}
          onClick={() => setActiveTab('riskMap')}
        >
          위험지도
        </TabItem>
        <TabItem
          $isActive={activeTab === 'regionalInfo'}
          onClick={() => setActiveTab('regionalInfo')}
        >
          지역별 조례정보
        </TabItem>
      </TabsContainer>

      <Content>
        {activeTab === 'landInfo' && <LandDetailTab />}
        {activeTab === 'riskMap' && <RiskMapTab />}
        {activeTab === 'regionalInfo' && <OrdinanceInfoTab />}
      </Content>
    </>
  );
}

export default AddressSearch;
