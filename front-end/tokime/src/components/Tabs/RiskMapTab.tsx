import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { RootState } from '../../redux/store'; // RootState를 import하세요

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const MapContainer = styled.div`
  height: 400px; /* 맵의 높이 설정 */
  width: 100%;
  border: 1px solid #ccc;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// RiskMapTab 컴포넌트 정의
const RiskMapTab: React.FC = () => {
  // Redux 스토어에서 district와 address 가져오기
  const { district, address } = useSelector(
    (state: RootState) => state.landaddress,
  );

  const [mapData, setMapData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [map, setMap] = useState<any>(null); // 맵 상태 추가
  const [marker, setMarker] = useState<any>(null); // 마커 상태 추가
  const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리 상태 추가

  useEffect(() => {
    const fetchMapData = async (query: string) => {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://j11b207.p.ssafy.io/geo-maps/map-geocode/v2/geocode?query=${encodedQuery}`; // 데이터 프록시 경로 사용

      try {
        const response = await axios.get(url);
        const { data } = response;

        if (data.status === 'OK' && data.addresses.length > 0) {
          setMapData(data.addresses[0]);
          return data.addresses[0]; // 반환된 주소 데이터 반환
        }
        setErrorMessage('주소에 대한 정보를 찾을 수 없습니다.');
        return null;
      } catch (error) {
        console.error(error);
        setErrorMessage('지도를 가져오는 중 오류가 발생했습니다.');
        return null;
      }
    };

    // 지역 검색 시 데이터 가져오기
    const searchLocation = async () => {
      if (searchQuery) {
        const result = await fetchMapData(searchQuery);
        if (result) {
          if (marker) {
            marker.setMap(null); // 이전 마커 삭제
          }

          const { naver } = window;
          const newMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(result.y, result.x),
            map, // 기존 맵에 마커 추가
          });

          naver.maps.Event.addListener(newMarker, 'click', () => {
            alert(`위치: ${result.jibunAddress}`);
          });

          setMarker(newMarker); // 새 마커 상태 업데이트
          map.setCenter(new naver.maps.LatLng(result.y, result.x)); // 맵 중심 업데이트
        }
      }
    };

    // district와 address가 변경될 때마다 데이터 가져오기
    if (district && address) {
      fetchMapData(`${district} ${address}`);
    }

    // searchQuery가 변경될 때마다 searchLocation 호출
    if (searchQuery) {
      searchLocation();
    }
  }, [district, address, searchQuery]); // 추가: searchQuery에 의존성 추가

  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;

      // 맵 옵션 설정
      const mapOptions = {
        center: new naver.maps.LatLng(36.3479273, 127.2976071), // 기본 좌표 설정
        zoom: 15,
        mapTypeId: naver.maps.MapTypeId.NORMAL,
      };

      const newMap = new naver.maps.Map('map', mapOptions);
      setMap(newMap); // 맵 상태 업데이트
    };

    // Naver Maps API가 로드된 후에 initializeMap 호출
    const script = document.createElement('script');
    script.src = `https://j11b207.p.ssafy.io/maps/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}`;
    script.onload = initializeMap;
    document.head.appendChild(script);
  }, []); // 맵 생성 시점만 의존성 추가

  return (
    <Container>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <SearchInput
        type="text"
        placeholder="주소를 입력하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // 검색 쿼리 업데이트
      />
      <MapContainer id="map" />
      {mapData && (
        <>
          <h3>주소: {mapData.jibunAddress}</h3>
          <p>도로 주소: {mapData.roadAddress}</p>
          <p>
            위도: {mapData.y}, 경도: {mapData.x}
          </p>
        </>
      )}
    </Container>
  );
};

export default RiskMapTab;
