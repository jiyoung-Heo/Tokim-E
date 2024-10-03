import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  getSelectedTerm,
  registTermLike,
  deleteTermLike,
} from '../api/termAxios'; // API 호출
import OpenAiUtil from '../utils/OpenAiUtill';
import starIcon from '../assets/images/icon/star.svg';
import starFilled from '../assets/images/icon/star_filled.svg';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  background: #f3f7fb;
`;

const Title = styled.h2`
  position: absolute;
  left: 11.11vw;
  top: 6.25vh;
  font-size: 20px;
  font-weight: 700;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
`;

const TermDetailContainer = styled.div`
  width: 90vw;
  max-width: 340px;
  height: 180px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 2.34vh;
  box-sizing: border-box;
  overflow-y: auto;
  margin-top: 7vh;
`;

const FavoriteIcon = styled.img<{ isLiked: boolean }>`
  position: absolute;
  top: 7.19vh; // 상단에서 2vh 위치
  right: 5.83vw; // 오른쪽에서 5vw 위치
  width: 6vw;
  height: 6vw;
  max-width: 40px;
  max-height: 40px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isLiked ? 1 : 0.5)};
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
  overflow-y: auto;
  margin-top: 2.03vh;
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
  margin-top: 4.38vh;
`;

// 관련 뉴스 컨테이너
const NewsContainer = styled.div`
  width: 90vw;
  max-width: 340px;
  height: 110px;
  border-radius: 10px;
  box-sizing: border-box;
  overflow-y: auto;
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
  const [isLiked, setIsLiked] = useState(false); // 즐겨찾기 상태

  // 용어 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTermData = async () => {
      try {
        const data = await getSelectedTerm(Number(term)); // API로 용어 상세 정보 가져오기
        setTermData(data);
        setIsLiked(data.isLiked); // 서버에서 받아온 즐겨찾기 상태를 반영
      } catch (error) {
        console.error('용어 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchTermData();
  }, [term]);

  // OpenAI 응답을 가져오는 useEffect
  useEffect(() => {
    const fetchOpenAiResponse = async () => {
      if (termData && termData.termLaw) {
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

    fetchOpenAiResponse();
  }, [termData]);

  // 즐겨찾기 토글 함수
  const toggleLike = async () => {
    try {
      if (isLiked) {
        await deleteTermLike(Number(term)); // 즐겨찾기 해제
      } else {
        await registTermLike(Number(term)); // 즐겨찾기 등록
      }
      setIsLiked(!isLiked); // 상태 업데이트
    } catch (error) {
      console.error('즐겨찾기 처리 중 오류 발생:', error);
    }
  };

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

      {/* 즐겨찾기 아이콘 */}
      <FavoriteIcon
        src={isLiked ? starFilled : starIcon}
        alt="즐겨찾기"
        isLiked={isLiked}
        onClick={toggleLike}
      />

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
