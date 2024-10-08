import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSelectedTerm,
  registTermLike,
  deleteTermLike,
} from '../api/termAxios'; // API 호출
import elasticNewsAxios from '../api/elasticNewsAxios';
import OpenAiUtil from '../utils/OpenAiUtill';
import starIcon from '../assets/images/icon/star.svg';
import starFilled from '../assets/images/icon/star_filled.svg';
import backIcon from '../assets/images/icon/left-actionable.png';
import LoadingSpinner from '../components/layouts/LoadingSpinner';

// 스타일 정의
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
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  align-items: center;
  word-break: keep-all; // 단어가 중간에 잘리지 않도록 설정
  white-space: normal; // 일반적인 줄바꿈 허용
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 뒤로가기 아이콘 정의
const BackIcon = styled.img``;

const TermDetailContainer = styled.div`
  height: 25vh;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 2vh;
  box-sizing: border-box;
  overflow-y: auto;
  margin-top: 3vh;
`;

const FavoriteIcon = styled.img<{ isLiked: boolean }>`
  width: 8vw;
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
  word-break: keep-all; // 단어가 중간에 잘리지 않도록 설정
  white-space: normal; // 일반적인 줄바꿈 허용
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RelatedLawsContainer = styled.div`
  height: 25vh;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-bottom: 3vh;
`;

const RelatedLawsTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  text-align: left;
  color: #333333;
  margin-bottom: 1vh;
`;

const RelatedNewsTitle = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 700;
  font-size: 4vw;
  color: #333333;
`;

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

// 모달 스타일 정의
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 90vw; // 모달 너비 제한
  max-height: 80vh; // 모달 최대 높이 설정
`;

const ModalCloseButton = styled.button`
  margin-top: 20px;
  background-color: #00c99c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  max-height: 300px; /* 원하는 최대 높이 설정 */
  overflow-y: auto; /* 스크롤이 필요한 경우 활성화 */
  margin-bottom: 20px; /* 다른 요소와의 간격 조정 */
`;

const ArticleTitle = styled.h3`
  margin-top: 0px;
  margin-bottom: 1vh;
  a {
    text-decoration: none; // 링크의 밑줄 제거
    color: inherit; // 텍스트 색상 유지 (부모의 색상 사용)
  }
`;

function getCookieValue(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(';').shift() || null; // split이나 shift가 undefined일 경우 null 반환
    }
  }
  return null;
}

// 용어 상세 컴포넌트
function LandTermDetail() {
  const navigate = useNavigate();

  const { term } = useParams<{ term: string }>(); // useParams로 termId 가져오기
  const [termData, setTermData] = useState<any>(null);
  const [openAiResponse, setOpenAiResponse] = useState<string | null>(null); // OpenAI 응답 저장
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // 즐겨찾기 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [newsData, setNewsData] = useState<string[]>([]); // 뉴스 데이터를 위한 상태 추가

  const authCookie = getCookieValue('Authorization');

  // 용어 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTermData = async () => {
      try {
        const data = await getSelectedTerm(Number(term)); // API로 용어 상세 정보 가져오기
        setTermData(data);
        // likeCheck 값에 따라 즐겨찾기 상태를 설정
        setIsLiked(data.likeCheck === true); // likeCheck 값이 true이면 즐겨찾기 상태로 설정
      } catch (error) {
        console.error('용어 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchTermData();
  }, [term]);

  // 관련 뉴스를 가져오는 useEffect
  useEffect(() => {
    const fetchNewsData = async () => {
      console.log('요청 보낼 단어 :', termData);
      if (termData && termData.termName) {
        try {
          // const keyword = `${termData.termName.trim()} : ${termData.termDescribe}`;
          const keyword = `${termData.termDescribe}`;
          const news = await elasticNewsAxios(keyword); // API 호출
          // eslint-disable-next-line no-underscore-dangle
          setNewsData(news.map((item: any) => item._source.original_data)); // 뉴스 데이터 저장
        } catch (error) {
          console.error('관련 뉴스를 불러오는데 실패했습니다.', error);
        }
      }
    };

    if (termData) {
      fetchNewsData(); // termData가 있을 때만 호출
    }
  }, [termData]);

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
  const toggleLike = async (termId: number) => {
    try {
      if (isLiked) {
        await deleteTermLike(termId);
      } else {
        await registTermLike(termId);
      }
      setIsLiked(!isLiked); // 상태 업데이트
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  const handleDescriptionClick = () => {
    setModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!termData) {
    return <div>해당 용어 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="back Icon" onClick={goBack} />
        {termData.termName}
        {/* 즐겨찾기 아이콘 */}
        {authCookie ? (
          <FavoriteIcon
            src={isLiked ? starFilled : starIcon}
            alt="즐겨찾기"
            isLiked={isLiked}
            onClick={() => toggleLike(termData.termId)}
          />
        ) : (
          <div style={{ width: '24px' }} /> // FavoriteIcon이 없는 경우, 같은 크기의 빈 div 추가
        )}
      </Title>

      {/* 용어 정보 */}
      <RelatedLawsContainer>
        <RelatedLawsTitle>용어설명</RelatedLawsTitle>
        <TermDescription onClick={handleDescriptionClick}>
          {termData.termDescribe}
        </TermDescription>
      </RelatedLawsContainer>

      {/* 관련 법률 및 규제 정보 */}
      <RelatedLawsContainer>
        <RelatedLawsTitle>관련 법률 및 규제 정보</RelatedLawsTitle>
        <TermDescription>
          {termData.termLaw}
          {openAiResponse || '응답을 불러오는 중입니다...'}
        </TermDescription>
      </RelatedLawsContainer>

      {/* 관련 뉴스 */}
      <RelatedNewsTitle>관련 뉴스</RelatedNewsTitle>
      <NewsContainer>
        {newsData && newsData.length > 0 ? (
          newsData.map((newsItem: any, index: number) => (
            <NewsItem key={index}>
              <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
                <ArticleTitle>
                  {newsItem.title.length > 24
                    ? `${newsItem.title.substring(0, 24)}...`
                    : newsItem.title}
                </ArticleTitle>
              </a>
            </NewsItem>
          ))
        ) : (
          <NewsItem>관련 뉴스가 없습니다.</NewsItem>
        )}
      </NewsContainer>

      {/* 모달 */}
      {/* 모달 */}
      {modalOpen && (
        <ModalContainer onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>전체 설명</h3>
            <ModalBody>
              <p>{termData.termDescribe}</p>
            </ModalBody>
            <ModalCloseButton onClick={closeModal}>닫기</ModalCloseButton>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
}

export default LandTermDetail;
