import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getSelectedTerm } from '../api/termAxios'; // API 호출
import OpenAiUtil from '../utils/OpenAiUtill';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh 2vw;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 5vw;
  font-weight: 700;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  margin-bottom: 20px;
  text-align: center;
`;

// 용어 정보 컨테이너
const TermDetailContainer = styled.div`
  width: 90vw; // 반응형을 위해 90vw로 설정
  max-width: 340px;
  height: 180px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto; // 스크롤 추가
  margin-bottom: 20px;
`;

const TermTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 5vw;
  line-height: 6vw;
  color: #333333;
  margin-bottom: 10px;
`;

const TermDescription = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 4vw;
  line-height: 5vw;
  color: #000000;
`;

// 관련 법률 및 규제 정보 컨테이너
const RelatedLawsContainer = styled.div`
  width: 90vw;
  max-width: 340px;
  height: 110px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto; // 스크롤 추가
  margin-bottom: 20px;
`;

const RelatedLawsTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  text-align: center;
  color: #333333;
  margin-bottom: 10px;
`;

// 관련 뉴스 타이틀
const RelatedNewsTitle = styled.div`
  width: 90vw;
  max-width: 340px;
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  color: #333333;
  margin-bottom: 10px;
`;

// 관련 뉴스 컨테이너
const NewsContainer = styled.div`
  width: 90vw;
  max-width: 340px;
  height: 110px;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto; // 스크롤 추가
  margin-bottom: 20px;
`;

const NewsItem = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 3.5vw;
  line-height: 5vw;
  color: #333333;
  padding: 8px 0;
  border-bottom: 1px solid #bfbfbf;
`;

// 용어 상세 컴포넌트
function LandTermDetail() {
  const { term } = useParams<{ term: string }>(); // useParams로 termId 가져오기
  const [termData, setTermData] = useState<any>(null);
  const [openAiResponse, setOpenAiResponse] = useState<string | null>(null); // OpenAI 응답 저장
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
  }, [term]); // term이 변경될 때마다 fetchTermData를 호출

  useEffect(() => {
    const fetchOpenAiResponse = async () => {
      if (termData && termData.termLaw) {
        // termData가 존재하고 termLaw가 있을 때만 호출
        try {
          const msg = `${termData.termLaw}에 대해 알려줘.`;
          const result = await OpenAiUtil.prompt(msg); // OpenAI API 호출
          setOpenAiResponse(result.message.content); // 응답 내용 저장
        } catch (error) {
          console.error('OpenAI API 실행 중 오류 발생:', error);
          setOpenAiResponse('OpenAI 응답을 가져오는데 실패했습니다.');
        }
      }
    };

    fetchOpenAiResponse(); // termData가 변경될 때마다 OpenAI 응답을 가져옴
  }, [termData]); // termData가 변경될 때마다 fetchOpenAiResponse를 호출

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
        <div>{openAiResponse || '응답을 불러오는 중입니다...'}</div>
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
