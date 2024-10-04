// src/pages/RiskMap.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 추후 axios를 이용하여 데이터 fetch를 할 예정
// import axios from 'axios';

const DangerButton = styled.button`
  margin-top: 10px;
  width: 37%;
  background-color: #00c99c;
  color: white;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  justify-content: right;
  align-items: right;
  border: none;
`;

// 부모 요소 스타일 정의
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  margin-top: 10px; // 버튼과의 간격
  // padding: 3vh 5vw;
  // padding-top: 0px;
`;

function RiskMapPage() {
  const navigate = useNavigate();

  // 더미 데이터 (위도, 경도)
  const dummyMarkers = [
    { id: 1, lat: 37.5665, lng: 126.978 }, // 서울
    { id: 2, lat: 35.1796, lng: 129.0756 }, // 부산
    { id: 3, lat: 35.8714, lng: 128.6014 }, // 대구
    { id: 4, lat: 37.4563, lng: 126.7052 }, // 인천
    { id: 5, lat: 35.1595, lng: 126.8526 }, // 광주
    { id: 6, lat: 36.3504, lng: 127.3845 }, // 대전
    { id: 7, lat: 33.4996, lng: 126.5312 }, // 제주
  ];

  // 네이버 맵 로드
  // 네이버 맵 로드
  useEffect(() => {
    // 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}`;
    script.async = true;
    script.onload = () => {
      const { naver } = window; // 스크립트가 로드된 후 naver 객체 접근
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 초기 지도 중심: 서울
        zoom: 7, // 줌 레벨
      };

      const map = new naver.maps.Map('map', mapOptions);

      // ESLint의 no-new 규칙 무시
      dummyMarkers.forEach((markerData) => {
        // eslint-disable-next-line no-new
        new naver.maps.Marker({
          position: new naver.maps.LatLng(markerData.lat, markerData.lng),
          map,
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  const handleButtonClick = () => {
    navigate('/risk-map/report');
  };

  return (
    <div>
      <div id="map" style={{ width: '400px', height: '500px' }} />
      <ButtonContainer>
        <DangerButton onClick={handleButtonClick}>제보하기</DangerButton>
      </ButtonContainer>
    </div>
  );
}

export default RiskMapPage;

// 클러스터 기능 계속 오류뜸,, 추후 개발
