import React, { useEffect, useState } from 'react';

interface RiskMapProps {
  district: string;
  address: string;
}

const RiskMap: React.FC<RiskMapProps> = ({ district, address }) => {
  const [map, setMap] = useState<any | null>(null);
  const [marker, setMarker] = useState<any | null>(null);
  const [cadastralLayer, setCadastralLayer] = useState<any | null>(null);
  const [isCadastralVisible, setIsCadastralVisible] = useState<boolean>(false);
  const [panorama, setPanorama] = useState<any | null>(null);
  const [panoramaMarker, setPanoramaMarker] = useState<any | null>(null);
  const [isPanoramaVisible, setIsPanoramaVisible] = useState<boolean>(false);
  const [currentLatLng, setCurrentLatLng] = useState<any | null>(null);

  // handleSearch 함수는 useEffect 위로 이동합니다
  const handleSearch = (searchTerm: string) => {
    if (!map || !searchTerm) return;

    if (isPanoramaVisible) {
      if (panorama) {
        panorama.destroy();
        setPanorama(null);
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

            setCurrentLatLng(latLng);

            if (panoramaMarker) {
              panoramaMarker.setMap(null);
            }

            const newPanoramaMarker = new window.naver.maps.Marker({
              position: latLng,
              map: panorama,
            });

            setPanoramaMarker(newPanoramaMarker);
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
        'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%REACT_APP_NAVERMAP_API_KEY%&submodules=geocoder,panorama';
      naverMapScript.onload = initializeMap;
      document.head.appendChild(naverMapScript);
    }
  }, []);

  useEffect(() => {
    if (map && (district || address)) {
      handleSearch(`${district} ${address}`);
    }
  }, [district, address]);

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

  const togglePanorama = () => {
    if (isPanoramaVisible) {
      if (panorama) {
        panorama.destroy();
        setPanorama(null);
      }
      setIsPanoramaVisible(false);
    } else if (currentLatLng) {
      const newPanorama = new window.naver.maps.Panorama('panorama', {
        position: currentLatLng,
        pov: {
          pan: -135,
          tilt: 29,
          fov: 100,
        },
        active: true,
      });

      setPanorama(newPanorama);
      setIsPanoramaVisible(true);

      const newPanoramaMarker = new window.naver.maps.Marker({
        position: currentLatLng,
        map: newPanorama,
      });

      setPanoramaMarker(newPanoramaMarker);
    } else {
      alert('먼저 검색을 해주세요.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
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
