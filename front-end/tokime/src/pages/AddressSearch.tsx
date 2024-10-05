import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import LandDetailTab from '../components/Tabs/LandDetailTab';
import OrdinanceInfoTab from '../components/Tabs/OrdinanceInfoTab';
import RiskMapTab from '../components/Tabs/RiskMapTab';
import {
  setLandAddress,
  resetLandAddress,
} from '../redux/slices/landAddressSlice'; // 액션 임포트
import { setLandDetails, resetLandInfo } from '../redux/slices/landInfoSlice'; // 액션 임포트
import { setLawInfo, resetLawInfo } from '../redux/slices/lawInfoSlice'; // 액션 임포트
import { getSearchLandInfo, getLandLawInfo } from '../api/landAxios'; // API 임포트
import searchIcon from '../assets/images/icon/search.svg';

// 검색창 스타일
const SearchContainer = styled.div`
  padding: 10px;
  background-color: #f3f7fb;
  display: flex;
  align-items: center; // 세로 중앙 정렬
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 10px;
`;

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
  font-size: 14px;
  color: ${(props) => (props.$isActive ? '#27C384' : '#000')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.$isActive ? '2px solid #27C384' : 'none')};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
  background-color: #f3f7fb;
`;

function AddressSearch() {
  const [activeTab, setActiveTab] = useState('landInfo');
  const [searchValue, setSearchValue] = useState('');

  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setErrorMessage(''); // 입력할 때 에러 메시지 초기화
  };

  useEffect(() => {
    // 페이지가 언마운트될 때 landInfoSlice를 초기화
    return () => {
      dispatch(resetLandInfo());
      dispatch(resetLawInfo());
      dispatch(resetLandAddress());
    };
  }, [dispatch]);

  const handleSearchSubmit = async () => {
    const parts = searchValue
      .replace(/(\d+-\d+)/g, ' $1 ') // '95-16'과 같이 번호와 주소를 구분
      .replace(/(\s+)/g, ' ') // 다중 공백을 하나의 공백으로 변경
      .trim() // 앞뒤 공백 제거
      .split(' '); // 공백을 기준으로 분리

    let localDistrict = '';
    let localAddress = '';

    // 구역 키워드 정규식 (예: 도, 시, 군, 구, 읍, 면, 리, 통, 동 등)
    const districtKeywords = /(도|시|군|구|읍|면|리|통|동)$/;

    // 숫자나 '-'가 포함된 경우 address로 간주
    const isAddressCandidate = (part: any) => {
      return /\d+/.test(part) || part.includes('-');
    };

    // 일반적인 지역명인지 판단
    const isDistrictCandidate = (part: any) => {
      return (
        part.match(districtKeywords) ||
        part.length === 2 ||
        part.match(/^[가-힣]+$/)
      );
    };

    parts.forEach((part) => {
      // address 후보 판단
      if (isAddressCandidate(part)) {
        localAddress += `${part} `;
      }
      // district 후보 판단
      else if (isDistrictCandidate(part)) {
        localDistrict += `${part} `;
      }
      // 기타 상황: 일반적인 지역명으로 처리
      else {
        localDistrict += `${part} `;
      }
    });

    // 불필요한 공백 제거
    localDistrict = localDistrict.trim();
    localAddress = localAddress.trim();

    // 최종 처리: address만 있어도 가져오고 district만 있어도 가져오기
    if (!localDistrict && !localAddress) {
      setErrorMessage('주소 형식이 올바르지 않습니다.');
      return;
    }

    // district와 address 상태 설정
    console.log('district', localDistrict);
    console.log('address', localAddress);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
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
          onKeyDown={handleKeyDown}
        />
        <SearchIcon
          src={searchIcon}
          alt="search"
          onClick={handleSearchSubmit}
        />
      </SearchContainer>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
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
