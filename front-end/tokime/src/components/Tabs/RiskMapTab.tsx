// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import styled from 'styled-components';
// import { RootState } from '../../redux/store'; // RootState를 import하세요

// // 스타일 정의
// const Container = styled.div`
//   padding: 20px;
//   background-color: #fff;
// `;

// const MapContainer = styled.div`
//   height: 400px; /* 맵의 높이 설정 */
//   width: 100%;
//   border: 1px solid #ccc;
// `;

// // RiskMapTab 컴포넌트 정의
// const RiskMapTab: React.FC = () => {
//   // Redux 스토어에서 district와 address 가져오기
//   const { district, address } = useSelector(
//     (state: RootState) => state.landaddress,
//   );

//   const [mapData, setMapData] = useState<any>(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchMapData = async () => {
//       const query = encodeURIComponent(`${district} ${address}`);
//       const url = `/maps/map-geocode/v2/geocode?query=${query}`;

//       try {
//         const response = await axios.get(url);
//         const { data } = response;

//         if (data.status === 'OK' && data.addresses.length > 0) {
//           setMapData(data.addresses[0]);
//         } else {
//           setErrorMessage('주소에 대한 정보를 찾을 수 없습니다.');
//         }
//       } catch (error) {
//         console.error(error);
//         setErrorMessage('지도를 가져오는 중 오류가 발생했습니다.');
//       }
//     };

//     if (district && address) {
//       fetchMapData();
//     }
//   }, [district, address]);

//   useEffect(() => {
//     if (mapData) {
//       const { naver } = window;
//       if (naver) {
//         const mapContainer = document.getElementById('map');
//         const mapOptions = {
//           center: new naver.maps.LatLng(mapData.y, mapData.x),
//           zoom: 15,
//           mapTypeId: naver.maps.MapTypeId.NORMAL,
//         };

//         const newMap = new naver.maps.Map(mapContainer, mapOptions);

//         const marker = new naver.maps.Marker({
//           position: new naver.maps.LatLng(mapData.y, mapData.x),
//           map: newMap,
//         });

//         naver.maps.Event.addListener(marker, 'click', () => {
//           alert(`위치: ${mapData.jibunAddress}`);
//         });
//       }
//     }
//   }, [mapData]);

//   return (
//     <Container>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       {mapData && (
//         <>
//           <h3>주소: {mapData.jibunAddress}</h3>
//           <p>도로 주소: {mapData.roadAddress}</p>
//           <p>
//             위도: {mapData.y}, 경도: {mapData.x}
//           </p>
//           <MapContainer id="map" />
//         </>
//       )}
//     </Container>
//   );
// };

// export default RiskMapTab;

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

// RiskMapTab 컴포넌트 정의
const RiskMapTab: React.FC = () => {
  // Redux 스토어에서 district와 address 가져오기
  const { district, address } = useSelector(
    (state: RootState) => state.landaddress,
  );

  const [mapData, setMapData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMapData = async () => {
      const query = encodeURIComponent(`${district} ${address}`);
      const url = `/maps/map-geocode/v2/geocode?query=${query}`; // 프록시 경로 사용

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
