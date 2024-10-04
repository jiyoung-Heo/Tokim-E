import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchIcon from '../assets/images/icon/searchmapicon.png'; // 각 아이콘 이미지
import RiskIcon from '../assets/images/icon/dangermapicon.png';
import DictionaryIcon from '../assets/images/icon/dictionary.png';
import KnowledgeIcon from '../assets/images/icon/commonsenseicon.png';
import InvestmentIcon from '../assets/images/icon/investicon.png';
import CarouselImage1 from '../assets/images/icon/scoreicon.png'; // 캐러셀 이미지 (추후 경로 수정)
import { changeUser } from '../redux/slices/userSlice';
import userInfoAxios from '../api/userInfoAxios';
import TokimLogo from '../assets/images/TokimEnglogo.png'; // 로고 이미지

// 컨테이너 스타일 정의 (스크롤 방지 및 높이 조정)
const Container = styled.div`
  width: 100%;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden; // 세로 스크롤 방지
`;

// 로고 스타일 (vw, vh 사용)
const Logo = styled.img`
  align-self: flex-start;
  width: 33vw;
  margin-top: 3vh;
`;

// 큰 박스들을 감싸는 박스 (가로로 배치)
const LargeIconGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
  margin-top: 2vh;
`;

// 작은 박스들을 감싸는 박스 (가로로 배치)
const SmallIconGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
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
  width: 27.77vw;
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

// 캐러셀 섹션 스타일 (text-decoration: none 추가)
const CarouselContainer = styled(Link)`
  width: 91.1vw;
  height: 21.56vh;
  background: linear-gradient(
    180deg,
    #00c99c 0%,
    #00a580 35%,
    #009977 47%,
    #008f6f 56%,
    #008869 64%,
    #00735a 84%,
    #00634d 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4.17vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw;
  margin-top: 5vh;
  text-decoration: none; // 밑줄 제거
`;

// 캐러셀 내용 및 이미지 스타일
const CarouselContent = styled.div`
  color: white;
  font-size: 4.16vw;
  font-weight: 700;
  margin-left: 5.55vw;
`;

const CarouselImage = styled.img`
  width: 21.11vw;
  height: 21.11vw;
  margin-right: 5vw;
`;

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchParentInfo = async () => {
      const data = await userInfoAxios();
      if (data) {
        dispatch(changeUser(data));
      }
    };
    fetchParentInfo();
  }, []);

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
      <CarouselContainer to="/land-purchase-knowledge">
        <CarouselContent>
          토지 상식 퀴즈 통해
          <br />
          나의 토지 상식 점수를 <br />
          알아보세요!
        </CarouselContent>
        <CarouselImage src={CarouselImage1} alt="캐러셀 이미지" />
      </CarouselContainer>
    </Container>
  );
}

export default MainPage;
