import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // React Router에서 useNavigate 가져오기
import { getDangerInfoDetail } from '../api/dangerAxios'; // API 함수 가져오기
import backIcon from '../assets/images/icon/left-actionable.png'; // 뒤로가기 아이콘 가져오기

// 스타일드 컴포넌트로 컨테이너 설정
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

// 제목 스타일
const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

// 뒤로가기 아이콘 스타일
const BackIcon = styled.img`
  margin-right: 10px; // 아이콘에 여백 추가
`;

// 등록 버튼 및 지도 컨테이너 스타일
const RegistContainer = styled.div`
  position: fixed; // 화면 고정
  bottom: 13vh; // 화면 하단에서 거리
  right: 5vw; // 화면 우측에서 거리
`;

// 등록 버튼 스타일
const RegisterButton = styled.button`
  padding: 1.5vh 5vw;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800; // 버튼을 최상위로
  margin-top: 3vh;
  font-size: 15px;

  &:hover {
    background-color: #1ea774; // 호버 시 색상 변경
  }
`;

// 지도 컨테이너 스타일
const MapContainer = styled.div`
  width: 100%;
  height: 70vh; // 뷰포트 높이에 설정
`;

const RiskMapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null); // 지도 컨테이너 참조
  const navigate = useNavigate(); // 네비게이트 함수 초기화

  useEffect(() => {
    const loadNaverMapApi = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve(true); // API가 이미 로드된 경우
        } else {
          const script = document.createElement('script');
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}`;
          script.async = true;
          script.onload = () => resolve(true); // 성공적으로 로드된 경우
          script.onerror = () => reject(new Error('Naver Maps API 로드 실패.')); // 로드 실패 시 에러
          document.body.appendChild(script); // 스크립트 추가
        }
      });
    };

    const initMap = () => {
      if (mapContainer.current) {
        return new window.naver.maps.Map(mapContainer.current, {
          center: new window.naver.maps.LatLng(37.4189122, 127.0430025), // 초기 중심 좌표
          zoom: 14,
          draggable: true,
          zoomControl: true,
          scaleControl: true,
          minZoom: 6,
          maxZoom: 25,
        });
      }
      return null; // 지도 초기화 실패 시 null 반환
    };

    const createMarker = (map: any, lat: number, lng: number) => {
      return new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
          url: 'markers/default.png', // 기본 마커 이미지
          scaledSize: new window.naver.maps.Size(30, 30),
        },
      });
    };

    const fetchData = async () => {
      const map = initMap(); // 지도 초기화
      if (!map) return; // 지도 초기화 실패 시 종료

      // ID 5013에서 5214까지의 데이터를 가져오기
      const fetchPromises = Array.from({ length: 230 }, (_, index) => {
        const id = 5013 + index; // ID 계산
        return getDangerInfoDetail(id)
          .then((data) => {
            if (data) {
              const { lat, lng } = data;
              createMarker(map, lat, lng); // 마커 추가
            } else {
              console.error(`ID: ${id}에 대한 데이터 없음`); // 데이터 없음 에러
            }
          })
          .catch((error) => {
            console.error(`ID ${id}에 대한 요청 오류:`, error); // 요청 오류 에러
          });
      });

      await Promise.all(fetchPromises); // 모든 요청이 완료될 때까지 대기
    };

    loadNaverMapApi()
      .then(() => {
        fetchData(); // API 로드 후 데이터 가져오기
      })
      .catch((error) => console.error(error));
  }, []);

  const handleReportClick = () => {
    navigate('report'); // /risk-map/report로 네비게이트
  };

  return (
    <Container>
      <Title>
        <BackIcon
          src={backIcon}
          alt="뒤로가기 아이콘"
          onClick={() => navigate(-1)}
        />
        위험 지도
      </Title>
      <MapContainer ref={mapContainer} /> {/* 지도 컨테이너 렌더링 */}
      <RegistContainer>
        <RegisterButton onClick={handleReportClick}>신고하기</RegisterButton>{' '}
        {/* 신고하기 버튼 추가 */}
      </RegistContainer>
    </Container>
  );
};

export default RiskMapPage;
