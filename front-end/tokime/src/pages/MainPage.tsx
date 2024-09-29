import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TokimLogo from '../assets/images/TokimEnglogo.png'; // 로고 이미지
import SearchIcon from '../assets/images/icon/searchmapicon.png'; // 각 아이콘 이미지
import RiskIcon from '../assets/images/icon/dangermapicon.png';
import DictionaryIcon from '../assets/images/icon/dictionary.png';
import KnowledgeIcon from '../assets/images/icon/commonsenseicon.png';
import InvestmentIcon from '../assets/images/icon/investicon.png';
import CarouselImage1 from '../assets/images/icon/scoreicon.png'; // 캐러셀 이미지 (추후 경로 수정)

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f3f7fb;
`;

// 로고 스타일
const Logo = styled.img`
  width: 118px;
  height: 43px;
  margin-top: 47px;
  position: absolute;
  left: 25px;
`;

// 지번 검색 & 위험지도 아이콘 스타일
const IconBox = styled(Link)`
  width: 140px;
  height: 120px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  text-decoration: none;
  color: #333333;
  position: absolute;
  padding: 10px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const IconTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const IconSubtitle = styled.span`
  font-size: 10px;
  font-weight: 400;
  position: absolute;
  top: 35px;
  left: 10px;
`;

// 하단 3개 아이콘 스타일
const SmallIconBox = styled(IconBox)`
  width: 100px;
  height: 100px;
`;

const SmallIcon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const SmallIconTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  position: absolute;
  top: 8px;
  left: 8px;
  line-height: 1.5;
`;

const SmallIconSubtitle = styled.span`
  font-size: 10px;
  font-weight: 400;
  position: absolute;
  top: 40px;
  left: 8px;
  line-height: 1.5;
`;

// 캐러셀 섹션
const CarouselContainer = styled(Link)`
  width: 328px;
  height: 138px;
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
  border-radius: 15px;
  margin: 24px auto;
  display: flex;
  align-items: center;
  text-decoration: none;
  position: absolute;
  left: 16px;
  top: 384px;
`;

const CarouselContent = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 700;
  margin-left: 20px;
`;

const CarouselImage = styled.img`
  width: 76px;
  height: 76px;
  right: 40px;
  position: absolute;
`;

function MainPage() {
  return (
    <Container>
      {/* 로고 */}
      <Logo src={TokimLogo} alt="Tokim Logo" />

      {/* 지번 검색 */}
      <IconBox to="/address-search" style={{ left: '25px', top: '107px' }}>
        <Icon src={SearchIcon} alt="지번 검색" />
        <IconTitle>지번 검색</IconTitle>
        <IconSubtitle>원하는 지역 검색</IconSubtitle>
      </IconBox>

      {/* 위험지도 */}
      <IconBox to="/risk-map" style={{ left: '195px', top: '107px' }}>
        <Icon src={RiskIcon} alt="위험지도" />
        <IconTitle>위험지도</IconTitle>
        <IconSubtitle>개발 위험 구역 확인</IconSubtitle>
      </IconBox>

      {/* 토지 용어 사전 */}
      <SmallIconBox to="/land-terms" style={{ left: '16px', top: '260px' }}>
        <SmallIcon src={DictionaryIcon} alt="토지 용어 사전" />
        <SmallIconTitle>토지 용어 사전</SmallIconTitle>
        <SmallIconSubtitle>
          어려운 용어
          <br />
          쉽게!
        </SmallIconSubtitle>
      </SmallIconBox>

      {/* 토지 구매 상식 */}
      <SmallIconBox
        to="/land-purchase-knowledge"
        style={{ left: '130px', top: '260px' }}
      >
        <SmallIcon src={KnowledgeIcon} alt="토지 구매 상식" />
        <SmallIconTitle>토지 구매 상식</SmallIconTitle>
        <SmallIconSubtitle>
          알아야 할
          <br />
          상식
        </SmallIconSubtitle>
      </SmallIconBox>

      {/* 투자 예정지 */}
      <SmallIconBox to="/investment" style={{ left: '244px', top: '260px' }}>
        <SmallIcon src={InvestmentIcon} alt="투자 예정지" />
        <SmallIconTitle>투자 예정지</SmallIconTitle>
        <SmallIconSubtitle>
          나의 투자
          <br />
          지역 체크
        </SmallIconSubtitle>
      </SmallIconBox>

      {/* 캐러셀 섹션 */}
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
