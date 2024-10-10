import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import backIcon from '../assets/images/icon/left-actionable.png'; // 뒤로 가기 아이콘
import beforeStoryIcon from '../assets/images/icon/beforestory.png'; // 이전 사연 아이콘
import newsIcon from '../assets/images/news.png'; // 뉴스 아이콘
import elasticNewsAxios from '../../api/elasticNewsAxios'; // 뉴스 관련 Axios

// 스타일 정의
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
  padding: 2vh 5vw;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: space-between;
`;

const RecentStoryTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 800;
  font-size: 16px;
  color: #333333;
  margin-top: 1vh;
  margin-left: 2vw;
`;

const PreviousStoryButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 14px;
  cursor: pointer;
`;

const StoryContainer = styled.div`
  width: 90%;
  height: 240px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 2vw;
  margin-top: 3vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const NewsContainer = styled.div`
  width: 90%;
  height: 240px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 2vh 2vw;
  margin-top: 2vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const NewsIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const NewsTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1vh;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 1줄에서 자름 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsContent = styled.p`
  font-size: 12px;
  color: #333333;
  margin-bottom: 1vh;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄에서 자름 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsItem = styled.div`
  margin-bottom: 2vh;
`;

// 이전 사연 아이콘과 텍스트 스타일 정의
const BeforeStoryIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 7vh;
  background-color: #27c384;
  color: #ffffff;
  font-size: 4vw;
  font-weight: bold;
  border: none;
  border-radius: 2vw;
  margin-top: 3vh;
  cursor: pointer;
`;

const StoryAnalysisResult = () => {
  const [newsData, setNewsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const story = '부동산에서 땅을 사고싶어'; // 임의로 지정한 스토리
      const data = await elasticNewsAxios(story); // API 요청으로 뉴스 데이터 가져오기
      if (data) {
        const originalDataArray = data.map(
          (item: any) => item._source.original_data,
        );
        setNewsData(originalDataArray); // 뉴스 데이터 상태로 저장
      }
    };
    fetchNewsData();
  }, []);

  const goBack = () => {
    // console.log('뒤로 가기');
  };

  return (
    <Container>
      <Title>
        <span>사연 분석 결과</span>
        <PreviousStoryButton>
          <BeforeStoryIcon src={beforeStoryIcon} alt="이전 사연 아이콘" />
          이전 사연
        </PreviousStoryButton>
      </Title>
      <RecentStoryTitle>XXX님의 최근 사연</RecentStoryTitle>
      <StoryContainer>
        <p>사연: 부동산에서 땅을 사고 싶어.</p>
      </StoryContainer>

      <RecentStoryTitle>사연 분석 결과</RecentStoryTitle>

      <NewsContainer>
        <NewsIcon src={newsIcon} alt="뉴스 아이콘" />
        <RecentStoryTitle>분석된 유사 뉴스</RecentStoryTitle>
        {newsData.map((item, index) => (
          <NewsItem key={index}>
            <NewsTitle>{item.title}</NewsTitle>
            <NewsContent>{item.article}</NewsContent>
          </NewsItem>
        ))}
      </NewsContainer>

      <SubmitButton>분석 완료</SubmitButton>
    </Container>
  );
};

export default StoryAnalysisResult;
