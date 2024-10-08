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
  margin: 0 0 1vh 0;
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
  margin-bottom: 1vh;
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
`;

const SearchButton = styled.button`
  width: 20%;
  height: 5vh;
  margin-left: 2vh;
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
  margin-bottom: 1vh;
  margin-top: 1vh;
`;

const DangerP = styled.p`
  margin-top: 1vh;
  margin-bottom: 1vh;
  font-size: 17px;
  font-weight: bold;
`;

const MapP = styled.div`
  margin: 1vh;
  height: 25vh;
  border: none;
  border-radius: 10px;
  font-weight: bold;
`;

const ButtonDiv = styled.p`
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 7vw;
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 20vh; /* 검색창 아래 위치 */
  left: 5%;
  width: 90%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 9000; /* 지도 위에 겹쳐서 표시되도록 설정 */
`;

const ResultItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

function RiskMapReportPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const navigate = useNavigate();

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [dangerTitle, setDangerTitle] = useState('');
  const [dangerContent, setDangerContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (mapContainer.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 10,
      };
      map.current = new window.naver.maps.Map(mapContainer.current, mapOptions);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setLat(userLat);
          setLng(userLng);

          map.current.setCenter(new window.naver.maps.LatLng(userLat, userLng));
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert(
            '사용자의 위치를 가져오는 데 실패했습니다. 기본 위치로 설정합니다.',
          );
        },
      );

      window.naver.maps.Event.addListener(map.current, 'click', (e: any) => {
        const latMap = e.latlng.lat();
        const lngMap = e.latlng.lng();

        setLat(latMap);
        setLng(lngMap);

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
    if (!searchQuery.trim() || searchQuery.length > 100) {
      alert('유효하지 않은 주소입니다. 주소를 입력해 주세요 (최대 100자).');
      return;
    }

    window.naver.maps.Service.geocode(
      { query: searchQuery },
      (status: number, response: any) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          alert('주소 변환에 실패했습니다.');
          return;
        }

        const { addresses } = response.v2;
        if (!addresses || addresses.length === 0) {
          alert('유효하지 않은 주소입니다.');
          return;
        }

        const results = addresses.map((address: any) => ({
          title: address.jibunAddress,
          content: address.roadAddress,
          location: {
            lat: address.y,
            lng: address.x,
          },
        }));

        setSearchResults(results);

        const firstResult = results[0];
        if (firstResult) {
          setLat(firstResult.location.lat);
          setLng(firstResult.location.lng);
          map.current.setCenter(
            new window.naver.maps.LatLng(
              firstResult.location.lat,
              firstResult.location.lng,
            ),
          );

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          markerRef.current = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              firstResult.location.lat,
              firstResult.location.lng,
            ),
            map: map.current,
          });
        }
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
        const result = await registDanger(dangerData);
        if (result === 200) {
          alert('신고가 성공적으로 등록되었습니다.');
          navigate('/risk-map'); // 신고 후 리다이렉트
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
    navigate(-1);
  };

  const handleCancel = () => {
    navigate('/risk-map');
  };

  const handleResultClick = (result: any) => {
    setLat(result.location.lat);
    setLng(result.location.lng);
    map.current.setCenter(
      new window.naver.maps.LatLng(result.location.lat, result.location.lng),
    );

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        result.location.lat,
        result.location.lng,
      ),
      map: map.current,
    });

    // 검색 결과 초기화
    setSearchResults([]);
    setSearchQuery(result.title); // 클릭한 결과 제목으로 검색창 업데이트
  };

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        신고 등록
      </Title>
      <DangerP>신고 위치</DangerP>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="주소를 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>
      {searchResults.length > 0 && (
        <SearchResultsContainer>
          {searchResults.map((result, index) => (
            <ResultItem key={index} onClick={() => handleResultClick(result)}>
              {result.title}
            </ResultItem>
          ))}
        </SearchResultsContainer>
      )}
      <MapP ref={mapContainer} />
      <DangerP>신고 제목</DangerP>
      <TitleContainer>
        <TitleText
          type="text"
          placeholder="제목을 입력하세요"
          value={dangerTitle}
          onChange={(e) => setDangerTitle(e.target.value)}
        />
      </TitleContainer>
      <DangerP>신고 내용</DangerP>
      <Content
        placeholder="내용을 입력하세요"
        value={dangerContent}
        onChange={(e) => setDangerContent(e.target.value)}
      />
      <ButtonDiv>
        <DangerButton onClick={handleSubmit}>작성</DangerButton>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
      </ButtonDiv>
    </Container>
  );
}

export default RiskMapReportPage;
