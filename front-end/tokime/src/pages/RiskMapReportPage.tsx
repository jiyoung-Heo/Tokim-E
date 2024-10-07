// src/pages/RiskMapReportPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registDanger } from '../api/dangerAxios';
import backIcon from '../assets/images/icon/left-actionable.png';

// 필요한 스타일 정의
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

// 뒤로가기 아이콘 정의
const BackIcon = styled.img``;
const DangerButton = styled.button`
  width: 30vw;
  background-color: #00c99c;
  color: white;
  padding: 2vw;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  border: none;
`;

const TitleContainer = styled.div`
  margin-bottom: 2vh;
`;

const TitleText = styled.input`
  width: 100%;
  height: 5vh;
  padding: 2vw;
  font-size: 16px;
  border: 1.4px solid #333;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
`;
const Content = styled.textarea`
  width: 100%;
  height: 15vh;
  padding: 2vw;
  font-size: 15px;
  font-weight: bold;
  border: 1.4px solid #333;
  border-radius: 10px;
  // line-height: 1.5; // 필요에 따라 조절
  margin-bottom: 2vh;
`;

const DangerP = styled.p`
  margin: 0;
  margin-bottom: 1vh;
  font-size: 17px;
  font-weight: bold;
`;

const MapP = styled.div`
  height: 30vh;
  border: none;
  borderradius: 10px;
  font-weight: bold;
`;

const ButtonDiv = styled.p`
  margin: 0;
  display: flex; // flex container로 설정
  justify-content: center;
  gap: 7vw;
`;

function RiskMapReportPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null); // 마커를 저장할 ref
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

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
          navigate('/risk-map'); // 등록 성공 후 /risk-map 경로로 이동
        }
      } catch (e) {
        alert('신고글 등록에 실패했습니다.');
      }
    } else {
      alert('모든 필드를 입력하고 지도를 클릭하여 위치를 선택하세요.');
    }
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        신고 등록
      </Title>
      <TitleContainer>
        <DangerP>제목</DangerP>
        <TitleText
          type="text"
          placeholder="신고 제목을 입력하세요"
          maxLength={255}
          value={dangerTitle}
          onChange={(e) => setDangerTitle(e.target.value)} // 제목 상태 업데이트
        />
      </TitleContainer>

      <TitleContainer>
        <DangerP>신고위치</DangerP>
        <MapP ref={mapContainer} />
      </TitleContainer>

      <div>
        <DangerP>내용</DangerP>
        <Content
          placeholder="내용을 입력하세요"
          maxLength={1500}
          value={dangerContent}
          onChange={(e) => setDangerContent(e.target.value)} // 내용 상태 업데이트
        />
      </div>
      <ButtonDiv>
        <DangerButton onClick={handleSubmit}>작성</DangerButton>
        <DangerButton onClick={handleBack}>취소</DangerButton>
      </ButtonDiv>
    </Container>
  );
}

export default RiskMapReportPage;
