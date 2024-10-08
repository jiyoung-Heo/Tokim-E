import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import elasticNewsAxios from '../../api/elasticNewsAxios';
import elasticLawsAxios from '../../api/elasticLawsAxios';

interface StoryAdviceTabProps {
  story: string | null; // story는 null일 수 있기 때문에 null을 허용
}

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f7fb;
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
const TermDescription = styled.div`
  font-family: 'KoddiUD OnGothic';
  font-weight: 400;
  font-size: 4vw;
  line-height: 5vw;
  color: #000000;
`;

const NoNewsMessage = styled(TermDescription)`
  // color: #ff0000; // 예시로 빨간색
  text-align: center;
`;

const StoryAdviceTab: React.FC<StoryAdviceTabProps> = ({ story }) => {
  const [newsData, setNewsData] = useState<any[]>([]); // newsData 상태 추가
  const [lawsData, setLawsData] = useState<any[]>([]); // newsData 상태 추가

  useEffect(() => {
    // stoty가지고 판례랑 기사 검색해올게용
    const fetchEsNewsData = async () => {
      const data = await elasticNewsAxios(story);
      if (data) {
        console.log(data);
        // original_data를 배열로 저장
        const originalDataArray = data.map(
          // eslint-disable-next-line no-underscore-dangle
          (item: any) => item._source.original_data,
        );
        setNewsData(originalDataArray); // 상태 업데이트
        console.log(newsData);
      }
      const dataLaws = await elasticLawsAxios(story);
      if (dataLaws) {
        console.log(dataLaws);
        // original_data를 배열로 저장
        const originalDataArray = dataLaws.map(
          // eslint-disable-next-line no-underscore-dangle
          (item: any) => item._source.original_data,
        );
        setLawsData(originalDataArray); // 상태 업데이트
      }
    };
    fetchEsNewsData();
  }, [story]);
  return (
    <Container>
      <RelatedLawsTitle>사연</RelatedLawsTitle>
      <RelatedLawsContainer>
        <TermDescription>{story}</TermDescription>
      </RelatedLawsContainer>
      <RelatedLawsTitle>유사 News</RelatedLawsTitle>
      <RelatedLawsContainer>
        {newsData.length > 0 ? (
          newsData.map((item, index) => (
            <TermDescription key={index}>
              <a href={item.link}>{item.title}</a>
            </TermDescription>
          ))
        ) : (
          <NoNewsMessage>유사한 기사가 없습니다.</NoNewsMessage>
        )}
      </RelatedLawsContainer>
      <RelatedLawsTitle>유사 판례</RelatedLawsTitle>
      <RelatedLawsContainer>
        <TermDescription>
          {lawsData.length > 0 ? (
            lawsData.map((item, index) => (
              <TermDescription key={index}>
                {item.사건명}
                <br />
                {item.사건번호}
                <br />
                {item.사건종류명}
                <br />
                {item.판례내용}
              </TermDescription>
            ))
          ) : (
            <NoNewsMessage>유사한 판례가 없습니다.</NoNewsMessage>
          )}
        </TermDescription>
      </RelatedLawsContainer>
    </Container>
  );
};

export default StoryAdviceTab;
