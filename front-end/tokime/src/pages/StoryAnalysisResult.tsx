import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux에서 사용자 정보 가져오기
import { RootState } from '../redux/store'; // RootState 가져오기
import backIcon from '../assets/images/icon/left-actionable.png';
import beforeStoryIcon from '../assets/images/icon/beforestory.png';
import newsIcon from '../assets/images/news.png';
import elasticNewsAxios from '../api/elasticNewsAxios';
import elasticLawsAxios from '../api/elasticLawsAxios';

const Container = styled.div`
  width: 100vw;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
  padding: 2vh 5vw;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

const BackIcon = styled.img`
  margin-right: 2vw;
  cursor: pointer;
`;

const StoryContainer = styled.div`
  width: 90%;
  height: 35vh;
  background: #ffffff;
  border-radius: 10px;
  padding: 2vh 2vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  white-space: pre-wrap; /* 줄바꿈을 단어 끝에서 자연스럽게 처리 */
`;

const PreviousStoryButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PreviousStoryButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px; /* 간격 추가 */
`;

const BeforeStoryIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const NewsContainer = styled.div`
  width: calc(100% - 20px); /* 양쪽 10px 간격 */
  background: #ffffff;
  border-radius: 10px;
  padding: 2vh 10px; /* 양쪽 패딩 10px */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: -4vh;
  margin-bottom: -3vh;
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
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsContent = styled.p`
  font-size: 12px;
  color: #333333;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsCompany = styled.p`
  font-size: 12px;
  color: rgba(51, 51, 51, 0.6); // 60% 불투명
  margin-bottom: 10px;
`;

const NewsItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(51, 51, 51, 0.2); // 20% 불투명
  margin: 10px 0;
`;

const StoryTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 800;
  font-size: 20px;
  color: #333333;
`;

const UserName = styled.span`
  font-family: 'Pretendard Variable';
  font-weight: bold;
`;

const CaseTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 600;
  font-size: 18px;
  margin-top: -1vh;
  margin-bottom: -1vh;
  color: #333333;
  position: relative;
  text-align: center;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(51, 51, 51, 0.2);
`;

const StoryAnalysisResult = () => {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [lawsData, setLawsData] = useState<any[]>([]);
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user); // Redux에서 사용자 이름 가져오기

  const story =
    '야산을 사려고 하는데 근저당이 잡혀있는 땅이고 일단 사기로 하면 매입전에 근저당 해결해준대요';

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchEsNewsData = async () => {
      const data = await elasticNewsAxios(story);
      if (data) {
        const originalDataArray = data.map(
          // eslint-disable-next-line no-underscore-dangle
          (item: any) => item._source.original_data,
        );
        setNewsData(originalDataArray);
      }

      const dataLaws = await elasticLawsAxios(story);
      if (dataLaws) {
        const originalDataArray = dataLaws.map(
          // eslint-disable-next-line no-underscore-dangle
          (item: any) => item._source.original_data,
        );
        setLawsData(originalDataArray);
      }
    };

    fetchEsNewsData();
  }, [story]);

  return (
    <Container>
      <Title>
        <BackIcon src={backIcon} alt="뒤로 가기 아이콘" onClick={goBack} />
        사연 분석 결과
      </Title>

      <StoryTitle>
        <UserName>{userInfo.name}</UserName>님의 최근 사연
      </StoryTitle>
      <PreviousStoryButtonContainer>
        <PreviousStoryButton>
          <BeforeStoryIcon src={beforeStoryIcon} alt="이전 사연 아이콘" />
          이전 사연
        </PreviousStoryButton>
      </PreviousStoryButtonContainer>
      <StoryContainer>
        <CaseTitle>사연</CaseTitle>
        <Divider />
        <p>{story}</p>
      </StoryContainer>

      <StoryTitle>사연 분석 결과</StoryTitle>

      <NewsContainer>
        <NewsHeader>
          <NewsIcon src={newsIcon} alt="뉴스 아이콘" />
          <h4>분석된 유사 뉴스</h4>
        </NewsHeader>
        {newsData.length > 0 ? (
          newsData.map((item, index) => (
            <div key={index}>
              <NewsTitle>{item?.title || '제목 없음'}</NewsTitle>
              <NewsContent>{item?.article || '내용 없음'}</NewsContent>
              <NewsCompany>by {item?.company || '알 수 없는 회사'}</NewsCompany>
              {index < newsData.length - 1 && <NewsItemDivider />}
            </div>
          ))
        ) : (
          <p>유사한 뉴스가 없습니다.</p>
        )}
      </NewsContainer>
    </Container>
  );
};

export default StoryAnalysisResult;
