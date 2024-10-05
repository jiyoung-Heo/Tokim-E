// NaverMap.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%; // 부모 요소에 맞게 크기 설정
`;

const NaverMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null); // 지도 DOM 참조

  useEffect(() => {
    // Naver Maps API 스크립트를 로드하는 함수
    const loadNaverMapApi = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve(true); // 이미 로드된 경우
        } else {
          const script = document.createElement('script');
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}`;
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () =>
            reject(new Error('Failed to load Naver Maps API'));
          document.body.appendChild(script);
        }
      });
    };

    // 지도 초기화 함수
    const initMap = () => {
      if (mapContainer.current) {
        const map = new window.naver.maps.Map(mapContainer.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울
          zoom: 10, // 줌 레벨
        });
      }
    };

    // API 로드 후 지도 초기화
    loadNaverMapApi()
      .then(initMap)
      .catch((error) => console.error(error));

    // 스크립트 제거는 하지 않음
  }, []);

  return <MapContainer ref={mapContainer} />; // ref를 MapContainer에 연결
};

export default NaverMap;
