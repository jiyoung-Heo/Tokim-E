// src/pages/RiskMap.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 추후 axios를 이용하여 데이터 fetch를 할 예정
// import axios from 'axios';

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
  useEffect(() => {
    const { naver } = window;
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

    // 추후 axios로 서버에서 마커 데이터를 받아와서 처리하는 로직 (주석)
    /*
    axios.get('/api/markers') // API에서 데이터를 받아옴
      .then(response => {
        const markers = response.data;
        markers.forEach((marker) => {
          new naver.maps.Marker({
            position: new naver.maps.LatLng(marker.lat, marker.lng),
            map: map,
          });
        });
      })
      .catch(error => {
        console.error('Error fetching marker data:', error);
      });
    */
  }, []);

  const handleButtonClick = () => {
    navigate('/risk-map/report');
  };

  return (
    <div>
      <div id="map" style={{ width: '400px', height: '500px' }} />
      <button type="button" onClick={handleButtonClick}>
        제보하기
      </button>
    </div>
  );
}

export default RiskMapPage;

// 클러스터 기능 계속 오류뜸,, 추후 개발
