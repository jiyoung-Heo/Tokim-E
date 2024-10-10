import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registDanger } from '../api/dangerAxios';
import LandInformationRegistrationModal from '../components/modals/LandInformationRegistrationModal';
import backIcon from '../assets/images/icon/left-actionable.png';
import mapIcon from '../assets/images/icon/icon-map.png';
import sirenIcon from '../assets/images/icon/icon-siren.png';
import speakerIcon from '../assets/images/icon/icon-speaker.png';

// 필요한 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
  touch-action: none;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  margin-left: 10px; /* Adjust margin to position title properly */
`;

const BackIcon = styled.img`
  cursor: pointer; /* Add cursor pointer for better UX */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center; /* Align items vertically centered */
  margin-bottom: 1vh; /* Add margin below for spacing */
`;

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
  font-weight: bold;
`;

const DangerP = styled.p`
  margin: 1vh 0;
  font-size: 17px; /* Adjust this size as needed */
  font-weight: bold;
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Center items vertically */
`;

const Icon = styled.img`
  width: 20px; /* Set a fixed width */
  height: 20px; /* Set a fixed height */
  margin-right: 8px; /* Space between icon and text */
`;
const MapP = styled.div`
  weight: 100%;
  margin: 1vh;
  height: 25vh;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  touch-action: auto; /* 지도 부분은 확대/축소 가능 */
`;

const ButtonDiv = styled.p`
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 7vw;
`;

const SearchResultsContainer = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  border-color: #00c99c;
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

  // 모달 관련 상태 추가
  const [modalMessage, setModalMessage] = useState('');

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
          setModalMessage(
            '사용자의 위치를 가져오는 데 실패했습니다. 기본 위치로 설정합니다.',
          );
        },
      );

      window.naver.maps.Event.addListener(map.current, 'click', (e: any) => {
        const latMap = e.latlng.lat();
        const lngMap = e.latlng.lng();

        setLat(latMap);
        setLng(lngMap);

        window.naver.maps.Service.reverseGeocode(
          {
            coords: new window.naver.maps.LatLng(latMap, lngMap),
          },
          (status: number, response: any) => {
            if (status === window.naver.maps.Service.Status.OK) {
              const { status: geocodeStatus } = response.v2;
              if (geocodeStatus.code === 3) {
                setModalMessage('올바른 위치가 아닙니다.');
                setLat(null);
                setLng(null);
                return; // 마커를 찍지 않고 함수 종료
              }
              // 마커를 찍는 로직
              if (markerRef.current) {
                markerRef.current.setMap(null);
              }
              markerRef.current = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(latMap, lngMap),
                map: map.current,
              });
            } else {
              console.error('Reverse Geocoding Error:', status);
            }
          },
        );
      });
    }

    // 지도 외의 영역에서 마우스 휠 이벤트 방지
    const preventZoom = (e: WheelEvent) => {
      e.preventDefault(); // 기본 스크롤 방지
    };

    // mapContainer에 이벤트 리스너 추가
    if (mapContainer.current) {
      mapContainer.current.addEventListener('wheel', preventZoom);
    }

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      if (mapContainer.current) {
        mapContainer.current.removeEventListener('wheel', preventZoom);
      }
    };
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim() || searchQuery.length > 100) {
      setModalMessage(
        '유효하지 않은 주소입니다. 주소를 입력해 주세요 (최대 100자).',
      );
      return;
    }

    window.naver.maps.Service.geocode(
      { query: searchQuery },
      (status: number, response: any) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          setModalMessage('주소 변환에 실패했습니다.');
          return;
        }

        const { addresses } = response.v2;
        if (!addresses || addresses.length === 0) {
          setModalMessage('유효하지 않은 주소입니다.');
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
          setModalMessage('신고가 접수되었습니다');
        }
      } catch (e) {
        setModalMessage('신고 등록에 실패했습니다.');
      }
    } else {
      setModalMessage('신고 위치를 선택하시고 제목과 내용을 채워주세요!');
    }
  };

  const handleCloseModal = () => {
    if (modalMessage === '신고가 접수되었습니다') {
      navigate('/risk-map'); // 신고가 접수되었을 때만 리다이렉트
    }
    setModalMessage('');
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container>
      <TitleContainer>
        <BackIcon src={backIcon} onClick={goBack} />
        <Title>의심 토지 신고하기</Title>
      </TitleContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="주소를 입력하세요." // 수정 필요
          value={searchQuery}
          maxLength={30}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>
      {/* Render search results here */}
      {searchResults.length > 0 && (
        <SearchResultsContainer>
          {searchResults.map((result, index) => (
            <ResultItem
              key={index}
              onClick={() => {
                setLat(result.location.lat);
                setLng(result.location.lng);
                map.current.setCenter(
                  new window.naver.maps.LatLng(
                    result.location.lat,
                    result.location.lng,
                  ),
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
                setSearchResults([]); // 검색 결과를 초기화
              }}
            >
              {result.title}
            </ResultItem>
          ))}
        </SearchResultsContainer>
      )}
      <DangerP>
        <Icon src={mapIcon} alt="Map Icon" />
        신고 위치
      </DangerP>
      <MapP ref={mapContainer} />
      <DangerP>
        <Icon src={sirenIcon} alt="Siren Icon" />
        신고 제목
      </DangerP>
      <TitleText
        placeholder="제목을 입력해주세요(최대 30자)"
        value={dangerTitle}
        maxLength={30}
        onChange={(e) => setDangerTitle(e.target.value)}
      />
      <DangerP>
        <Icon src={speakerIcon} alt="Speaker Icon" />
        신고 내용
      </DangerP>
      <Content
        placeholder="상세내용을 입력해주세요(최대 1400자)"
        value={dangerContent}
        maxLength={1400}
        onChange={(e) => setDangerContent(e.target.value)}
      />
      <ButtonDiv>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
        <DangerButton onClick={handleSubmit}>작성</DangerButton>
      </ButtonDiv>
      {/* 모달 추가 */}
      {modalMessage && (
        <LandInformationRegistrationModal
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
}

export default RiskMapReportPage;
