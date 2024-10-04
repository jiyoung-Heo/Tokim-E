// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import styled from 'styled-components';
// import { RootState } from '../../redux/store';

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
//   const [map, setMap] = useState<any>(null); // 맵 상태
//   const [marker, setMarker] = useState<any>(null); // 마커 상태

//   // 지도 초기화
//   useEffect(() => {
//     const initializeMap = () => {
//       const { naver } = window;

//       // 맵 옵션 설정
//       const mapOptions = {
//         center: new naver.maps.LatLng(36.3479273, 127.2976071), // 기본 좌표 설정
//         zoom: 15,
//         mapTypeId: naver.maps.MapTypeId.NORMAL,
//       };

//       const newMap = new naver.maps.Map('map', mapOptions);
//       setMap(newMap); // 맵 상태 업데이트
//       console.log('지도 초기화 완료:', newMap);
//     };

//     // Naver Maps API가 로드된 후에 initializeMap 호출
//     const script = document.createElement('script');
//     script.src = `https://j11b207.p.ssafy.io/maps/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}`;
//     script.onload = initializeMap;
//     script.onerror = () => {
//       console.error('네이버 지도 API 로드 실패');
//       setErrorMessage('네이버 지도 API를 로드하는 데 실패했습니다.');
//     };
//     document.head.appendChild(script);
//   }, []); // 맵 생성 시점에만 의존성 추가

//   // 주소 검색
//   useEffect(() => {
//     const fetchMapData = async () => {
//       if (district && address) {
//         const query = encodeURIComponent(`${district} ${address}`);
//         const url = `https://j11b207.p.ssafy.io/geo-maps/map-geocode/v2/geocode?query=${query}`; // Nginx 프록시 경로 사용

//         console.log('주소 검색 요청:', url); // 요청 URL 로그

//         try {
//           const response = await axios.get(url);
//           const { data } = response;

//           console.log('API 응답 데이터:', data); // API 응답 데이터 로그

//           if (data.status === 'OK' && data.addresses.length > 0) {
//             setMapData(data.addresses[0]);
//             // 마커 추가 및 지도 중심 설정
//             if (map) {
//               const { naver } = window;

//               // 이전 마커가 존재할 경우 삭제
//               if (marker) {
//                 marker.setMap(null); // 이전 마커 삭제
//                 console.log('이전 마커 삭제됨');
//               }

//               // 새로운 마커 생성
//               const newMarker = new naver.maps.Marker({
//                 position: new naver.maps.LatLng(
//                   data.addresses[0].y,
//                   data.addresses[0].x,
//                 ),
//                 map, // 기존 맵에 마커 추가
//               });

//               // 마커 클릭 이벤트 설정
//               naver.maps.Event.addListener(newMarker, 'click', () => {
//                 alert(`위치: ${data.addresses[0].jibunAddress}`);
//               });

//               setMarker(newMarker); // 새 마커 상태 업데이트
//               map.setCenter(
//                 new naver.maps.LatLng(data.addresses[0].y, data.addresses[0].x),
//               ); // 맵 중심 업데이트
//               console.log('새 마커 추가됨:', newMarker);
//             }
//           } else {
//             setErrorMessage('주소에 대한 정보를 찾을 수 없습니다.');
//             console.warn('주소 검색 실패:', data); // 실패 로그
//           }
//         } catch (error) {
//           console.error('API 요청 중 오류 발생:', error);
//           setErrorMessage('지도를 가져오는 중 오류가 발생했습니다.');
//         }
//       } else {
//         console.log('주소 검색을 위한 district와 address가 필요합니다.');
//       }
//     };

//     fetchMapData();
//   }, [district, address, map]); // district, address, map이 변경될 때마다 실행

//   return (
//     <Container>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <MapContainer id="map" />
//       {mapData && (
//         <>
//           <h3>주소: {mapData.jibunAddress}</h3>
//           <p>도로 주소: {mapData.roadAddress}</p>
//           <p>
//             위도: {mapData.y}, 경도: {mapData.x}
//           </p>
//         </>
//       )}
//     </Container>
//   );
// };

// export default RiskMapTab;

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // 상태 타입 임포트

interface Window {
  kakao: any; // kakao 객체에 대한 타입 선언
}

declare const window: Window; // 전역 객체로 선언

const RiskMapTab: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null); // 지도를 표시할 div 참조
  const district = useSelector(
    (state: RootState) => state.landaddress.district, // landaddress에서 district 가져오기
  );
  const address = useSelector(
    (state: RootState) => state.landaddress.address, // landaddress에서 address 가져오기
  );

  useEffect(() => {
    if (!mapContainer.current || (!district && !address)) return; // 지도 컨테이너가 없거나 주소가 없으면 종료

    const { kakao } = window; // Kakao API 로드 확인

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer.current, {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표
      level: 3, // 초기 확대 레벨
    });

    // 주소를 좌표로 변환하는 함수
    const addressToCoordinates = (inputAddress: string) => {
      return new Promise<void>((resolve, reject) => {
        const geocoder = new kakao.maps.services.Geocoder(); // Geocoder 인스턴스 생성
        geocoder.addressSearch(inputAddress, (result: any[], status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 위도, 경도
            resolve();
            // 마커 추가
            const marker = new kakao.maps.Marker({
              position: coords,
            });
            marker.setMap(map); // 지도에 마커 추가
            map.setCenter(coords); // 중심 좌표 이동
          } else {
            reject(new Error('주소 검색 실패'));
          }
        });
      });
    };

    // 주소가 변경될 때마다 좌표로 변환
    if (address) {
      addressToCoordinates(address)
        .then(() => {
          console.log('주소 좌표 변환 성공');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [district, address]); // 의존성 배열

  return (
    <div>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: '100%', height: '400px' }}
      />
      {!district && !address && <p>주소를 먼저 검색해주세요</p>}
    </div>
  );
};

export default RiskMapTab;
