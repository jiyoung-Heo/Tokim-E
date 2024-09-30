import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f3f7fb;
`;

const Title = styled.h2`
  position: absolute;
  left: 40px;
  top: 40px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
`;

// 용어 상세 설명 영역
const TermDetailContainer = styled.div`
  position: absolute;
  width: 340px;
  height: 182px;
  left: 9px;
  top: 95px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
`;

const TermTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
  margin-bottom: 15px;
`;

const TermDescription = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;

// 관련 법률 및 규제 정보
const RelatedLawsContainer = styled.div`
  position: absolute;
  width: 340px;
  height: 110px;
  left: 9px;
  top: 290px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
`;

const RelatedLawsTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #333333;
  margin-bottom: 10px;
`;

// 관련 뉴스 영역
const RelatedNewsTitle = styled.div`
  position: absolute;
  width: 182px;
  height: 21px;
  left: 9px;
  top: 428px;
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 15px;
  color: #333333;
`;

const NewsContainer = styled.div`
  position: absolute;
  width: 360px;
  left: 0px;
  top: 457px;
`;

const NewsItem = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #333333;
  padding: 8px 18px;
  border-bottom: 1px solid #bfbfbf;
`;

// 용어 상세 컴포넌트
function LandTermDetail() {
  const { term } = useParams<{ term: string }>(); // useParams로 term을 가져옴
  const [termData, setTermData] = useState<any>(null);

  // 예시 데이터 - 실제로는 API 요청으로 불러와야 함
  const mockData = {
    termName: '가로구역 최고높이 제한구역',
    termDescribe:
      '건축 허가권자가 「건축법」의 규정에 따라 건축위원회의 심의를 거쳐 가로구역(도로 로 둘러싸인 일단의 지역)을 단위로 건축물의 최고높이를 지정공고한 지역을 말한다.',
    relatedLaws: '제1장 총칙 제1조 (목적)...',
    news: [
      "청주 원도심 상업지역 건축물 높이 '최고 130 ...",
      "서울 '신월7동 1구역' 재개발 높이완화...최고 15층",
      "법원 '동해 천곡동 60m 고도제한 지정 적법'",
    ],
  };

  useEffect(() => {
    // API 요청으로 term 정보를 가져옴
    // 예: fetchTermData(term)
    setTermData(mockData); // 실제로는 API 데이터로 대체
  }, [term]);

  if (!termData) {
    return <div>용어 정보를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <Title>용어 상세 설명</Title>

      {/* 용어 정보 */}
      <TermDetailContainer>
        <TermTitle>{termData.termName}</TermTitle>
        <TermDescription>{termData.termDescribe}</TermDescription>
      </TermDetailContainer>

      {/* 관련 법률 및 규제 정보 */}
      <RelatedLawsContainer>
        <RelatedLawsTitle>관련법률 및 규제정보</RelatedLawsTitle>
        <div>{termData.relatedLaws}</div>
      </RelatedLawsContainer>

      {/* 관련 뉴스 */}
      <RelatedNewsTitle>관련 뉴스</RelatedNewsTitle>
      <NewsContainer>
        {termData.news.map((newsItem: string, index: number) => (
          <NewsItem key={index}>{newsItem}</NewsItem>
        ))}
      </NewsContainer>
    </Container>
  );
}

export default LandTermDetail;
