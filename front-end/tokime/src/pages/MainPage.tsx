import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import SearchIcon from '../assets/images/icon/searchmapicon.png'; // 각 아이콘 이미지
import RiskIcon from '../assets/images/icon/dangermapicon.png';
import DictionaryIcon from '../assets/images/icon/dictionary.png';
import KnowledgeIcon from '../assets/images/icon/commonsenseicon.png';
import InvestmentIcon from '../assets/images/icon/investicon.png';
import CarouselImage1 from '../assets/images/icon/scoreicon.png'; // 캐러셀 이미지 (추후 경로 수정)
import CarouselImage2 from '../assets/images/icon/map.png'; // 캐러셀 이미지 (추후 경로 수정)
import { changeUser } from '../redux/slices/userSlice';
import userInfoAxios from '../api/userInfoAxios';
import TokimLogo from '../assets/images/TokimEnglogo.png'; // 로고 이미지
import fetchKnowledgeByCategory from '../api/LandPurchaseKnowledge';
import { changeLandpurchaseProcedure } from '../redux/slices/landpurchaseProcedureSlice';
import { changeLandEssentialKnowledge } from '../redux/slices/landEssentialKnowledgeSlice';
import Carousel from '../components/Carousel'; // 단일 캐러셀 컴포넌트

// 컨테이너 스타일 정의 (스크롤 방지 및 높이 조정)
const Container = styled.div`
  width: 100%;
  background: #f3f7fb;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow-y: hidden; // 세로 스크롤 방지
`;

// 로고 스타일 (vw, vh 사용)
const Logo = styled.img`
  align-self: flex-start;
  width: 33vw;
  margin-bottom: 5vh;
`;

// 큰 박스들을 감싸는 박스 (가로로 배치)
const LargeIconGrid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 2vw;
`;

// 작은 박스들을 감싸는 박스 (가로로 배치)
const SmallIconGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 89vw;
  margin-top: 5vh;
`;

// 큰 아이콘 박스 스타일
const LargeIconBox = styled(Link)`
  width: 38.8vw;
  height: 18.75vh;
  background: #ffffff;
  border-radius: 2.78vw;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  text-align: left;
  text-decoration: none;
  color: #333333;
  padding: 2.78vw;
  position: relative;
`;

// 작은 아이콘 박스 스타일
const SmallIconBox = styled(Link)`
  width: 27vw;
  height: 16.66vh;
  background: #ffffff;
  border-radius: 2.78vw;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  text-align: left;
  text-decoration: none;
  color: #333333;
  padding: 2vw;
  position: relative;
`;

// 큰 박스 안의 아이콘 이미지 스타일
const LargeIcon = styled.img`
  width: 16.66vw;
  height: 9vh;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

// 작은 박스 안의 아이콘 이미지 스타일
const SmallIcon = styled.img`
  width: 11.1vw;
  height: 6.25vh;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

// 큰 아이콘 박스 제목 및 부제목 스타일
const LargeIconTitle = styled.span`
  font-size: 4.16vw;
  font-weight: 700;
  margin-bottom: 5px;
`;

const LargeIconSubtitle = styled.span`
  font-size: 2.77vw;
  font-weight: 400;
  margin-bottom: 15px;
`;

// 작은 아이콘 박스 제목 및 부제목 스타일
const SmallIconTitle = styled.span`
  font-size: 3.33vw;
  font-weight: 700;
`;

const SmallIconSubtitle = styled.span`
  font-size: 2.77vw;
  font-weight: 400;
  margin-top: 1.5vh;
`;

// 캐러셀 데이터 타입
interface CarouselData {
  to: string;
  bgColor: string;
  content: string;
  imageSrc: string;
}

function getCookieValue(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(';').shift() || null; // split이나 shift가 undefined일 경우 null 반환
    }
  }
  return null; // 모든 경우에 대해 null 반환
}

