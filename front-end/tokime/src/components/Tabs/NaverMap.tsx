import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getSearchLandInfo } from '../../api/landAxios';
import notFoundIcon from '../../assets/images/Tokimlogo.png'; // 대체 이미지 경로

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const NaverMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null); // 마커를 저장하기 위한 ref

  const [hasError, setHasError] = useState(false); // 오류 상태 관리

  const selectedDetail = useSelector(
    (state: RootState) => state.landinfo.landDetail, // Redux에서 선택된 상세 정보 가져오기
  );
  let district = selectedDetail?.landDistrict;
  let address = selectedDetail?.landAddress;

  // district가 null일 경우, address에서 값을 가져와 설정
  if (district === null || district === undefined) {
    if (address) {
      const addressParts = address?.split(' ');
      district = `${addressParts[1]} ${addressParts[2]}`;
      address = addressParts.slice(3).join(' ');
    }
  }

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
        let markerImageUrl = 'markers/default.png';
        if (landDanger === 0) {
          markerImageUrl = 'markers/danger.png';
        } else if (landDanger === 1) {
          markerImageUrl = 'markers/caution.png';
        }

        const timestamp = new Date().getTime();
        markerImageUrl += `?t=${timestamp}`;

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
            setHasError(true); // 오류 상태 업데이트
          }
        } else {
          console.error('주소를 찾을 수 없습니다:', data.errorMessage);
          setHasError(true); // 오류 상태 업데이트
        }
      } catch (error) {
        console.error('Fetch 오류 발생:', error);
        setHasError(true); // 오류 상태 업데이트
      }
    };

    loadNaverMapApi()
      .then(() => {
        if (district && address) {
          fetchCoordinates();
        }
      })
      .catch((error) => {
        console.error(error);
        setHasError(true); // 오류 상태 업데이트
      });
  }, [district, address]);

  return (
    <MapContainer ref={mapContainer}>
      {hasError ? (
        <img
          src={notFoundIcon}
          alt="대체 이미지"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : null}
    </MapContainer>
  );
};

export default NaverMap;
