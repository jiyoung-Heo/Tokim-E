import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import LandDetailTab from '../components/Tabs/LandDetailTab';
import OrdinanceInfoTab from '../components/Tabs/OrdinanceInfoTab';
import RiskMapTab from '../components/Tabs/RiskMapTab';
import { setLandAddress } from '../redux/slices/landAddressSlice'; // 액션 임포트
import { setLandDetails } from '../redux/slices/landInfoSlice'; // 액션 임포트
import { setLawInfo } from '../redux/slices/lawInfoSlice'; // 액션 임포트
import { getSearchLandInfo, getLandLawInfo } from '../api/landAxios'; // API 임포트

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
  const [searchValue, setSearchValue] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setErrorMessage(''); // 입력할 때 에러 메시지 초기화
  };

  const handleSearchSubmit = async () => {
    const parts = searchValue
      .replace(/(\d+-\d+)/g, ' $1 ') // '95-16'과 같이 번호와 주소를 구분
      .replace(/(\s+)/g, ' ') // 다중 공백을 하나의 공백으로 변경
      .trim() // 앞뒤 공백 제거
      .split(' '); // 공백을 기준으로 분리

    let localDistrict = '';
    let localAddress = '';

    parts.forEach((part) => {
      if (part.match(/(도|시|군|구|읍|면|리|통|동)$/)) {
        localDistrict += `${part} `;
      } else if (part.match(/\d+/)) {
        localAddress += `${part} `;
      } else {
        localAddress += `${part} `;
      }
    });

    localDistrict = localDistrict.trim(); // 불필요한 공백 제거
    localAddress = localAddress.trim(); // 불필요한 공백 제거

    if (!localDistrict && !localAddress) {
      setErrorMessage('주소 형식이 올바르지 않습니다.');
      return;
    }

    setDistrict(localDistrict);
    setAddress(localAddress);

    // Redux에 district와 address 저장
    dispatch(
      setLandAddress({ district: localDistrict, address: localAddress }),
    );

    try {
      // 정보를 가져오는 로직
      const landInfo = await getSearchLandInfo(localDistrict, localAddress);

      // landInfo가 유효한지 체크
      if (landInfo && landInfo.length > 0) {
        dispatch(setLandDetails(landInfo));

        const lawData = await getLandLawInfo(landInfo[0].landDistrictCode);
        dispatch(setLawInfo(lawData)); // 법령 정보 저장
      } else {
        setErrorMessage('해당 주소에 대한 정보가 없습니다.'); // 주소가 없을 경우 에러 메시지
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('검색 중 오류가 발생했습니다.'); // 오류 처리
    }
  };

  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="주소를 입력하세요."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchSubmit}>
          검색
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
        {/* 에러 메시지 표시 */}
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
        {activeTab === 'riskMap' && (
          <RiskMapTab district={district} address={address} />
        )}
        {activeTab === 'regionalInfo' && <OrdinanceInfoTab />}
      </Content>
    </>
  );
}

export default AddressSearch;
