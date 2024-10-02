import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getSelectedTerm } from '../api/termAxios'; // API 호출

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

const TermDetailContainer = styled.div`
  position: absolute;
  width: 340px;
  height: auto;
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

const RelatedLawsContainer = styled.div`
  position: absolute;
  width: 340px;
  height: auto;
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
  const { term } = useParams<{ term: string }>(); // useParams로 termId 가져오기
  const [termData, setTermData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermData = async () => {
      try {
        const data = await getSelectedTerm(Number(term)); // API로 용어 상세 정보 가져오기
        setTermData(data); // API로 받은 데이터 저장
      } catch (error) {
        console.error('용어 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchTermData();
  }, [term]);

  if (loading) {
    return <div>용어 정보를 불러오는 중입니다...</div>;
  }

  if (!termData) {
    return <div>해당 용어 정보를 찾을 수 없습니다.</div>;
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
        <RelatedLawsTitle>관련 법률 및 규제 정보</RelatedLawsTitle>
        <div>{termData.termLaw}</div>
      </RelatedLawsContainer>

      {/* 관련 뉴스 */}
      <RelatedNewsTitle>관련 뉴스</RelatedNewsTitle>
      <NewsContainer>
        {termData.news && termData.news.length > 0 ? (
          termData.news.map((newsItem: string, index: number) => (
            <NewsItem key={index}>{newsItem}</NewsItem>
          ))
        ) : (
          <NewsItem>관련 뉴스가 없습니다.</NewsItem>
        )}
      </NewsContainer>
    </Container>
  );
}

export default LandTermDetail;
