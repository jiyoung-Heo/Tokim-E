// src/pages/RiskMap.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '../assets/images/icon/left-actionable.png';
// 추후 axios를 이용하여 데이터 fetch를 할 예정
// import axios from 'axios';

// 필요한 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

// 뒤로가기 아이콘 정의
const BackIcon = styled.img``;

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 2px solid rgba(121, 121, 130, 0.1);
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Map = styled.div`
  width: 70vw;
  height: 65vh;
  justify-content: center;
`;

const DangerButton = styled.button`
  width: 30vw;
  height: 5vh;
  background-color: #00c99c;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  border: none;
`;

// 부모 요소 스타일 정의
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 오른쪽 정렬
  margin-top: 3vh; // 버튼과의 간격
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
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        개발 위험 지도
      </Title>
      <Divider />

      <MapContainer>
        <Map id="map" />
      </MapContainer>
      <ButtonContainer>
        <DangerButton onClick={handleButtonClick}>신고하기</DangerButton>
      </ButtonContainer>
    </Container>
  );
}

export default RiskMapPage;

// 클러스터 기능 계속 오류뜸,, 추후 개발
