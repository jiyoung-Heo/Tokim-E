import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getSearchLandInfo } from '../../api/landAxios';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
`;

interface NaverMapPropsProps {
  landAddress: string;
}

const NaverMapProps: React.FC<NaverMapPropsProps> = ({ landAddress }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null); // 마커를 저장하기 위한 ref

  const addressParts = landAddress.split(' ');

  const district = `${addressParts[1]} ${addressParts[2]}`;
  const address = addressParts.slice(3).join(' ');

  useEffect(() => {
    const loadNaverMapApi = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve(true);
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

    const initMap = (
      coordinates: { x: string; y: string },
      landDanger: number,
    ) => {
      if (mapContainer.current) {
        const map = new window.naver.maps.Map(mapContainer.current, {
          center: new window.naver.maps.LatLng(coordinates.y, coordinates.x),
          zoom: 14,
          draggable: false,
          zoomControl: false,
          scaleControl: false,
          minZoom: 14,
          maxZoom: 14,
        });

        // 마커 이미지 결정
        let markerImageUrl = `${process.env.PUBLIC_URL}/markers/default.png`;
        if (landDanger === 0) {
          markerImageUrl = `${process.env.PUBLIC_URL}/markers/danger.png`;
        } else if (landDanger === 1) {
          markerImageUrl = `${process.env.PUBLIC_URL}/markers/caution.png`;
        }

        const timestamp = new Date().getTime();
        markerImageUrl += `?t=${timestamp}`;

        console.log(markerImageUrl);
        // 마커가 이미 존재하는지 확인
        if (markerRef.current) {
          // 기존 마커가 존재하면 업데이트
          markerRef.current.setMap(null); // 이전 마커 제거
        }

        // 새 마커 추가
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(coordinates.y, coordinates.x),
          map,
          icon: {
            url: markerImageUrl,
            scaledSize: new window.naver.maps.Size(30, 30),
          },
        });
        console.log(markerRef.current);
      }
    };

    const fetchCoordinates = async () => {
      if (!district || !address) return;

      const query = encodeURIComponent(`${district} ${address}`);
      const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}&X-NCP-APIGW-API-KEY-ID=${process.env.REACT_APP_NAVERMAP_API_KEY}&X-NCP-APIGW-API-KEY=${process.env.REACT_APP_NAVERMAP_SECRET_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'OK' && data.addresses.length > 0) {
          const { x, y } = data.addresses[0];

          const landData = await getSearchLandInfo(district, address);
          if (landData && landData.length > 0) {
            const { landDanger } = landData[0];
            console.log(
              `Coordinates: x=${x}, y=${y}, Land danger: ${landDanger}`,
            );
            initMap({ y, x }, landDanger);
          } else {
            console.error('지번 정보를 찾을 수 없습니다.');
          }
        } else {
          console.error('주소를 찾을 수 없습니다:', data.errorMessage);
        }
      } catch (error) {
        console.error('Fetch 오류 발생:', error);
      }
    };

    loadNaverMapApi()
      .then(() => {
        if (district && address) {
          fetchCoordinates();
        }
      })
      .catch((error) => console.error(error));
  }, [district, address]);

  return <MapContainer ref={mapContainer} />;
};

export default NaverMapProps;
