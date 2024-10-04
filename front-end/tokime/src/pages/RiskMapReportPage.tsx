// src/pages/RiskMapReportPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { registDanger } from '../api/dangerAxios';

const DangerButton = styled.button`
  margin-top: 10px;
  width: 23%;
  background-color: #00c99c;
  color: white;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  justify-content: right;
  align-items: right;
  border: none;
`;

const DangerP = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const MapP = styled.p`
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const ButtonDiv = styled.p`
  margin-top: 0.5px;
  display: flex; // flex container로 설정
  justify-content: flex-end; // 오른쪽 정렬
  gap: 20px;
`;

function RiskMapReportPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null); // 마커를 저장할 ref

  const [lat, setLat] = useState<number | null>(null); // 위도 상태
  const [lng, setLng] = useState<number | null>(null); // 경도 상태
  const [dangerTitle, setDangerTitle] = useState(''); // 제목 상태
  const [dangerContent, setDangerContent] = useState(''); // 내용 상태

  useEffect(() => {
    if (mapContainer.current) {
      // 네이버 지도 초기화
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울의 위경도
        zoom: 10,
      };
      map.current = new window.naver.maps.Map(mapContainer.current, mapOptions);

      // 지도 클릭 이벤트 핸들러
      window.naver.maps.Event.addListener(map.current, 'click', (e: any) => {
        const latMap = e.latlng.lat(); // 클릭한 위치의 위도
        const lngMap = e.latlng.lng(); // 클릭한 위치의 경도

        console.log(`위도: ${latMap}, 경도: ${lngMap}`); // 위경도 정보를 콘솔에 출력

        setLat(latMap); // 클릭한 위도 저장
        setLng(lngMap); // 클릭한 경도 저장

        // 기존 마커가 있으면 제거
        if (marker.current) {
          marker.current.setMap(null); // 마커를 지도에서 제거
        }

        // 새로운 마커 추가
        marker.current = new window.naver.maps.Marker({
          position: e.latlng, // 클릭한 위치의 위경도
          map: map.current, // 현재 지도에 마커 추가
        });
      });
    }
  }, []);

  // 신고글 등록 함수
  const handleSubmit = async () => {
    if (lat && lng && dangerTitle && dangerContent) {
      const dangerData = {
        lat,
        lng,
        dangerTitle,
        dangerContent,
      };

      try {
        const res = await registDanger(dangerData); // axios로 데이터 전송
        if (res) {
          alert('신고글이 성공적으로 등록되었습니다.');
        }
      } catch (e) {
        alert('신고글 등록에 실패했습니다.');
      }
    } else {
      alert('모든 필드를 입력하고 지도를 클릭하여 위치를 선택하세요.');
    }
  };

  return (
    <>
      <div>
        <DangerP>제목</DangerP>
        <input
          type="text"
          placeholder="텍스트를 입력하세요"
          value={dangerTitle}
          onChange={(e) => setDangerTitle(e.target.value)} // 제목 상태 업데이트
          style={{
            width: '100%',
            height: '30px',
            padding: '5px',
            fontSize: '16px',
            border: '1.4px solid #333',
            borderRadius: '10px',
          }}
        />
      </div>
      <MapP>
        {/* 네이버 맵을 표시할 div */}
        <div
          ref={mapContainer}
          style={{
            width: '100%',
            height: '400px',
            border: 'none',
            borderRadius: '10px',
          }}
        />
      </MapP>
      <div>
        <DangerP>내용</DangerP>
        <input
          type="text"
          placeholder="텍스트를 입력하세요"
          value={dangerContent}
          onChange={(e) => setDangerContent(e.target.value)} // 내용 상태 업데이트
          style={{
            width: '100%',
            height: '150px',
            padding: '5px',
            fontSize: '16px',
            border: '1.4px solid #333',
            borderRadius: '10px',
            textAlign: 'center', // 텍스트 가운데 정렬
            lineHeight: '1.5', // 필요에 따라 조절
          }}
        />
      </div>
      <ButtonDiv>
        <DangerButton onClick={handleSubmit}>작성</DangerButton>
        <DangerButton>취소</DangerButton>
      </ButtonDiv>
    </>
  );
}

export default RiskMapReportPage;
