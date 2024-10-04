// import React, { useEffect, useState } from 'react';

// interface RiskMapProps {
//   district: string;
//   address: string;
// }

// const RiskMap: React.FC<RiskMapProps> = ({ district, address }) => {
//   const [map, setMap] = useState<any | null>(null);
//   const [marker, setMarker] = useState<any | null>(null);
//   const [cadastralLayer, setCadastralLayer] = useState<any | null>(null);
//   const [isCadastralVisible, setIsCadastralVisible] = useState<boolean>(false);
//   const [panorama, setPanorama] = useState<any | null>(null);
//   const [panoramaMarker, setPanoramaMarker] = useState<any | null>(null);
//   const [isPanoramaVisible, setIsPanoramaVisible] = useState<boolean>(false);
//   const [currentLatLng, setCurrentLatLng] = useState<any | null>(null);

//   // 주소 검색 및 마커 표시
//   const handleSearch = async (searchTerm: string) => {
//     if (!map || !searchTerm) return;

//     if (isPanoramaVisible) {
//       if (panorama) {
//         panorama.destroy();
//         setPanorama(null);
//       }
//       setIsPanoramaVisible(false);
//     }

//     window.naver.maps.Service.geocode(
//       { query: searchTerm },
//       (status: string, response: any) => {
//         if (status === window.naver.maps.Service.Status.OK) {
//           const { addresses } = response.v2;
//           if (addresses.length > 0) {
//             const { x, y, roadAddress, jibunAddress } = addresses[0];
//             const latLng = new window.naver.maps.LatLng(y, x);

//             if (marker) {
//               marker.setMap(null);
//             }

//             const newMarker = new window.naver.maps.Marker({
//               position: latLng,
//               map,
//             });

//             setMarker(newMarker);
//             map.setCenter(latLng);
//             console.log(
//               `검색된 도로명 주소: ${roadAddress}, 지번 주소: ${jibunAddress}`,
//             );

//             setCurrentLatLng(latLng);

//             if (panoramaMarker) {
//               panoramaMarker.setMap(null);
//             }

//             const newPanoramaMarker = new window.naver.maps.Marker({
//               position: latLng,
//               map: panorama,
//             });

//             setPanoramaMarker(newPanoramaMarker);
//           } else {
//             alert('검색 결과가 없습니다.');
//           }
//         } else {
//           alert('주소를 찾을 수 없습니다.');
//           console.error('Geocode API Error:', status, response);
//         }
//       },
//     );
//   };

//   // 맵 초기화
//   const initializeMap = () => {
//     const center = new window.naver.maps.LatLng(37.3595704, 127.105399);
//     const newMap = new window.naver.maps.Map('map', {
//       center,
//       zoom: 16,
//       mapTypeControl: true,
//       mapTypeControlOptions: {
//         style: window.naver.maps.MapTypeControlStyle.DROPDOWN,
//       },
//     });

//     const layer = new window.naver.maps.CadastralLayer();
//     setCadastralLayer(layer);
//     layer.setMap(newMap);

//     setMap(newMap);
//   };

//   useEffect(() => {
//     if (!window.naver) {
//       const naverMapScript = document.createElement('script');
//       naverMapScript.src = `https://j11b207.p.ssafy.io/maps/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}&submodules=geocoder,panorama`;
//       naverMapScript.onload = () => {
//         // naver.maps가 정상적으로 로드된 경우에만 initializeMap 호출
//         if (window.naver && window.naver.maps) {
//           initializeMap();
//         } else {
//           console.error('Naver Maps API is not loaded.');
//         }
//       };
//       document.head.appendChild(naverMapScript);
//     } else {
//       initializeMap();
//     }
//   }, []);

//   // 주소가 변경될 때마다 검색 실행
//   useEffect(() => {
//     if (map && (district || address)) {
//       handleSearch(`${district} ${address}`);
//     }
//   }, [district, address, map]);

//   // 지적도 토글
//   const toggleCadastralLayer = () => {
//     if (cadastralLayer) {
//       if (isCadastralVisible) {
//         cadastralLayer.setMap(null);
//         setIsCadastralVisible(false);
//       } else {
//         cadastralLayer.setMap(map);
//         setIsCadastralVisible(true);
//       }
//     }
//   };

//   // 파노라마 토글
//   const togglePanorama = () => {
//     if (isPanoramaVisible) {
//       if (panorama) {
//         panorama.destroy();
//         setPanorama(null);
//       }
//       setIsPanoramaVisible(false);
//     } else if (currentLatLng) {
//       const newPanorama = new window.naver.maps.Panorama('panorama', {
//         position: currentLatLng,
//         pov: {
//           pan: -135,
//           tilt: 29,
//           fov: 100,
//         },
//         active: true,
//       });

//       setPanorama(newPanorama);
//       setIsPanoramaVisible(true);

//       const newPanoramaMarker = new window.naver.maps.Marker({
//         position: currentLatLng,
//         map: newPanorama,
//       });

//       setPanoramaMarker(newPanoramaMarker);
//     } else {
//       alert('먼저 검색을 해주세요.');
//     }
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       <button type="button" onClick={toggleCadastralLayer}>
//         {isCadastralVisible ? '지적도 끄기' : '지적도 켜기'}
//       </button>
//       <button type="button" onClick={togglePanorama}>
//         {isPanoramaVisible ? '파노라마 닫기' : '파노라마 보기'}
//       </button>
//       <div
//         id="map"
//         style={{
//           width: '100%',
//           height: '500px',
//         }}
//       />
//       <div
//         id="panorama"
//         style={{
//           position: 'absolute',
//           bottom: '0',
//           left: '0',
//           width: '100%',
//           height: '500px',
//           display: isPanoramaVisible ? 'block' : 'none',
//           zIndex: 1000,
//         }}
//       />
//     </div>
//   );
// };

// export default RiskMap;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Props 인터페이스 정의
interface RiskMapTabProps {
  district: string;
  address: string;
}

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

// RiskMapTab 컴포넌트 정의 (예제데이터)
const RiskMapTab: React.FC<RiskMapTabProps> = ({ district, address }) => {
  const [mapData, setMapData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMapData = async () => {
      const query = encodeURIComponent(`${district} ${address}`);
      const url = `/maps/map-geocode/v2/geocode?query=${query}`;

      try {
        const response = await axios.get(url);
        const { data } = response;

        if (data.status === 'OK' && data.addresses.length > 0) {
          setMapData(data.addresses[0]);
        } else {
          setErrorMessage('주소에 대한 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('지도를 가져오는 중 오류가 발생했습니다.');
      }
    };

    if (district && address) {
      fetchMapData();
    }
  }, [district, address]);

  useEffect(() => {
    if (mapData) {
      const { naver } = window;
      if (naver) {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new naver.maps.LatLng(mapData.y, mapData.x),
          zoom: 15,
          mapTypeId: naver.maps.MapTypeId.NORMAL,
        };

        const newMap = new naver.maps.Map(mapContainer, mapOptions);

        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(mapData.y, mapData.x),
          map: newMap,
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          alert(`위치: ${mapData.jibunAddress}`);
        });
      }
    }
  }, [mapData]);

  return (
    <Container>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {mapData && (
        <>
          <h3>주소: {mapData.jibunAddress}</h3>
          <p>도로 주소: {mapData.roadAddress}</p>
          <p>
            위도: {mapData.y}, 경도: {mapData.x}
          </p>
          <MapContainer id="map" />
        </>
      )}
    </Container>
  );
};

export default RiskMapTab;
