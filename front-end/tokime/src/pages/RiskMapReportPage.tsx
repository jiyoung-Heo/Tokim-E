// src/pages/RiskMapReportPage.tsx
import React, { useEffect, useRef } from 'react';

function RiskMapReportPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null); // 마커를 저장할 ref

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
        const lat = e.latlng.lat(); // 클릭한 위치의 위도
        const lng = e.latlng.lng(); // 클릭한 위치의 경도

        console.log(`위도: ${lat}, 경도: ${lng}`); // 위경도 정보를 콘솔에 출력

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

  return (
    <>
      <div>
        <p>제목</p>
        <input
          type="text"
          placeholder="텍스트를 입력하세요"
          style={{
            width: '300px',
            height: '30px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <p>주소</p>
        {/* 네이버 맵을 표시할 div */}
        <div
          ref={mapContainer}
          style={{
            width: '100%',
            height: '400px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <p>내용</p>
        <input
          type="text"
          placeholder="텍스트를 입력하세요"
          style={{
            width: '300px',
            height: '150px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
    </>
  );
}

export default RiskMapReportPage;
