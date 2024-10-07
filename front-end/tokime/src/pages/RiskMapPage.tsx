import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getDangerInfo } from '../api/dangerAxios';
import backIcon from '../assets/images/icon/left-actionable.png';

// 스타일드 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

const BackIcon = styled.img`
  margin-right: 10px;
`;

const RegistContainer = styled.div`
  position: fixed;
  bottom: 13vh;
  right: 5vw;
`;

const RegisterButton = styled.button`
  padding: 1.5vh 5vw;
  background-color: #27c384;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 800;
  margin-top: 3vh;
  font-size: 15px;

  &:hover {
    background-color: #1ea774;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 70vh;
`;

const RiskMapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNaverMapApi = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve(true);
        } else {
          const script = document.createElement('script');
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVERMAP_API_KEY}&submodules=geocoder`;
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error('Naver Maps API 로드 실패.'));
          document.body.appendChild(script);
        }
      });
    };

    const initMap = () => {
      if (mapContainer.current) {
        return new window.naver.maps.Map(mapContainer.current, {
          center: new window.naver.maps.LatLng(37.4189122, 127.0430025),
          zoom: 14,
          draggable: true,
          zoomControl: true,
          scaleControl: true,
          minZoom: 6,
          maxZoom: 25,
        });
      }
      return null;
    };

    const createMarker = async (
      map: any,
      lat: number,
      lng: number,
      dangerTitle: string,
      dangerContent: string,
    ) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
          url: 'markers/default.png',
          scaledSize: new window.naver.maps.Size(30, 30), // 마커 크기
        },
      });

      // 인포윈도우 생성
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:10px; max-width:200px; border-radius:10px; border: 1px solid #27C384; background-color: #fff;">
                <h4 style="color: #333;">신고 제목: ${dangerTitle}</h4>
                <p style="color: #555;">신고 내용: ${dangerContent}</p>
                <p style="color: #777;">주소: 불러오는 중...</p>
              </div>`,
        backgroundColor: 'transparent', // 배경색을 투명으로 설정
        borderColor: '#27C384',
        borderWidth: '1px',
        anchorSize: new window.naver.maps.Size(0, 0), // 인포윈도우의 뾰족한 부분을 위해
        pixelOffset: new window.naver.maps.Point(-100, -200), // 인포윈도우를 마커 위로 이동
      });

      // 마커 클릭 이벤트 추가
      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });

      // 지도 클릭 시 인포윈도우 닫기
      window.naver.maps.Event.addListener(map, 'click', () => {
        infoWindow.close();
      });

      // 역지오코딩으로 좌표에 해당하는 주소 불러오기
      if (
        window.naver.maps.Service &&
        window.naver.maps.Service.reverseGeocode
      ) {
        window.naver.maps.Service.reverseGeocode(
          { coords: new window.naver.maps.LatLng(lat, lng) },
          (status: any, response: any) => {
            if (status === window.naver.maps.Service.Status.OK) {
              const address =
                response.v2.address.jibunAddress ||
                response.v2.address.roadAddress;
              const newContent = `<div style="padding:10px; max-width:200px; border-radius:10px; border: 1px solid #27C384; background-color: #fff;">
                              <h4 style="color: #333;">신고 제목: ${dangerTitle}</h4>
                              <p style="color: #555;">신고 내용: ${dangerContent}</p>
                              <p style="color: #777;">주소: ${address}</p>
                            </div>`;
              infoWindow.setContent(newContent); // 인포윈도우에 주소 업데이트
            } else {
              console.error('역지오코딩 실패:', status);
            }
          },
        );
      } else {
        console.error('Naver Maps Service가 정의되지 않았습니다.');
      }

      // 인포윈도우 외부 클릭 시 닫기
      window.naver.maps.Event.addListener(infoWindow, 'closeclick', () => {
        infoWindow.close();
      });
    };

    const fetchData = async () => {
      const map = initMap();
      if (!map) return;

      try {
        const dangerData = await getDangerInfo();
        if (dangerData && dangerData.length > 0) {
          dangerData.forEach((danger: any) => {
            const { lat, lng, dangerTitle, dangerContent } = danger;
            createMarker(map, lat, lng, dangerTitle, dangerContent);
          });
        } else {
          console.error('위험 신고 데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('위험 신고 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    loadNaverMapApi()
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error(error));
  }, []);

  const handleReportClick = () => {
    navigate('report');
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
      <MapContainer ref={mapContainer} />
      <RegistContainer>
        <RegisterButton onClick={handleReportClick}>신고하기</RegisterButton>
      </RegistContainer>
    </Container>
  );
};

export default RiskMapPage;
