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

const BackIcon = styled.img``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
`;

const SearchInput = styled.input`
  width: 95%;
  height: 5vh;
  padding: 2vw;
  font-size: 16px;
  border: 1.4px solid #333;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2vh;
`;

const SearchButton = styled.button`
  width: 15%;
  margin-left: 3vh;
  font-size: 16px;
  background-color: #00c99c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

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

const CancelButton = styled.button`
  width: 30vw;
  background-color: #ff4757;
  color: white;
  padding: 2vw;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  border: none;
`;

const TitleContainer = styled.div``;

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
  margin-botton: 2vh;
`;

const DangerP = styled.p`
  margin-top: 1vh;
  margin-bottom: 1vh;
  font-size: 17px;
  font-weight: bold;
`;

const MapP = styled.div`
  height: 25vh;
  border: none;
  border-radius: 10px;
  font-weight: bold;
`;

const ButtonDiv = styled.p`
  margin: 0;
  padding-top: 2vh;
  display: flex;
  justify-content: center;
  gap: 7vw;
`;

function RiskMapReportPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);
  const markerRef = useRef<any>(null); // 클릭한 위치에 마커를 표시하기 위한 ref
  const navigate = useNavigate();

  const [lat, setLat] = useState<number | null>(null); // 위도 상태
  const [lng, setLng] = useState<number | null>(null); // 경도 상태
  const [dangerTitle, setDangerTitle] = useState(''); // 제목 상태
  const [dangerContent, setDangerContent] = useState(''); // 내용 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색창 상태

  useEffect(() => {
    if (mapContainer.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울의 위경도
        zoom: 10,
      };
      map.current = new window.naver.maps.Map(mapContainer.current, mapOptions);

      // 사용자 위치 가져오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setLat(userLat); // 사용자의 위도 저장
          setLng(userLng); // 사용자의 경도 저장

          // 사용자의 위치로 지도 중심 이동
          map.current.setCenter(new window.naver.maps.LatLng(userLat, userLng));
        },
        (error) => {
          console.error('Geolocation error:', error);
          // 사용자 위치를 가져오는 데 실패하면 기본 위치로 설정
          alert(
            '사용자의 위치를 가져오는 데 실패했습니다. 기본 위치로 설정합니다.',
          );
        },
      );

      // 지도 클릭 이벤트 추가
      window.naver.maps.Event.addListener(map.current, 'click', (e: any) => {
        const latMap = e.latlng.lat(); // 클릭한 위치의 위도
        const lngMap = e.latlng.lng(); // 클릭한 위치의 경도

        setLat(latMap); // 클릭한 위도 저장
        setLng(lngMap); // 클릭한 경도 저장

        // 클릭한 위치에 마커 표시 (기존 마커가 있으면 제거)
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latMap, lngMap),
          map: map.current,
        });
      });
    }
  }, []);

  const handleSearch = () => {
    // 검색창이 비어있거나 100자를 초과하는 경우
    if (!searchQuery.trim() || searchQuery.length > 100) {
      alert('유효하지 않은 주소입니다. 주소를 입력해 주세요 (최대 100자).');
      return;
    }

    window.naver.maps.Service.geocode(
      {
        query: searchQuery,
      },
      (status: number, response: any) => {
        // 매개변수 타입 명시
        if (status !== window.naver.maps.Service.Status.OK) {
          alert('주소 변환에 실패했습니다.');
          return;
        }

        // 주소 변환 결과가 있는지 확인
        const address = response.v2.addresses;
        if (!address || address.length === 0) {
          alert('유효하지 않은 주소입니다.');
          return;
        }

        const latSearch = address[0].y;
        const lngSearch = address[0].x;

        setLat(latSearch);
        setLng(lngSearch);

        // 지도의 중앙을 검색된 위치로 이동
        map.current.setCenter(
          new window.naver.maps.LatLng(latSearch, lngSearch),
        );

        // 검색된 위치에 마커 표시 (기존 마커가 있으면 제거)
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latSearch, lngSearch),
          map: map.current,
        });
      },
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSubmit = async () => {
    if (lat && lng && dangerTitle && dangerContent) {
      const dangerData = {
        lat,
        lng,
        dangerTitle,
        dangerContent,
      };

      try {
        const res = await registDanger(dangerData);
        if (res === 200) {
          navigate('/risk-map'); // 등록 성공 후 /risk-map 경로로 이동
        }
      } catch (e) {
        alert('신고글 등록에 실패했습니다.');
      }
    } else {
      alert(
        '모든 필드를 입력하고 지도를 클릭하거나 주소를 검색하여 위치를 선택하세요.',
      );
    }
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleCancel = () => {
    navigate('/risk-map'); // '취소' 버튼 클릭 시 '/risk-map' 경로로 이동
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
          maxLength={50}
          value={dangerTitle}
          onChange={(e) => setDangerTitle(e.target.value)}
        />
        <DangerP>내용</DangerP>
        <Content
          placeholder="신고 내용을 입력하세요"
          maxLength={200}
          value={dangerContent}
          onChange={(e) => setDangerContent(e.target.value)}
        />
      </TitleContainer>
      <DangerP>주소 검색</DangerP>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="주소를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>
      <MapP ref={mapContainer} />
      <ButtonDiv>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
        <DangerButton onClick={handleSubmit}>작성</DangerButton>
      </ButtonDiv>
    </Container>
  );
}

export default RiskMapReportPage;