function MainPage() {
  const dispatch = useDispatch();
  const [currentCarousel, setCurrentCarousel] = useState(0); // 현재 캐러셀 인덱스
  const carouselData: CarouselData[] = [
    {
      to: '/land-purchase-quiz',
      bgColor: 'linear-gradient(180deg, #00c99c 0%, #00a580 35%, #009977 47%)',
      content: '토지 상식 퀴즈 통해\n 나의 토지 상식 점수를\n알아보세요!',
      imageSrc: CarouselImage1,
    },
    {
      to: '/risk-map/report',
      bgColor: 'linear-gradient(180deg, #ff9966 0%, #ff6600 50%, #cc3300 100%)',
      content: '토지사기가 의심된다면\n위험 신고를 해주세요!',
      imageSrc: CarouselImage2,
    },
  ];
  // 스와이프 핸들러 설정
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentCarousel((prev) =>
        prev === carouselData.length - 1 ? 0 : prev + 1,
      ),
    onSwipedRight: () =>
      setCurrentCarousel((prev) =>
        prev === 0 ? carouselData.length - 1 : prev - 1,
      ),
  });

  useEffect(() => {
    const authCookie = getCookieValue('Authorization');
    if (authCookie !== null) {
      const fetchParentInfo = async () => {
        const data = await userInfoAxios();
        if (data) {
          dispatch(changeUser(data));
        }
      };
      fetchParentInfo();
    }
    const fetchData = async () => {
      try {
        const data = await fetchKnowledgeByCategory(0);
        const data2 = await fetchKnowledgeByCategory(1);

        dispatch(changeLandpurchaseProcedure(data));
        dispatch(changeLandEssentialKnowledge(data2));
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();

    // 캐러셀 자동 전환
    const interval = setInterval(() => {
      setCurrentCarousel((prev) =>
        prev === carouselData.length - 1 ? 0 : prev + 1,
      );
    }, 3000); // 3초마다 캐러셀 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, [dispatch, carouselData.length]);

  return (
    <Container>
      <Logo src={TokimLogo} alt="Tokim Logo" />
      <LargeIconGrid>
        <LargeIconBox to="/address-search">
          <LargeIconTitle>지번 검색</LargeIconTitle>
          <LargeIconSubtitle>원하는 지역 검색</LargeIconSubtitle>
          <LargeIcon src={SearchIcon} alt="지번 검색" />
        </LargeIconBox>
        <LargeIconBox to="/risk-map">
          <LargeIconTitle>위험지도</LargeIconTitle>
          <LargeIconSubtitle>개발 위험 구역 확인</LargeIconSubtitle>
          <LargeIcon src={RiskIcon} alt="위험지도" />
        </LargeIconBox>
      </LargeIconGrid>
      <SmallIconGrid>
        <SmallIconBox to="/land-terms">
          <SmallIconTitle>토지 용어 사전</SmallIconTitle>
          <SmallIconSubtitle>
            어려운 용어 <br />
            쉽게!
          </SmallIconSubtitle>
          <SmallIcon src={DictionaryIcon} alt="토지 용어 사전" />
        </SmallIconBox>
        <SmallIconBox to="/land-purchase-knowledge">
          <SmallIconTitle>토지 구매 상식</SmallIconTitle>
          <SmallIconSubtitle>
            알아야 할 <br />
            상식
          </SmallIconSubtitle>
          <SmallIcon src={KnowledgeIcon} alt="토지 구매 상식" />
        </SmallIconBox>
        <SmallIconBox to="/investment">
          <SmallIconTitle>투자 예정지</SmallIconTitle>
          <SmallIconSubtitle>
            나의 투자 <br />
            지역 체크
          </SmallIconSubtitle>
          <SmallIcon src={InvestmentIcon} alt="투자 예정지" />
        </SmallIconBox>
      </SmallIconGrid>
      {/* 현재 캐러셀 아이템 */}
      <div {...handlers}>
        {' '}
        {/* 추가된 부분 */}
        <Carousel
          to={carouselData[currentCarousel].to}
          bgColor={carouselData[currentCarousel].bgColor}
          content={carouselData[currentCarousel].content}
          imageSrc={carouselData[currentCarousel].imageSrc}
        />
      </div>{' '}
      {/* 추가된 부분 */}
    </Container>
  );
}

export default MainPage;
