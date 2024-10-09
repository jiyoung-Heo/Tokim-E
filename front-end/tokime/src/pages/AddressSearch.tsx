import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LandDetailTab from '../components/Tabs/LandDetailTab';
import OrdinanceInfoTab from '../components/Tabs/OrdinanceInfoTab';
import RiskMapTab from '../components/Tabs/RiskMapTab';
import {
  setLandAddress,
  resetLandAddress,
} from '../redux/slices/landAddressSlice'; // 액션 임포트
import {
  setLandDetails,
  resetLandInfo,
  setLandDetail,
} from '../redux/slices/landInfoSlice'; // 액션 임포트
import { setLawInfo, resetLawInfo } from '../redux/slices/lawInfoSlice'; // 액션 임포트
import { getSearchLandInfo, getLandLawInfo } from '../api/landAxios'; // API 임포트
import searchIcon from '../assets/images/icon/search.svg';
import nodataimg from '../../assets/images/Tokimlogo.png';
import { RootState } from '../redux/store';
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
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.$isActive ? '#27C384' : '#333333')};
  border-bottom: ${(props) =>
    props.$isActive ? '2px solid #27C384' : '2px solid #ddd'};
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
  const landDetail = useSelector(
    (state: RootState) => state.landinfo.landDetail, // Redux에서 선택된 상세 정보 가져오기
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue && (landDetail === null || landDetail === undefined)) {
      setErrorMessage('국토교통부에서 제공하지 않는 지번 정보입니다.');
    } else {
      setErrorMessage('');
    }
  }, [landDetail, searchValue, dispatch]);

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
      setSearchValue('');
    };
  }, [dispatch]);

  const handleAddressSearch = async () => {
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress = '';
        if (data.jibunAddress === '') {
          fullAddress = data.autoJibunAddress;
        } else {
          fullAddress = data.jibunAddress;
        }
        // Extract district and detailed address
        const addressParts = fullAddress.split(' ');
        const district = `${data.sigungu} ${data.bname}`;
        const addressDetail = addressParts.slice(-1)[0];
        // 주소 정보를 바탕으로 토지 정보를 검색
        getSearchLandInfo(district, addressDetail)
          .then((response: any) => {
            if (response[0] === undefined) {
              console.error('no Address response');
              dispatch(setLandDetail(null));
              setSearchValue(fullAddress);
              setErrorMessage('국토교통부에서 제공하지 않는 지번 정보입니다.');
            } else {
              // 토지 정보를 Redux에 저장
              dispatch(setLandDetail(response[0] || null));
              dispatch(setLandDetails(response[0] || null));
              setSearchValue(
                `${response[0].landDistrict} ${response[0].landAddress}`,
              );

              // 법령 정보를 검색 (토지 정보에 landDistrictCode가 있을 때)
              if (response[0].landDistrictCode) {
                getLandLawInfo(response[0].landDistrictCode.toString())
                  .then((lawInfoResponse: any) => {
                    if (lawInfoResponse) {
                      // 법령 정보를 Redux 상태에 저장
                      dispatch(setLawInfo(lawInfoResponse));
                    }
                  })
                  .catch((error: Error) => {
                    console.error('Error fetching law information:', error);
                  });
              }
            }
          })
          .catch((error: Error) => {
            console.error('Error fetching land information:', error);
          });
      },
    }).open();

    // 법령 정보를 초기화
  };

  return (
    <>
      <SearchContainer>
        <SearchInput
          readOnly
          type="text"
          placeholder="주소를 입력하세요."
          value={searchValue}
          onChange={handleSearchChange}
          onClick={handleAddressSearch}
          style={{ fontWeight: 'bold' }}
        />
        <SearchIcon
          src={searchIcon}
          alt="search"
          onClick={handleAddressSearch}
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
        {/* <TabItem
          $isActive={activeTab === 'riskMap'}
          onClick={() => setActiveTab('riskMap')}
        >
          위험지도
        </TabItem> */}
        <TabItem
          $isActive={activeTab === 'regionalInfo'}
          onClick={() => setActiveTab('regionalInfo')}
        >
          지역별 조례정보
        </TabItem>
      </TabsContainer>
      <Content>
        {activeTab === 'landInfo' && <LandDetailTab />}
        {activeTab === 'regionalInfo' && (
          <OrdinanceInfoTab setActiveTab={setActiveTab} />
        )}
        {/* {activeTab === 'riskMap' && <RiskMapTab />} */}
      </Content>
    </>
  );
}

export default AddressSearch;
