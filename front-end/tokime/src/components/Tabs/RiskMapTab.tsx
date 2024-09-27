// RiskMapTab.tsx
import React, { useEffect, useState } from 'react';

const RiskMap: React.FC = () => {
  const [map, setMap] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [marker, setMarker] = useState<any | null>(null);
  const [cadastralLayer, setCadastralLayer] = useState<any | null>(null);
  const [isCadastralVisible, setIsCadastralVisible] = useState<boolean>(false);
  const [panorama, setPanorama] = useState<any | null>(null);
  const [panoramaMarker, setPanoramaMarker] = useState<any | null>(null); // 파노라마 마커 상태 추가
  const [isPanoramaVisible, setIsPanoramaVisible] = useState<boolean>(false);
  const [currentLatLng, setCurrentLatLng] = useState<any | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const center = new window.naver.maps.LatLng(37.3595704, 127.105399);
      const newMap = new window.naver.maps.Map('map', {
        center,
        zoom: 16,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.DROPDOWN,
        },
      });

      const layer = new window.naver.maps.CadastralLayer();
      setCadastralLayer(layer);
      layer.setMap(newMap);

      setMap(newMap);
    };

    if (window.naver) {
      initializeMap();
    } else {
      const naverMapScript = document.createElement('script');
      naverMapScript.src =
        'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=geocoder,panorama'; // 클라이언트 ID 입력
      naverMapScript.onload = initializeMap;
      document.head.appendChild(naverMapScript);
    }
  }, []);

  const toggleCadastralLayer = () => {
    if (cadastralLayer) {
      if (isCadastralVisible) {
        cadastralLayer.setMap(null);
        setIsCadastralVisible(false);
      } else {
        cadastralLayer.setMap(map);
        setIsCadastralVisible(true);
      }
    }
  };

  const handleSearch = () => {
    if (!map || !searchTerm) return;

    // 파노라마가 열려 있으면 닫기
    if (isPanoramaVisible) {
      if (panorama) {
        panorama.destroy(); // 파노라마 객체 제거
        setPanorama(null); // 상태 초기화
      }
      setIsPanoramaVisible(false);
    }

    window.naver.maps.Service.geocode(
      { query: searchTerm },
      (status: string, response: any) => {
        if (status === window.naver.maps.Service.Status.OK) {
          const { addresses } = response.v2;
          if (addresses.length > 0) {
            const { x, y, roadAddress, jibunAddress } = addresses[0];
            const latLng = new window.naver.maps.LatLng(y, x);

            // 지도 마커 처리
            if (marker) {
              marker.setMap(null);
            }

            const newMarker = new window.naver.maps.Marker({
              position: latLng,
              map,
            });

            setMarker(newMarker);
            map.setCenter(latLng);
            console.log(
              `검색된 도로명 주소: ${roadAddress}, 지번 주소: ${jibunAddress}`,
            );

            setCurrentLatLng(latLng); // 현재 위치 저장 (파노라마용)

            // 파노라마에서 마커 생성
            if (panoramaMarker) {
              panoramaMarker.setMap(null); // 이전 마커 제거
            }

            const newPanoramaMarker = new window.naver.maps.Marker({
              position: latLng,
              map: panorama, // 파노라마에 마커를 추가
            });

            setPanoramaMarker(newPanoramaMarker); // 파노라마 마커 상태 업데이트
          } else {
            alert('검색 결과가 없습니다.');
          }
        } else {
          alert('주소를 찾을 수 없습니다.');
          console.error('Geocode API Error:', status, response);
        }
      },
    );
  };

  const togglePanorama = () => {
    if (isPanoramaVisible) {
      // 파노라마 숨기기
      if (panorama) {
        panorama.destroy(); // 파노라마 객체 제거
        setPanorama(null); // 상태 초기화
      }
      setIsPanoramaVisible(false);
    } else if (currentLatLng) {
      // 파노라마 생성 (지도 위에 표시)
      const newPanorama = new window.naver.maps.Panorama('panorama', {
        position: currentLatLng,
        pov: {
          pan: -135,
          tilt: 29,
          fov: 100,
        },
        active: true,
      });

      setPanorama(newPanorama); // 새로운 파노라마 상태 업데이트
      setIsPanoramaVisible(true);

      // 파노라마에 마커 추가
      const newPanoramaMarker = new window.naver.maps.Marker({
        position: currentLatLng,
        map: newPanorama, // 파노라마에 마커를 추가
      });

      setPanoramaMarker(newPanoramaMarker); // 파노라마 마커 상태 업데이트
    } else {
      alert('먼저 검색을 해주세요.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="도로명 또는 지번 주소 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', margin: '10px 0' }}
      />
      <button type="button" onClick={handleSearch}>
        검색
      </button>
      <button type="button" onClick={toggleCadastralLayer}>
        {isCadastralVisible ? '지적도 끄기' : '지적도 켜기'}
      </button>
      <button type="button" onClick={togglePanorama}>
        {isPanoramaVisible ? '파노라마 닫기' : '파노라마 보기'}
      </button>
      <div
        id="map"
        style={{
          width: '100%',
          height: '500px',
        }}
      />
      <div
        id="panorama"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '500px',
          display: isPanoramaVisible ? 'block' : 'none',
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default RiskMap;
